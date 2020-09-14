import * as React from "react";
import { RouteComponentProps } from "react-router";
import GameFrame from "./GameFrame";
import MiniRacerGame, {
    clearCanvasInterval,
} from "../Games/MiniRacer/MiniRacer";

type TParams = { room: string };

type GamePlay = (
    canvas: HTMLCanvasElement | null,
    socket: any,
    playerNumber: number,
    room: string
) => void;

interface Data {
    room: string;
    play: GamePlay;
    width: number;
    height: number;
    name: string;
}

const MiniRacer: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
    const { room } = match.params;

    React.useEffect(() => {
        return () => clearCanvasInterval();
    }, []);

    const data: Data = {
        room,
        play: MiniRacerGame,
        width: 800,
        height: 600,
        name: "Mini-Racer",
    };

    return <GameFrame data={data} />;
};

export default MiniRacer;
