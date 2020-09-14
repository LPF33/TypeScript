import express, { Request, Response } from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import * as Socket from "socket.io";

const app = express();

app.use(express.static(path.join(__dirname + "/../frontend/build")));

const options = {
    origin: false,
};
app.use(cors(options));

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "http://localhost:8080/"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "fonts.googleapis.com",
                "fonts.gstatic.com",
            ],
            fontSrc: [
                "'self'",
                "'unsafe-inline'",
                "fonts.googleapis.com",
                "fonts.gstatic.com",
            ],
        },
    })
);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

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

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
});

server.listen(process.env.PORT || 8080);
