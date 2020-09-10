import * as React from "react";
import { RouteComponentProps } from "react-router";
import GameFrame from "./GameFrame";
import MiniRacerGame from "../Games/MiniRacer/MiniRacer";

type TParams = { room: string };

type GamePlay = (
    canvas: HTMLCanvasElement | null,
    socket: any,
    playerNumber: number
) => void;

interface Data {
    room: string;
    play: GamePlay;
    width: number;
    height: number;
}

const MiniRacer: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
    const { room } = match.params;

    const data: Data = {
        room,
        play: MiniRacerGame,
        width: 800,
        height: 600,
    };

    return <GameFrame data={data} />;
};

export default MiniRacer;
