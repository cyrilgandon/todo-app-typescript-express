import { LocalStorage } from 'node-localstorage';
import { Todo } from '../models/todo';
import TodoService from './todoService';

export default class TodoLocalStorage implements TodoService {

    private readonly persistenceKey = 'todosApp::todos';

    private readonly localStorage: LocalStorage;
    constructor() {
        this.localStorage = new LocalStorage('./scratch');
    }
    public save(todos: Todo[]) {
        const todosAsString = JSON.stringify(todos);

        this.localStorage.setItem(this.persistenceKey, todosAsString);
    }

    public load(): Todo[] {
        const todosAsString = this.localStorage.getItem(this.persistenceKey);

        if (todosAsString) {
            const todos = JSON.parse(todosAsString);
            return todos;
        } else {
            return [];
        }
    }

}
