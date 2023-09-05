import app from "./App";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "node:http";

import config from "./config";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userId) => {
    socket.join(userId);
  });

  socket.on("User Logout", (userId) => {
    socket.leave(userId);
  });
});

export { io };

server.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port ${config.port}`);
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));
