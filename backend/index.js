import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3000;

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
