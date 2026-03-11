module.exports = [
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/backend/core/src/socket/socket-handler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIO",
    ()=>getIO,
    "setupSocketHandlers",
    ()=>setupSocketHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/socket.io/wrapper.mjs [app-route] (ecmascript)");
;
let io;
const setupSocketHandlers = (server)=>{
    io = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Server"](server, {
        cors: {
            origin: "*",
            methods: [
                "GET",
                "POST"
            ]
        }
    });
    const onlineUsers = new Map(); // userId -> set of socketIds
    io.on('connection', (socket)=>{
        console.log('New client connected:', socket.id);
        socket.on('join_collab', (requestId)=>{
            socket.join(requestId);
            console.log(`Socket ${socket.id} joined collaboration: ${requestId}`);
        });
        socket.on('join_user', (userId)=>{
            socket.join(`user_${userId}`);
            // Presence tracking
            if (!onlineUsers.has(userId)) {
                onlineUsers.set(userId, new Set());
            }
            onlineUsers.get(userId).add(socket.id);
            // Broadcast that user is online
            io.emit('user_status_change', {
                userId,
                status: 'online'
            });
            console.log(`Socket ${socket.id} joined personal room: user_${userId}. Active sessions: ${onlineUsers.get(userId).size}`);
        });
        // Chat Events
        socket.on('send_message', async (data)=>{
            try {
                const { CollaborationService } = await __turbopack_context__.A("[project]/backend/core/src/services/collaboration/collaboration-service.js [app-route] (ecmascript, async loader)");
                const savedMessage = await CollaborationService.processNewMessage(data);
                io.to(data.requestId).emit('receive_message', savedMessage);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });
        // Collaboration Requests
        socket.on('send_request', (data)=>{
            // data: { brandId (userId), request }
            console.log(`New request from influencer to brand user_${data.brandId}`);
            io.to(`user_${data.brandId}`).emit('receive_request', data.request);
        });
        socket.on('respond_request', (data)=>{
            // data: { influencerId (userId), requestId, status }
            console.log(`Request response to influencer user_${data.influencerId}: ${data.status}`);
            io.to(`user_${data.influencerId}`).emit('request_updated', {
                requestId: data.requestId,
                status: data.status
            });
        });
        // Presence check
        socket.on('check_online', (userId, callback)=>{
            const isOnline = onlineUsers.has(userId) && onlineUsers.get(userId).size > 0;
            if (callback) callback({
                online: isOnline
            });
        });
        // Task Events
        socket.on('task_update', async (data)=>{
            try {
                const { CollaborationService } = await __turbopack_context__.A("[project]/backend/core/src/services/collaboration/collaboration-service.js [app-route] (ecmascript, async loader)");
                const updatedTask = await CollaborationService.updateCollabTask(data.taskId, data.update);
                io.to(data.requestId).emit('task_updated', updatedTask);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        });
        socket.on('disconnect', ()=>{
            console.log('Client disconnected:', socket.id);
            // Remove from onlineUsers
            for (const [userId, sockets] of onlineUsers.entries()){
                if (sockets.has(socket.id)) {
                    sockets.delete(socket.id);
                    if (sockets.size === 0) {
                        onlineUsers.delete(userId);
                        io.emit('user_status_change', {
                            userId,
                            status: 'offline'
                        });
                    }
                    break;
                }
            }
        });
    });
    return io;
};
const getIO = ()=>io;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__309b9ab2._.js.map