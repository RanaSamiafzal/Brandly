import { Server } from 'socket.io';

let io;

export const setupSocketHandlers = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust as needed for production
            methods: ["GET", "POST"]
        }
    });

    const onlineUsers = new Map(); // userId -> set of socketIds

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join_collab', (requestId) => {
            socket.join(requestId);
            console.log(`Socket ${socket.id} joined collaboration: ${requestId}`);
        });

        socket.on('join_user', (userId) => {
            socket.join(`user_${userId}`);

            // Presence tracking
            if (!onlineUsers.has(userId)) {
                onlineUsers.set(userId, new Set());
            }
            onlineUsers.get(userId).add(socket.id);

            // Broadcast that user is online
            io.emit('user_status_change', { userId, status: 'online' });

            console.log(`Socket ${socket.id} joined personal room: user_${userId}. Active sessions: ${onlineUsers.get(userId).size}`);
        });

        // Chat Events
        socket.on('send_message', async (data) => {
            try {
                const { CollaborationService } = await import('../services/collaboration/collaboration-service.js');
                const savedMessage = await CollaborationService.processNewMessage(data);
                io.to(data.requestId).emit('receive_message', savedMessage);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        // Collaboration Requests
        socket.on('send_request', (data) => {
            // data: { brandId (userId), request }
            console.log(`New request from influencer to brand user_${data.brandId}`);
            io.to(`user_${data.brandId}`).emit('receive_request', data.request);
        });

        socket.on('respond_request', (data) => {
            // data: { influencerId (userId), requestId, status }
            console.log(`Request response to influencer user_${data.influencerId}: ${data.status}`);
            io.to(`user_${data.influencerId}`).emit('request_updated', {
                requestId: data.requestId,
                status: data.status
            });
        });

        // Presence check
        socket.on('check_online', (userId, callback) => {
            const isOnline = onlineUsers.has(userId) && onlineUsers.get(userId).size > 0;
            if (callback) callback({ online: isOnline });
        });

        // Task Events
        socket.on('task_update', async (data) => {
            try {
                const { CollaborationService } = await import('../services/collaboration/collaboration-service.js');
                const updatedTask = await CollaborationService.updateCollabTask(data.taskId, data.update);
                io.to(data.requestId).emit('task_updated', updatedTask);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);

            // Remove from onlineUsers
            for (const [userId, sockets] of onlineUsers.entries()) {
                if (sockets.has(socket.id)) {
                    sockets.delete(socket.id);
                    if (sockets.size === 0) {
                        onlineUsers.delete(userId);
                        io.emit('user_status_change', { userId, status: 'offline' });
                    }
                    break;
                }
            }
        });
    });

    return io;
};

export const getIO = () => io;
