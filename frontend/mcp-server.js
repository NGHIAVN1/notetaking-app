// MCP Server for VS Code integration
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3100;

// Enable CORS for all routes
app.use(cors());

// MCP SSE endpoint
app.get("/mcp-sse", (req, res) => {
  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial connection message
  res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

  // Send a ping every 30 seconds to keep the connection alive
  const pingInterval = setInterval(() => {
    res.write(
      `data: ${JSON.stringify({ ping: new Date().toISOString() })}\n\n`,
    );
  }, 30000);

  // Clean up on connection close
  req.on("close", () => {
    clearInterval(pingInterval);
    console.log("MCP client disconnected");
  });

  console.log("MCP client connected");
});

// Start the server
app.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
