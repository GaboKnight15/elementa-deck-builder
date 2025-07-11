const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const rooms = {};

app.use(express.static('public')); // Serve files from the "public" folder

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join room', (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
// Track players in the room
    if (!rooms[roomId]) rooms[roomId] = { players: [], decks: {} };
    if (!rooms[roomId].players.includes(socket.id)) rooms[roomId].players.push(socket.id);
// Emit to both: everyone in the room (including the joining socket)
    io.in(roomId).emit('opponent joined', socket.id);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
// DECK SUBMITS
  socket.on('submit deck', (roomId, deckObj) => {
    if (!rooms[roomId]) rooms[roomId] = { players: [], decks: {} };
    rooms[roomId].decks[socket.id] = deckObj;

    // If both decks are submitted
    if (
      rooms[roomId].players.length === 2 &&
      rooms[roomId].decks[rooms[roomId].players[0]] &&
      rooms[roomId].decks[rooms[roomId].players[1]]
    ) {
      // Send opponent's deck to each player
      const player1 = rooms[roomId].players[0];
      const player2 = rooms[roomId].players[1];

      io.to(player1).emit('opponent deck', rooms[roomId].decks[player2]);
      io.to(player2).emit('opponent deck', rooms[roomId].decks[player1]);
    }
  });
  socket.on('game action', (roomId, action) => {
    socket.to(roomId).emit('game action', action);
  });

  socket.on('game action', (action) => {
    socket.to(action.roomId).emit('opponent game action', action);
  });
  socket.on('game action', (roomId, action) => {
    io.in(roomId).emit('game action', action); // io.in, not socket.to
  });
  socket.on('profile', (profileObj) => {
    // Send to everyone else in the room (assume socket.roomId is set on join)
    // You may want to store roomId on socket when joining
    if (socket.roomId) {
      socket.to(socket.roomId).emit('opponent profile', profileObj);
    }
  });
  
  socket.on('sync deck', (roomId, deckObj) => {
    socket.to(roomId).emit('sync deck', deckObj);
  });

socket.on('game message', (roomId, msg) => {
  io.to(roomId).emit('game message', {
    sender: socket.id,
    msg
  });
});

  socket.on('play card', (data) => {
    socket.to(data.roomId).emit('opponent play card', data);
  });

  socket.on('play card', (data) => {
    if (rooms[data.roomId]?.players.includes(socket.id)) {
      socket.to(data.roomId).emit('opponent play card', data);
    } // else ignore if not a player
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

    socket.on('spectate room', (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
    if (!rooms[roomId]) rooms[roomId] = { players: [], decks: {}, spectators: []};
    if (!rooms[roomId].spectators.includes(socket.id)) rooms[roomId].spectators.push(socket.id);
    // Send a special message so client can adjust UI
    socket.emit('spectator joined', roomId);

    // Optionally, send current game state if you store it on the server
    // Otherwise, just let the client catch up as actions come in
  });
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
