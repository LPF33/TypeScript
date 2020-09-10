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
}

type GameCanvas = (num: number) => void;

export const useMultiPlayerConnection = (room: string, game: GameCanvas) => {
    const history = useHistory();

    const [connected, setConnected] = React.useState<boolean>(false);
    const [complete, setComplete] = React.useState<boolean>(false);
    const playerNumber = React.useRef<number>(0);

    React.useEffect(() => {
        connect(room);

        socket.on(Events.Connect, (): void => {
            setConnected(true);
        });

        socket.on(Events.Disconnect, (): void => {
            history.replace("/");
        });

        socket.on(Events.UserLeft, (): void => {
            setComplete(false);
        });

        socket.on(Events.PlayerNumber, (data: number): void => {
            playerNumber.current = data;
        });

        socket.on(Events.StartGame, (): void => {
            setComplete(true);
            game(playerNumber.current);
        });

        return () => socket.emit(Events.Leave);
    }, []);

    return { connected, complete };
};
