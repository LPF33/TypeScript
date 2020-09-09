import * as React from "react";
import { useHistory, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { socket, connect } from "../Socket/socket";
import MiniRacerGame from "../Games/MiniRacer/MiniRacer";

type TParams = { room: string };

enum Events {
    Connect = "connect",
    Disconnect = "disconnect",
    Leave = "leave-room",
    UserLeft = "user-leave",
    PlayerNumber = "player-number",
    StartGame = "start-game",
}

const MiniRacer: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
    const { room } = match.params;
    const history = useHistory();
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const [connected, setConnected] = React.useState<boolean>(false);
    const [complete, setComplete] = React.useState<boolean>(false);
    const playerNumber = React.useRef<number>(0);

    const game = (num: number) => {
        const gameCanvas = canvasRef.current;
        MiniRacerGame(gameCanvas, socket, num);
    };

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

    return (
        <div>
            {!connected && <div>not connected</div>}
            {connected && !complete && <div>Waiting for second player</div>}
            {connected && complete && (
                <canvas ref={canvasRef} width="800" height="600"></canvas>
            )}
            <Link to="/">Exit</Link>
        </div>
    );
};

export default MiniRacer;
