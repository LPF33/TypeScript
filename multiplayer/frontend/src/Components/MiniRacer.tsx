import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { useMultiPlayerConnection } from "../CustomHooks/MultiPlayerConnection";
import { socket } from "../Socket/socket";
import MiniRacerGame from "../Games/MiniRacer/MiniRacer";

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

type TParams = { room: string };

const MiniRacer: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
    const { room } = match.params;

    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const game = (num: number): void => {
        const gameCanvas = canvasRef.current;
        MiniRacerGame(gameCanvas, socket, num);
    };

    const { complete, connected } = useMultiPlayerConnection(room, game);

    return (
        <Wrapper theme={complete}>
            {!connected && <Loading>Not connected! Wait!</Loading>}
            {connected && !complete && (
                <Wait>Waiting for second player...</Wait>
            )}
            {connected && complete && (
                <canvas ref={canvasRef} width="800" height="600"></canvas>
            )}
            <Exit to="/" theme={complete}>
                Exit
            </Exit>
        </Wrapper>
    );
};

export default MiniRacer;
