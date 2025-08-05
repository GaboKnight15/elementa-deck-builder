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
    casualQueue.push({ socket, playerData });
    if (casualQueue.length >= 2) {
      const p1 = casualQueue.shift();
      const p2 = casualQueue.shift();

      // Generate a unique room ID for this match
      const roomId = 'casual_' + Math.random().toString(36).substr(2, 7).toUpperCase();

      // Join both players to the room
      p1.socket.join(roomId);
      p2.socket.join(roomId);
      p1.socket.roomId = roomId;
      p2.socket.roomId = roomId;

      // Optionally store the room
      rooms[roomId] = { players: [p1.socket.id, p2.socket.id], decks: {} };

      // Send 'casual-match-found' to both with the roomId
      p1.socket.emit('casual-match-found', {
        roomId,
        opponentDeck: p2.playerData,
        opponentProfile: {}
      });
      p2.socket.emit('casual-match-found', {
        roomId,
        opponentDeck: p1.playerData,
        opponentProfile: {}
      });
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
      // --- NEW: Emit coin flip result ---
      const whoStarts = Math.random() < 0.5 ? "player" : "opponent";
      io.to(roomId).emit('coin-flip-result', whoStarts);
    }
  });
  
  socket.on('player state', (roomId, state) => {
    // Send to the other player (not self)
    socket.to(roomId).emit('opponent state update', state);
  });
  
socket.on('profile', (profileObj) => {
  socket.username = profileObj.username;
  if (socket.roomId) {
    socket.to(socket.roomId).emit('opponent profile', profileObj);
  }
});

socket.on('game message', (roomId, msg) => {
  io.to(roomId).emit('game message', {
    sender: socket.username,
    msg
  });
});

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const [roomId, room] of Object.entries(rooms)) {
      room.players = room.players.filter(id => id !== socket.id);
      delete room.decks[socket.id];
    }
  });
  
  socket.on('leave game', (roomId) => {
    // Remove player from room
    socket.leave(roomId);
    // Optionally clean up room players/decks
    if (rooms[roomId]) {
      rooms[roomId].players = rooms[roomId].players.filter(id => id !== socket.id);
      delete rooms[roomId].decks[socket.id];
    }
    // Notify the other player
    socket.to(roomId).emit('opponent_left');
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
