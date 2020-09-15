"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const http_1 = require("http");
const Socket = tslib_1.__importStar(require("socket.io"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname + "/../frontend/build")));
const options = {
    origin: false,
};
app.use(cors_1.default(options));
app.use(helmet_1.default.contentSecurityPolicy({
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
}));
app.use(helmet_1.default.dnsPrefetchControl());
app.use(helmet_1.default.expectCt());
app.use(helmet_1.default.frameguard());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.hsts());
app.use(helmet_1.default.ieNoOpen());
app.use(helmet_1.default.noSniff());
app.use(helmet_1.default.permittedCrossDomainPolicies());
app.use(helmet_1.default.referrerPolicy());
app.use(helmet_1.default.xssFilter());
const server = http_1.createServer(app);
const io = Socket.listen(server);
io.on("connection", (socket) => {
    const room = socket.handshake.query.room;
    socket.join(room, () => {
        const roomData = io.sockets.adapter.rooms[room];
        console.log(roomData);
        if (roomData.length === 1) {
            socket.emit("player-number", 1);
        }
        else if (roomData.length === 2) {
            socket.emit("player-number", 2);
            io.to(room).emit("start-game");
        }
        else if (roomData.length > 2) {
            socket.disconnect();
        }
    });
    socket.on("leave-room", () => {
        socket.leave(room);
        io.to(room).emit("user-leave");
        socket.disconnect();
    });
    socket.on("disconnect", () => {
        socket.leave(room);
        io.to(room).emit("user-leave");
    });
    socket.on("ready-to-play", () => {
        io.to(room).emit("ready-to-play");
    });
    socket.on("finished-loading", () => {
        console.log(socket.id);
        io.to(room).emit("finished-loading");
    });
    socket.on("draw-car", (data) => {
        socket.to(room).emit("draw-car", data);
    });
    socket.on("track-finished", (data) => {
        io.to(room).emit("race-finished", data);
    });
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/../frontend/build/index.html"));
});
server.listen(process.env.PORT || 8080);
