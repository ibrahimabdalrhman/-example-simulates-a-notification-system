const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set(); // Keep track of all connected clients

wss.on("connection", (ws) => {
  clients.add(ws); // Add client to the set

  ws.send(
    JSON.stringify({ message: "Subscribed to real-time notifications!" })
  );

  ws.on("close", () => {
    clients.delete(ws); // Remove client when they disconnect
  });
});

// Simulate sending a notification every 10 seconds
setInterval(() => {
  const notification = { type: "notification", content: "New event occurred!" };
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notification));
    }
  });
}, 10000);

console.log("WebSocket notification server running on ws://localhost:8080");
