import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {TTodos, ResJSON, ResJSON2, TAddTodo} from "./type";
import axios, {AxiosResponse} from "axios";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

const Headline = styled.h1`
    text-align: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-gap: 1.5rem;
    justify-content: center;
    align-items:center;
`;


const App: React.FC = () => {

    const [todos, setTodos] = useState<TTodos[]>([]);

    useEffect(() => {
        fetchTodos();
    },[]);

    const fetchTodos = async() : Promise<void> => {
        try{
            const {data}: AxiosResponse<ResJSON> = await axios.get("http://localhost:8080/api/todos");
            if(data.success){
                setTodos(data.todos);
            }else{
                setTodos([]);
            }            
        }catch(error){
            console.log(error);
        }
        
    };

    const deleteTodo = async(id: number) : Promise<void> => {
        try{
            const {data}: AxiosResponse<ResJSON> = await axios.delete(`http://localhost:8080/api/todos/${id}`);
            if(data.success){
                setTodos(data.todos);
            }else{
                setTodos([]);
            } 
        }catch(error){
            console.log(error);
        }
    };

    const updateTodo = async(id: number, status:boolean) : Promise<void> => {
        try{
            const {data}: AxiosResponse<ResJSON> = await axios.put(`http://localhost:8080/api/todos/${id}`, {status});
            if(data.success){
                setTodos(data.todos);
            }else{
                setTodos([]);
            } 
        }catch(error){
            console.log(error);
        }
    }

    const addTodo = async(dataTodo: TAddTodo) : Promise<void> => {
        try{
            const {data}: AxiosResponse<ResJSON2> = await axios.post("http://localhost:8080/api/todos", {dataTodo});
            if(data.success){
                const newTodos = [data.todos, ...todos];
                setTodos(newTodos);
            }else{
                setTodos([]);
            } 
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <Headline>Our Todo-App</Headline>
            <AddTodo addTodo={addTodo}/>
            <Grid>
                {todos.length > 0 && todos.map(item => <Todo key={item.id} todo={item} deleteTodo={deleteTodo} updateTodo={updateTodo}/>)}
            </Grid>
        </>
    );
}

export default App;
