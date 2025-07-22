const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const rooms = {};
let casualQueue = [];

app.use(express.static('public')); // Serve files from the "public" folder

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join room', (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
    if (!rooms[roomId]) rooms[roomId] = { players: [], decks: {} };
    if (!rooms[roomId].players.includes(socket.id)) {
      rooms[roomId].players.push(socket.id);
      // Remove duplicates
      rooms[roomId].players = [...new Set(rooms[roomId].players)];
    }
    io.in(roomId).emit('opponent joined', socket.id);
  });

  
// CASUAL MATCHMAKING
  socket.on('casual-join', (playerData) => {
    // Add player to queue
    casualQueue.push({ socket, playerData });
    // If there are at least two players, match them up
    if (casualQueue.length >= 2) {
      const p1 = casualQueue.shift();
      const p2 = casualQueue.shift();
      // Send 'casual-match-found' to both players
      p1.socket.emit('casual-match-found', { opponentDeck: p2.playerData, opponentProfile: {} });
      p2.socket.emit('casual-match-found', { opponentDeck: p1.playerData, opponentProfile: {} });
    }
  });

  socket.on('casual-cancel', () => {
    casualQueue = casualQueue.filter(q => q.socket !== socket);
  });  
// DECK SUBMITS
  socket.on('submit deck', (roomId, deckObj) => {
    if (!rooms[roomId]) rooms[roomId] = { players: [], decks: {} };
    rooms[roomId].decks[socket.id] = deckObj;

    // Use only current deck submissions, not players array
    const playerIds = Object.keys(rooms[roomId].decks);
    if (playerIds.length === 2) {
      const player1 = playerIds[0];
      const player2 = playerIds[1];
      io.to(player1).emit('opponent deck', rooms[roomId].decks[player2]);
      io.to(player2).emit('opponent deck', rooms[roomId].decks[player1]);
    }
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
    if (rooms[data.roomId]?.players.includes(socket.id)) {
      socket.to(data.roomId).emit('opponent play card', data);
    } // else ignore if not a player
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const [roomId, room] of Object.entries(rooms)) {
      room.players = room.players.filter(id => id !== socket.id);
      delete room.decks[socket.id];
    }
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
