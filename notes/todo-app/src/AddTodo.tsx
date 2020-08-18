import React, {useState} from "react";
import {TTodos, TAddTodo} from "./type";
import styled from "styled-components";

const Wrapper = styled.form`
    width: calc(100vw - 20px);
    border: 2px solid black;
    margin: 10px;
    display: flex;
    align-items:center;
    justify-content:center;
`;

const Input = styled.input`
    margin: 10px;
    padding: 10px;
    font-size: 2rem;
`;

const Button = styled.button`
    padding: 10px;
    cursor:pointer;
`;

interface Props{
    addTodo:(dataTodo: TAddTodo) => void;
}

const AddTodo: React.FC<Props>= ({addTodo}) => {

    const [data, setData] = useState<TAddTodo>({name:"", description:"", status:false})

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setData({...data, [e.currentTarget.name]: e.currentTarget.value});
    };

    const submit = () :void => {
        if(data.name && data.description){
            addTodo(data);
            setData({name:"", description:"", status:false});
        }        
    };

    return(
        <Wrapper>
            <Input type="text" name="name" value={data.name} placeholder="Type a name" onChange={handleChange}/>
            <Input type="text" name="description" value={data.description} placeholder="Type a description" onChange={handleChange}/>
            <Button type="button" onClick={submit}>Add Todo</Button>
        </Wrapper>
    )
}

export default AddTodo;