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
import * as animalController from './controllers/animal';

import AnimalLocalStorage from './persistence/animalLocalStorage';
import AnimalService from './persistence/animalService';

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
 * Animal routes.
 */
app.get('/api/animals', animalController.getAnimals);
app.post('/api/animals', animalController.postAnimal);
app.get('/api/animals/:rfidKey', animalController.getAnimal);

// Initialize localStorage service
export const AnimalService: AnimalService = new AnimalLocalStorage();

export default app;
