import { Request, Response } from 'express';
import { TodoService } from '../app';
import { nextId } from '../models/entity';
import { Todo, validate } from '../models/todo';
import { asNumber, isBoolean } from '../util/parsing';

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
    const todoId = asNumber(req.params.todoId);
    if (todoId === undefined) {
        res.status(400).send('Given ID is not a number');
        return;
    }

    const todos = TodoService.load();
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) {
        res.status(404).send('No todo exist with given ID');
        return;
    }

    res.json(todo);
}

/**
 * Create a new Todo
 */
export function postTodo(req: Request, res: Response) {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const todos = TodoService.load();
    const now = Date.now();
    const todo: Todo = {
        creationDate: now,
        done: false,
        id: nextId(todos),
        lastUpdated: now,
        what: req.body.what,
    };
    todos.push(todo);

    TodoService.save(todos);
    res.json(todo);
}

/**
 * Update an existing Todo
 */
export function putTodo(req: Request, res: Response) {
    const todoId = asNumber(req.params.todoId);
    if (todoId === undefined) {
        res.status(400).send('Given ID is not a number');
        return;
    }

    const todos = TodoService.load();
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) {
        res.status(404).send('No todo exist with given ID');
        return;
    }

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const now = Date.now();

    todo.lastUpdated = now;

    const done = req.body.done;
    if (isBoolean(done)) {
        todo.done = done;
    }
    todo.what = req.body.what;
    TodoService.save(todos);

    res.json(todo);
}

/**
 * Delete a Todo
 */
export function deleteTodo(req: Request, res: Response) {
    const todoId = asNumber(req.params.todoId);
    if (todoId === undefined) {
        res.status(400).send('Given ID is not a number');
        return;
    }

    const todos = TodoService.load();

    const newTodos = todos.filter((todo) => todo.id !== todoId);
    TodoService.save(newTodos);

    res.json({});
}
