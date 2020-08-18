export interface TTodos{
    id: number;
    name: string;
    description: string;
    status: boolean;
    created_at: string;
}

export interface ResJSON{
    success: boolean;
    todos: TTodos[]
}

export interface ResJSON2{
    success: boolean;
    todos: TTodos
}

export interface ApiDataType{
    config: any;
    data: ResJSON;
    headers: Headers;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
}

export interface TAddTodo{
    name: string;
    description: string;
    status: boolean;
}
