import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";

async function startServer() {
  await connectDatabase();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: env.clientOrigin,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.emit("socket:ready", { ok: true });
  });

  app.set("io", io);

  server.listen(env.port, () => {
    console.log(
      `Backend running on http://localhost:${env.port}`
    );
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});