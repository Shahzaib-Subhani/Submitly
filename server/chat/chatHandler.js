export const initChat = (io) => {
  const users = {};

  const sendActiveChatsToAdmin = () => {
    const activeUsers = Object.values(users).filter(u => u.userType !== "admin");
    io.to("admin").emit("activeUsers", activeUsers);
  };

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    const handleUserJoin = ({ userId, userType, userName, id }) => {
      const roomId = `${userType}_${userId}`;
      socket.join(roomId);
      users[socket.id] = { userId, userName, id, userType, roomId };
      console.log(userId, userType, userName, id);
      sendActiveChatsToAdmin();
    };
    socket.on("joinUserRoom", handleUserJoin);

    // Admin joins
    socket.on("adminJoin", () => {
      socket.join("admin");
      console.log("Admin joined");
      sendActiveChatsToAdmin();
    });

    // admin join room
    socket.on("adminJoinUserRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`Admin joined user room: ${roomId}`);
      // Notify the user that admin joined
      io.to(roomId).emit("adminJoined", { roomId });
    });

    // admin left room
    socket.on("adminLeftUserRoom", ({ roomId }) => {
      socket.leave(roomId);
      io.to(roomId).emit("adminLeft", { roomId });
    });

    socket.on("sendMessageToRoom", ({ roomId, message, from }) => {
      console.log("Message from:", from, message, roomId);
      io.to(roomId).emit("receiveMessage", { roomId, message, from });
    });

    // check socket
    socket.on("checkUserRoom", ({ userId, userType }, callback) => {
      const exists = Object.values(users).some(
        u => u.userId === userId && u.userType === userType
      );
      callback(exists);
    });


    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      delete users[socket.id];
      sendActiveChatsToAdmin();
    });
  });
};
