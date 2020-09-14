"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var helmet_1 = __importDefault(require("helmet"));
var http_1 = require("http");
var Socket = __importStar(require("socket.io"));
var app = express_1.default();
app.use(helmet_1.default());
var server = http_1.createServer(app);
var io = Socket.listen(server);
io.on("connection", function (socket) {
    var room = socket.handshake.query.room;
    socket.join(room, function () {
        var roomData = io.sockets.adapter.rooms[room];
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
    socket.on("leave-room", function () {
        socket.leave(room);
        io.to(room).emit("user-leave");
        socket.disconnect();
    });
    socket.on("disconnect", function () {
        socket.leave(room);
        io.to(room).emit("user-leave");
    });
    socket.on("ready-to-play", function () {
        io.to(room).emit("ready-to-play");
    });
    socket.on("finished-loading", function () {
        io.to(room).emit("finished-loading");
    });
    socket.on("draw-car", function (data) {
        socket.to(room).emit("draw-car", data);
    });
    socket.on("track-finished", function (data) {
        io.to(room).emit("race-finished", data);
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname + "/frontend/build")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname + "/frontend/build/index.html"));
});
server.listen(process.env.Port || 8080);
