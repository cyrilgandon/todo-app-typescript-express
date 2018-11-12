import { Request, Response } from 'express';
import { AnimalService } from '../app';
import { Animal, validate } from '../models/animal';

/**
 * GET /api/animals
 * Get all animals.
 */
export function getAnimals(req: Request, res: Response) {
    const animals = AnimalService.load();
    res.json(animals);
}

/**
 * GET /api/animals/:rfidKey
 * Get an animal with its REFID key.
 */
export function getAnimal(req: Request, res: Response) {
    const animals = AnimalService.load();
    const animal = animals.find((animal) => animal.rfidKey === req.params.rfidKey);
    if (!animal) {
        res.status(404).send('No animal exist with given RFID Key');
        return;
    }

    res.json(animal);
}

/**
 * POST /api/animals
 * Create a new Animal
 */
export function postAnimal(req: Request, res: Response) {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const { rfidKey, species, type, withersHeight, weight, description, entryDate } = req.body;
    const animals = AnimalService.load();

    // RFID key must be unique
    if (rfidKey) {
        const existing = animals.find((animal) => animal.rfidKey === rfidKey);
        if (existing) {
            res.status(400).send('Animal with given RFID Key already exists.');
            return;
        }
    }

    const animal: Animal = {
        rfidKey,
        species,
        type,
        withersHeight,
        weight,
        description,
        // Default to `now` if no value is known
        entryDate: entryDate || Date.now(),
    };

    animals.push(animal);

    AnimalService.save(animals);
    res.json(animal);
}
