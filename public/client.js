const socket = io();

// Join a game (could be a random ID, or from a lobby)
const gameId = prompt("Enter game ID (or share with a friend):");
socket.emit("joinGame", gameId);

socket.on("startGame", (data) => {
  console.log(data.message);
  // Initialize your game UI here
});

// Send an action (e.g., play card, end turn)
function sendAction(action) {
  socket.emit("playerAction", { gameId, action });
}

// Receive opponent action
socket.on("opponentAction", (action) => {
  // Apply opponent's move to your local game state/UI
  console.log("Opponent did:", action);
});
