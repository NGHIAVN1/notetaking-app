import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    // Add middleware for MCP SSE connection
    middleware: [
      (req, res, next) => {
        if (req.url === "/mcp-sse") {
          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          });

          // Send an initial connection event
          res.write('data: {"connected": true}\n\n');

          // Keep the connection alive
          const interval = setInterval(() => {
            res.write('data: {"ping": true}\n\n');
          }, 30000);

          // Clean up when connection closes
          req.on("close", () => {
            clearInterval(interval);
          });

          // Don't call next() to prevent other middleware from handling this request
        } else {
          next();
        }
      },
    ],
  },
  plugins: [react()],
});
