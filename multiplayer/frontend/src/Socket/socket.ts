import * as io from "socket.io-client";

export let socket: any;

export const connect = (room: string): void => {
    socket = io.connect("http://localhost:8080", {
        query: {
            room,
        },
    });
};
