import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMultiPlayerConnection } from "../CustomHooks/MultiPlayerConnection";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Headline = styled.h1`
    font-family: "Grandstander", cursive;
    font-size: 4em;
    color: red;
    text-align: center;
    margin-bottom: 10px;
`;

const Loading = styled.h1`
    font-family: "Grandstander", cursive;
    font-size: 3em;
    color: red;
    text-align: center;
`;

const Wait = styled.h1`
    font-family: "Grandstander", cursive;
    font-size: 3em;
    text-align: center;
    color: white;
`;

const Ready = styled.button`
    font-family: "Grandstander", cursive;
    font-size: 3em;
    border: 1px solid white;
    padding: 5px;
    cursor: pointer;
    color: white;
    background-color: transparent;
`;

const Exit = styled(Link)`
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    font-family: "Grandstander", cursive;
    font-size: 1em;
    border: 1px solid white;
    text-decoration: none;
    padding: 2px;
    color: white;
`;

type GamePlay = (
    canvas: HTMLCanvasElement | null,
    socket: any,
    playerNumber: number
) => void;

interface GameProps {
    data: {
        room: string;
        play: GamePlay;
        width: number;
        height: number;
        name: string;
    };
}

const GameFrame: React.FC<GameProps> = ({
    data: { room, play, width, height, name },
}) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const game = (num: number, socket: any): void => {
        const gameCanvas = canvasRef.current;
        play(gameCanvas, socket, num);
    };

    const {
        complete,
        connected,
        ready,
        emitReady,
        clicked,
        setClicked,
    } = useMultiPlayerConnection(room, game);

    const clickAndPlay = (): void => {
        emitReady();
        setClicked(true);
    };

    return (
        <Wrapper>
            <Headline>{name}</Headline>
            {!connected && <Loading>Not connected! Wait!</Loading>}
            {connected && !complete && (
                <Wait>Waiting for second player to enter the room!</Wait>
            )}
            {connected && complete && !clicked && (
                <Ready onClick={clickAndPlay}>Click to play!</Ready>
            )}
            {connected && complete && clicked && !ready && (
                <Wait>Waiting for second player...</Wait>
            )}
            {connected && complete && clicked && ready && (
                <canvas ref={canvasRef} width={width} height={height}></canvas>
            )}
            <Exit to="/">Exit</Exit>
        </Wrapper>
    );
};

export default GameFrame;
