export const initChat = (io) => {
  const users = {}; 

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // User joins chat
    socket.on("joinChat", ({ userId, userType }) => {
      const roomId = `${userType}_${userId}`;
      socket.join(roomId);
      users[socket.id] = { userId, userType, roomId };
      console.log(`${userType} ${userId} joined room ${roomId}`);

      if (userType !== "admin") {
        socket.to("admin").emit("newUser", { userId, userType });
      }
    });

    // Admin joins
    socket.on("adminJoin", () => {
      socket.join("admin");
      console.log("Admin joined admin room");
    });

    // Send message
    socket.on("sendMessage", ({ toUserId, toUserType, message }) => {
      const roomId = `${toUserType}_${toUserId}`;
      io.to(roomId).emit("receiveMessage", { message, from: users[socket.id] });
      
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      delete users[socket.id];
    });
  });
};
