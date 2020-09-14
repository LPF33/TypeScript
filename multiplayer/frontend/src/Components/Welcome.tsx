import * as React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import styled from "styled-components";

const room = v4();

const Title = styled.h1`
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-family: "Grandstander", cursive;
    text-align: center;
    text-shadow: 10px 10px 40px white, -10px -10px 40px white;
`;

const Game = styled.div`
    position: absolute;
    top: 15%;
    left: 15%;
    background-color: rgb(245, 129, 129);
    width: 30vw;
    height: 30vw;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const Headline = styled.div`
    font-size: 2vw;
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    font-family: "Grandstander", cursive;
`;

const Start = styled(Link)`
    width: 10vw;
    background-color: rgb(99, 177, 187);
    color: white;
    font-size: 1.5vw;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    text-align: center;
    text-decoration: none;
    font-family: "Grandstander", cursive;
`;

const Send = styled.div`
    max-width: 90%;
    background-color: white;
    color: black;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    word-break: break-all;
    font-family: "Grandstander", cursive;
`;

const Welcome: React.FC = () => {
    const serverUrl =
        process.env.NODE_ENV === "development"
            ? "localhost:3000"
            : "https://loomplay.herokuapp.com";

    return (
        <React.Fragment>
            <Title>LOOM Playground</Title>
            <Game>
                <Headline>Mini-Racer</Headline>
                <Send>
                    Send this link to a friend:<br></br>
                    {serverUrl}/miniracer/{room}
                </Send>
                <Start to={`/miniracer/${room}`}>Play</Start>
            </Game>
        </React.Fragment>
    );
};

export default Welcome;
