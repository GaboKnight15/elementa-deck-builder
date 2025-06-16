const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve files from the "public" folder

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
socket.on('game message', (roomId, msg) => {
  socket.to(roomId).emit('game message', msg);
});
  // Example: relay messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join room', (roomId) => {
    socket.join(roomId);
    // Notify others in the room
    socket.to(roomId).emit('opponent joined', socket.id);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Relay game actions to other player in the room
  socket.on('game action', (roomId, action) => {
    socket.to(roomId).emit('game action', action);
  });
  socket.on('sync deck', (roomId, deckObj) => {
  socket.to(roomId).emit('sync deck', deckObj);
});

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
