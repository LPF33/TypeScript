import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import {usePaginatedQuery} from "react-query";
import Person from "./Person";
import {TPerson} from "../types";
import { ReactQueryDevtools } from 'react-query-devtools';

const Wrapper = styled.div`
    text-align: center;
`;

const Button = styled.button`   
    margin: 10px 10px;
    background:  ${props => props.disabled ? "transparent" : "black"};
    border: 3px solid ${props => props.disabled ? "transparent" : "black"};
    border-radius: 20px;
    padding: 5px;
    color: rgb(255, 231, 97);
    font-size: 1em;
    cursor: pointer;
    text-decoration: none;

    :hover{
        color: ${props => props.disabled ? "grey" : "white"};
        border-color: ${props => props.disabled ? "grey" : "white"};
    }
`;

const Span = styled.div`
    display: inline-block;
    background: black;
    border: 3px solid black;
    border-radius: 50%;
    padding: 5px;
    color: rgb(255, 231, 97);
    font-size: 1em;
`;

const People: React.FC = () => {

    const [page, setPage] = React.useState<number>(1);

    const fetchData = React.useCallback(async (key, page = 0) => {
        const {data} = await axios.get(`http://swapi.dev/api/people/?page=${page}`);     
        return data;
    },[]);

    const {resolvedData, latestData, status} = usePaginatedQuery(["people",page], fetchData);   
    
    return(
        <>
            <Wrapper>
                {status === 'loading' && (
                <div>Loading data</div>
                )}

                {status === 'error' && (
                <div>Error fetching data</div>
                )}

                {status === 'success' && (
                <div>
                    <div>
                        <Button 
                            type="button"
                            onClick={() => setPage(old => Math.max(old - 1, 1))} 
                            disabled={page === 1}>
                            Previous Page
                        </Button>
                        <Span>{ page }</Span>
                        <Button 
                            type="button"
                            onClick={() => setPage(old =>  (!latestData || !latestData.next ? old : old + 1))} 
                            disabled={!latestData || !latestData.next}
                            >
                            Next page
                        </Button>
                    </div>
                    {resolvedData.results.map((person:TPerson) => <Person key={person.name} person={person}/>)}
                </div>
                )} 
            </Wrapper>
            <ReactQueryDevtools initialIsOpen />
        </>
    )
};

export default People;