import { Server } from "socket.io";
import app from "./app.js";
import http from "http";
import { initChat } from "./chat/chatHandler.js";
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

initChat(io);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

})