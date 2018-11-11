import bodyParser from 'body-parser';
import compression from 'compression';  // compresses requests
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import path from 'path';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

// Controllers (route handlers)
import * as apiController from './controllers/api';
import * as todoController from './controllers/todo';

import TodoLocalStorage from './persistence/todoLocalStorage';
import TodoService from './persistence/todoService';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.get('/api', apiController.index);
app.get('/api/todos', todoController.getTodos);
app.post('/api/todos', todoController.postTodo);

app.get('/api/todos/:todoId', todoController.getTodo);
app.put('/api/todos/:todoId', todoController.putTodo);
app.delete('/api/todos/:todoId', todoController.deleteTodo);

// Initialize localStorage service
export const TodoService: TodoService = new TodoLocalStorage();

export default app;
