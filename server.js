const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files (your HTML/JS/CSS)
app.use(express.static("public"));

// In-memory store for games (for demo, not for production)
let games = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a game room (for simplicity, two players per game)
  socket.on("joinGame", (gameId) => {
    socket.join(gameId);

    // Create game if it doesn't exist
    if (!games[gameId]) {
      games[gameId] = { players: [], state: null };
    }
    games[gameId].players.push(socket.id);

    // Start game if two players joined
    if (games[gameId].players.length === 2) {
      io.to(gameId).emit("startGame", { message: "Game started!" });
      // Optionally, initialize and send initial game state
    }
  });

  // Relay a player's action to the other
  socket.on("playerAction", ({ gameId, action }) => {
    socket.to(gameId).emit("opponentAction", action);
  });

  socket.on("disconnect", () => {
    // Clean up: remove player from games, handle abandonment, etc.
    for (const [gameId, game] of Object.entries(games)) {
      game.players = game.players.filter((id) => id !== socket.id);
      if (game.players.length === 0) delete games[gameId];
      else io.to(gameId).emit("playerLeft");
    }
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
