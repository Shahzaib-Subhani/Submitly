import { io } from "socket.io-client";

// Change this to your backend URL
const SOCKET_URL = "http://localhost:5000";

let socket = null;

export const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL, { transports: ["websocket"] });
    }
    return socket;
};


// Ensure socket is connected before emitting events
export const joinAdminRoom = () => {
    const s = getSocket();

    if (s.connected) {
        console.log("Admin socket already connected", s.id);
        s.emit("adminJoin");
    } else {
        s.once("connect", () => {
            console.log("Admin socket connected", s.id);
            s.emit("adminJoin");
        });
    }
};


export const joinChat = (userId, userType, userName, id) => {
    const s = getSocket();
    const payload = { userId, userType, userName, id };

    if (s.connected) {
        s.emit("joinUserRoom", payload);
    } else {
        s.once("connect", () => s.emit("joinUserRoom", payload));
    }
};

export const sendMessage = (toUserId, toUserType, message) => {
    const s = getSocket();
    const payload = { toUserId, toUserType, message };

    if (s.connected) {
        s.emit("sendMessage", payload);
    } else {
        s.once("connect", () => s.emit("sendMessage", payload));
    }
};

export const onReceiveMessage = (callback) => {
    const s = getSocket();
    s.on("receiveMessage", callback);
};

export const onNewUser = (callback) => {
    const s = getSocket();
    s.on("newUser", callback);
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const formatTime = (date = new Date()) => {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};