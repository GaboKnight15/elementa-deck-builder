const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve files from the "public" folder

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('opponent joined', socket.id);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('game action', (roomId, action) => {
    socket.to(roomId).emit('game action', action);
  });

  socket.on('game action', (action) => {
  socket.to(action.roomId).emit('opponent game action', action);
  });

  socket.on('sync deck', (roomId, deckObj) => {
    socket.to(roomId).emit('sync deck', deckObj);
  });

io.on('connection', socket => {
  socket.on('game message', (roomId, msg) => {
    io.to(roomId).emit('game message', msg);
  });
});

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

io.on('connection', (socket) => {
  socket.on('play card', (data) => {
    // Optionally validate action here!
    // Relay to opponent
    socket.to(data.roomId).emit('opponent play card', data);
  });
  // ...other actions
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
