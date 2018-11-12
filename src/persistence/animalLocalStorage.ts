import { LocalStorage } from 'node-localstorage';
import { Animal } from '../models/animal';
import AnimalService from './animalService';

export default class AnimalLocalStorage implements AnimalService {

    private readonly key = 'animalsApp-animals';

    private readonly localStorage: LocalStorage;
    constructor() {
        this.localStorage = new LocalStorage('./localStorage-Animals');
    }
    public save(animals: Animal[]) {
        const asString = JSON.stringify(animals);

        this.localStorage.setItem(this.key, asString);
    }

    public load(): Animal[] {
        const asString = this.localStorage.getItem(this.key);

        if (asString) {
            const todos = JSON.parse(asString);
            return todos;
        } else {
            return [];
        }
    }

}
