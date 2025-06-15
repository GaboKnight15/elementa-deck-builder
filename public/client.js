const socket = io();

let gameId = null;
let myDeck = null;

// Step 1: Let player pick/select deck FIRST, then prompt for gameId
function startMultiplayerGame() {
  // Assume myDeck is the deck object the player has built/selected
  gameId = prompt("Enter game ID to join or create (share this with your friend):");
  if (!gameId) return;
  socket.emit("joinGame", gameId, myDeck);
}

socket.on("waitingForOpponent", () => {
  alert("Waiting for opponent to join...");
});

socket.on("startGame", ({ message, gameState }) => {
  alert(message);
  // Use gameState to set up local UI/battlefields/hands, etc.
});

function sendAction(action) {
  // Example: { type: "playCard", cardId: "foo", ... }
  socket.emit("playerAction", { gameId, action });
}

socket.on("opponentAction", (action) => {
  // Apply opponent's move to your local game state/UI
  handleOpponentAction(action);
});
