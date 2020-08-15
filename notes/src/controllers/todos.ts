import {Response, Request} from "express";
import pool from "../database";
import {Todos, AddTodo} from "../types/types";

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try{
        const data: any | null = await pool.query('SELECT * FROM notes ORDER BY created_at DESC;');
        const todos:Todos[] = data.rows;
        res.json({
            success: true,
            todos
        });
    }catch(error){
        res.json({success: false});
    }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
    const {name, description, status} = req.body.dataTodo as AddTodo;
    try{
        const data: any | null = await pool.query('INSERT INTO notes (name,description,status) VALUES ($1, $2, $3) RETURNING *;', [name, description, status]);
        const todos:Todos[] = data.rows[0];
        res.json({
            success: true,
            todos
        })
    }catch(error){
        res.json({success: false});
    }   
    
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    const {params: {id}, body: {status}} = req;    
    try{
        await pool.query('UPDATE notes SET status = $2 WHERE id = $1;',[id,status])
        const data: any | null = await pool.query('SELECT * FROM notes ORDER BY created_at DESC;');
        const todos:Todos[] = data.rows;
        res.json({
            success: true,
            todos
        })
    }catch(error){
        res.json({success: false});
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    try{        
        await pool.query('DELETE FROM notes WHERE id=$1;', [id]);
        const data: any | null = await pool.query('SELECT * FROM notes ORDER BY created_at DESC;');
        const todos:Todos[] = data.rows;
        res.json({
            success: true,
            todos
        });
    }catch(error){
        res.json({success: false});
    } 

}

export {getTodos, addTodo, updateTodo, deleteTodo};