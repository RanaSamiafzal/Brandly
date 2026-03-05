import http from 'http';
import { setupSocketHandlers } from './src/socket/socket-handler.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SOCKET_PORT || 3001;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Brandy Socket Server is Running\n');
});

setupSocketHandlers(server);

server.listen(PORT, () => {
    console.log(`🚀 Socket.io server running on http://localhost:${PORT}`);
});
