import * as React from "react";
import {TPerson} from "../types";
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
    person: TPerson;
}

const Person: React.FC<Props> = ({person}) => {

    return (
      <Card>
        <H3>{ person.name }</H3>
        <p>Gender - { person.gender }</p>
        <p>Birth year - { person.birth_year }</p>
      </Card>
    );
}

export default Person;