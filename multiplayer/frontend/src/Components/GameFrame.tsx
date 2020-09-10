import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMultiPlayerConnection } from "../CustomHooks/MultiPlayerConnection";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.theme === true ? "black" : "white")};
`;

const Loading = styled.h1`
    font-family: "Grandstander", cursive;
    font-size: 3em;
    color: red;
`;

const Wait = styled.h1`
    font-family: "Grandstander", cursive;
    font-size: 3em;
`;

const Ready = styled.button`
    font-family: "Grandstander", cursive;
    font-size: 3em;
    border: 1px solid black;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
`;

const Exit = styled(Link)`
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    font-family: "Grandstander", cursive;
    font-size: 1em;
    border: 1px solid ${(props) => (props.theme === true ? "white" : "black")};
    text-decoration: none;
    padding: 2px;
    color: ${(props) => (props.theme === true ? "white" : "black")};
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
    };
}

const GameFrame: React.FC<GameProps> = ({
    data: { room, play, width, height },
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
        <Wrapper theme={ready}>
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
            <Exit to="/" theme={complete}>
                Exit
            </Exit>
        </Wrapper>
    );
};

export default GameFrame;
