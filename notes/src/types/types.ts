export interface Todos{
    id: number;
    name: string;
    description: string;
    status: boolean;
    created_at: string;
}

export interface AddTodo{
    name: string;
    description: string;
    status: boolean;
}

export interface ResJSON{
    success: boolean;
    todos?: Todos[]
}