import { LocalStorage } from 'node-localstorage';
import { Animal } from '../models/animal';
import RepoService from './repoService';

export default class AnimalLocalStorage implements RepoService<Animal> {

    private readonly key = 'animalsApp-animals';

    private readonly localStorage: LocalStorage;
    constructor() {
        this.localStorage = new LocalStorage('./localStorage-Animals');
    }
    public save(data: Animal[]) {
        const asString = JSON.stringify(data);

        this.localStorage.setItem(this.key, asString);
    }

    public load(): Animal[] {
        const asString = this.localStorage.getItem(this.key);

        if (asString) {
            const data = JSON.parse(asString);
            return data;
        } else {
            return [];
        }
    }

}
