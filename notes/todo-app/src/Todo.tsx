import React from "react";
import {TTodos} from "./type";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TodoWrapper = styled.div`
    padding: 5px;
    color: white;
    background-color: ${props => props.theme === true  ? "green" : "blue"};
    text-decoration: ${props => props.theme === true  ? "line-through" : "none"};
    cursor: pointer;

    &:hover{
        text-decoration: ${props => props.theme !== true ? "line-through" : ""};
        background-color: ${props => props.theme !== true  ? "yellow" : ""};
        color: ${props => props.theme !== true  ? "black" : ""};
    }
`;

const Button = styled.button`
    padding: 5px;
    background-color: pink;
    cursor: pointer;

    &:hover{
        background-color: white;
    }
`;

interface Props{
    todo: TTodos;
    deleteTodo:(id:number) => void;
    updateTodo:(id:number, status:boolean) => void;
};

const Todo: React.FC<Props> = ({todo, deleteTodo, updateTodo}) => {

    return(
        <Wrapper>
            <TodoWrapper 
                onClick={() => {
                    if(!todo.status){
                        updateTodo(todo.id, true);
                    }
                }}
                theme={todo.status}
            >
                <div>{todo.name}</div>
                <div>{todo.description}</div>
                <div>{todo.created_at}</div>
            </TodoWrapper>
            <Button type="button" onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </Wrapper>
    )
}

export default Todo;