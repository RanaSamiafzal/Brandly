import { Server } from 'socket.io';
import { CollaborationService } from '../services/collaboration/collaboration-service.js';

let io;

export const setupSocketHandlers = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust as needed for production
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join_collab', (requestId) => {
            socket.join(requestId);
            console.log(`Socket ${socket.id} joined collaboration: ${requestId}`);
        });

        socket.on('join_user', (userId) => {
            socket.join(`user_${userId}`);
            console.log(`Socket ${socket.id} joined personal room: user_${userId}`);
        });

        // Chat Events
        socket.on('send_message', async (data) => {
            try {
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

        // Task Events
        socket.on('task_update', async (data) => {
            try {
                const updatedTask = await CollaborationService.updateCollabTask(data.taskId, data.update);
                io.to(data.requestId).emit('task_updated', updatedTask);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

export const getIO = () => io;
