import * as React from "react";
import { useHistory } from "react-router-dom";
import { socket, connect } from "../Socket/socket";

enum Events {
    Connect = "connect",
    Disconnect = "disconnect",
    Leave = "leave-room",
    UserLeft = "user-leave",
    PlayerNumber = "player-number",
    StartGame = "start-game",
    ReadyPlay = "ready-to-play",
}

export type GameCanvas = (num: number, socket: any) => void;

export const useMultiPlayerConnection = (room: string, game: GameCanvas) => {
    const history = useHistory();

    const [connected, setConnected] = React.useState<boolean>(false);
    const [complete, setComplete] = React.useState<boolean>(false);
    const [clicked, setClicked] = React.useState<boolean>(false);
    const [ready, setReady] = React.useState<boolean>(false);
    const playerNumber = React.useRef<number>(0);
    let signal = React.useRef<number>(0);

    React.useEffect(() => {
        connect(room);

        socket.on(Events.Connect, (): void => {
            setConnected(true);
        });

        socket.on(Events.Disconnect, (): void => {
            history.replace("/");
        });

        socket.on(Events.UserLeft, (): void => {
            playerNumber.current = 1;
            setComplete(false);
            setReady(false);
            setClicked(false);
        });

        socket.on(Events.PlayerNumber, (data: number): void => {
            playerNumber.current = data;
        });

        socket.on(Events.StartGame, (): void => {
            setComplete(true);
        });

        socket.on(Events.ReadyPlay, (): void => {
            signal.current++;
            if (signal.current === 2) {
                signal.current = 0;
                setReady(true);
                game(playerNumber.current, socket);
            }
        });

        return () => socket.emit(Events.Leave);
    }, []);

    const emitReady = (): void => {
        socket.emit(Events.ReadyPlay);
    };

    return { connected, complete, ready, emitReady, clicked, setClicked };
};
