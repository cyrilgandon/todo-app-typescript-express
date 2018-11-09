import { Request, Response } from 'express';
import { TodoService } from '../app';
import { Todo } from '../models/todo';
import { asNumber } from '../util/parsing';

function makeId() {
    return Math.floor((Math.random() * 100000) + 1);
}
/**
 * GET /api/todos
 * Get all todos.
 */
export function getTodos(req: Request, res: Response) {
    const todos = TodoService.load();
    res.json(todos);
}

/**
 * GET /api/todos/:todoId
 * Get todo with todoId.
 */
export function getTodo(req: Request, res: Response) {
    const todos = TodoService.load();

    const todoId = asNumber(req.params.todoId);
    if (todoId !== undefined) {
        const todo = todos.filter((todo) => todo.id === todoId)[0];
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send(`Cannot find todo with id ${todoId}`);
        }
    } else {
        res.status(412).send(`id ${todoId} is not a number`);
    }
}

/**
 * Create a new Todo
 */
export function postTodos(req: Request, res: Response) {
    const todos = TodoService.load();
    const todo = {
        creationDate: Date.now(),
        done: false,
        id: makeId(),
        what: req.body.what,
    };
    todos.push(todo);

    TodoService.save(todos);
    res.json(todo);
}

/**
 * Update an existing Todo
 */
export function postTodo(req: Request, res: Response) {
    const todos = TodoService.load();

    const todoId = asNumber(req.params.todoId);
    if (todoId !== undefined) {
        const todo = todos.filter((todo) => todo.id === todoId)[0];
        if (todo) {

            todo.done = req.body.done;
            todo.what = req.body.what;

            TodoService.save(todos);

            res.json(todo);
        } else {
            res.status(404).send(`Cannot find todo with id ${todoId}`);
        }
    } else {
        res.status(412).send(`id ${todoId} is not a number`);
    }
}

/**
 * Delete an existing Todo
 */
export function deleteTodo(req: Request, res: Response) {
    const todos = TodoService.load();

    const todoId = asNumber(req.params.todoId);
    if (todoId !== undefined) {
        const newTodos = todos.filter((todo) => todo.id !== todoId);
        TodoService.save(newTodos);
        res.status(200);
        res.json({});
    } else {
        res.status(412).send(`id ${todoId} is not a number`);
    }
}
