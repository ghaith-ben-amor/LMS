const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { WebSocketServer, WebSocket } = require("ws");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url);
    if (pathname === "/api/ws" || pathname === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  wss.on("connection", (ws) => {
    try {
      ws.send(JSON.stringify({ type: "CONNECTED", timestamp: Date.now() }));
    } catch (e) {}

    ws.on("message", (message) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          try {
            client.send(message);
          } catch (e) {}
        }
      });
    });
  });

  // Global broadcast helper accessible in Node API routes
  global.wssBroadcast = (data) => {
    const payload = typeof data === "string" ? data : JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(payload);
        } catch (e) {}
      }
    });
  };

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> LMS 2K26 App Ready on http://${hostname}:${port}`);
    console.log(`> WebSockets Server active on ws://${hostname}:${port}/api/ws`);
  });
});
