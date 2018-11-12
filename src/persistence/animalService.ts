import { Animal } from '../models/animal';

export default interface AnimalService {
    load(): Animal[];
    save(todos: Animal[]): void;
}
