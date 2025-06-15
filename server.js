const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const games = {}; // { [gameId]: { players: [], gameState: {} } }

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinGame', (gameId, deck) => {
    if (!games[gameId]) {
      games[gameId] = { players: [], gameState: {} };
    }
    const game = games[gameId];

    // Track player's socket and their deck
    game.players.push({ socketId: socket.id, deck });
    socket.join(gameId);

    // If two players, start the game
    if (game.players.length === 2) {
      // Initialize game state here for both players
      game.gameState = {
        playerStates: game.players.map(p => ({
          deck: p.deck,
          hand: [], // fill as you wish
          battlefield: [],
          ... // add other per-player fields
        })),
        turn: 0 // 0 or 1
      };
      // Notify both players
      io.to(gameId).emit('startGame', { message: 'Game started!', gameState: game.gameState });
    } else {
      // Wait for second player
      socket.emit('waitingForOpponent');
    }
  });

  // Listen for player actions
  socket.on('playerAction', ({ gameId, action }) => {
    // Relay to the other player in the room
    socket.to(gameId).emit('opponentAction', action);

    // Optionally, update the game state server-side
    // games[gameId].gameState = ...
  });

  socket.on('disconnect', () => {
    // Optionally handle game cleanup
    for (const gameId in games) {
      const game = games[gameId];
      game.players = game.players.filter(p => p.socketId !== socket.id);
      if (game.players.length === 0) delete games[gameId];
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
