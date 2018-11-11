import { LocalStorage } from 'node-localstorage';
import { Todo } from '../models/todo';
import TodoService from './todoService';

export default class TodoLocalStorage implements TodoService {

    private readonly key = 'todosApp-todos';

    private readonly localStorage: LocalStorage;
    constructor() {
        this.localStorage = new LocalStorage('./localStorage-Todos');
    }
    public save(todos: Todo[]) {
        const todosAsString = JSON.stringify(todos);

        this.localStorage.setItem(this.key, todosAsString);
    }

    public load(): Todo[] {
        const todosAsString = this.localStorage.getItem(this.key);

        if (todosAsString) {
            const todos = JSON.parse(todosAsString);
            return todos;
        } else {
            return [];
        }
    }

}
