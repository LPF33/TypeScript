"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const database_1 = __importDefault(require("../database"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.query('SELECT * FROM notes ORDER BY created_at DESC;');
        const todos = data.rows;
        res.json({
            success: true,
            todos
        });
    }
    catch (error) {
        res.json({ success: false });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, status } = req.body.dataTodo;
    try {
        const data = yield database_1.default.query('INSERT INTO notes (name,description,status) VALUES ($1, $2, $3) RETURNING *;', [name, description, status]);
        const todos = data.rows[0];
        res.json({
            success: true,
            todos
        });
    }
    catch (error) {
        res.json({ success: false });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body: { status } } = req;
    try {
        yield database_1.default.query('UPDATE notes SET status = $2 WHERE id = $1;', [id, status]);
        const data = yield database_1.default.query('SELECT * FROM notes ORDER BY created_at DESC;');
        const todos = data.rows;
        res.json({
            success: true,
            todos
        });
    }
    catch (error) {
        res.json({ success: false });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.default.query('DELETE FROM notes WHERE id=$1;', [id]);
        const data = yield database_1.default.query('SELECT * FROM notes ORDER BY created_at DESC;');
        const todos = data.rows;
        res.json({
            success: true,
            todos
        });
    }
    catch (error) {
        res.json({ success: false });
    }
});
exports.deleteTodo = deleteTodo;
