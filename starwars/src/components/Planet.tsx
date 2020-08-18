import * as React from "react";
import {TPlanet} from "../types";
import styled from "styled-components";

const H3 = styled.h3`
    margin: 10px 0;
    color: rgb(255, 231, 97);
`;

const Card = styled.div`
    padding: 8px 16px;
    background: #1b1b1b;
    margin: 16px 0;
    border-radius: 20px;

    p:{
        margin: 6px 0;
        color: rgb(255, 231, 97);
    }
`;

type Props = {
    planet: TPlanet;
}

const Planet: React.FC<Props> = ({planet}) => {

    return (
        <Card>
            <H3>{ planet.name }</H3>
            <p>Terrain - { planet.terrain }</p>
            <p>Climate - {planet.climate}</p>
            <p>Population - {planet.population}</p>
        </Card>
    );
}

export default Planet;