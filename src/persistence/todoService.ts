import { Todo } from '../models/todo';

export default interface TodoService {
    load(): Todo[];
    save(todos: Todo[]): void;
}
