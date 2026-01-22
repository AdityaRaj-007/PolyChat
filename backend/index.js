import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { LingoDotDevEngine } from "lingo.dev/sdk";
import "dotenv/config";

const PORT = 3000;
const roomId = "global";
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const lingoDotDev = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.join(roomId);

  socket.on("set_language", ({ language }) => {
    console.log(language);
    socket.data.targetLanguage = language;
  });

  socket.on("chat_message", async ({ user, text, language }) => {
    console.log(user, text, language);

    const sockets = await io.in(roomId).fetchSockets();
    //console.log(sockets.id);

    for (const targetSocket of sockets) {
      console.log(targetSocket.id);
      const targetLocale = targetSocket.data.targetLanguage;
      const sourceLocale = language;
      let finalText = text;

      if (targetLocale !== sourceLocale) {
        const translated = await lingoDotDev.localizeText(text, {
          sourceLocale,
          targetLocale,
        });

        finalText = translated;
      }

      io.to(targetSocket.id).emit("chat_message", {
        user: user,
        text: finalText,
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
