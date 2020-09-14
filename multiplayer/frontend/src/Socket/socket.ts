import * as io from "socket.io-client";

const serverUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://loomplay.herokuapp.com";

export let socket: any;

export const connect = (room: string): void => {
    socket = io.connect(serverUrl, {
        query: {
            room,
        },
    });
};
