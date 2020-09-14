import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import * as Socket from "socket.io";

const app = express();

app.use(helmet());

const server = createServer(app);
const io = Socket.listen(server);

io.on("connection", (socket): void => {
    const room = socket.handshake.query.room;
    socket.join(room, () => {
        const roomData = io.sockets.adapter.rooms[room];
        console.log(roomData);
        if (roomData.length === 1) {
            socket.emit("player-number", 1);
        } else if (roomData.length === 2) {
            socket.emit("player-number", 2);
            io.to(room).emit("start-game");
        } else if (roomData.length > 2) {
            socket.disconnect();
        }
    });

    socket.on("leave-room", (): void => {
        socket.leave(room);
        io.to(room).emit("user-leave");
        socket.disconnect();
    });

    socket.on("disconnect", (): void => {
        socket.leave(room);
        io.to(room).emit("user-leave");
    });

    socket.on("ready-to-play", (): void => {
        io.to(room).emit("ready-to-play");
    });

    socket.on("finished-loading", (): void => {
        io.to(room).emit("finished-loading");
    });

    socket.on("draw-car", (data): void => {
        socket.to(room).emit("draw-car", data);
    });

    socket.on("track-finished", (data): void => {
        io.to(room).emit("race-finished", data);
    });
});

server.listen(process.env.Port || 8080);
