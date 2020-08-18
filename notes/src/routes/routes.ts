import {Router} from "express";
import {getTodos, addTodo, deleteTodo, updateTodo} from "../controllers/todos";

const router: Router = Router();

router.get("/api/todos", getTodos);
router.post("/api/todos", addTodo);
router.put("/api/todos/:id", updateTodo);
router.delete("/api/todos/:id", deleteTodo);

export default router;