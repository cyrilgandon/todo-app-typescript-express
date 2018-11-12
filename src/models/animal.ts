import { any } from 'async';
import Joi, { AnySchema } from 'joi';

// TODO: do some researcg on RFID minimum size ID
const rfidMinimumSize = 10;

/**
 * Allow type checking in the schema definition
 */
type JoiSchema<T> = {
  [P in keyof T]?: AnySchema;
};

const schema: JoiSchema<Animal> = {
  // TODO: Some more validation on the RFID key must be done before validating
  rfidKey: Joi.string().min(rfidMinimumSize),
  species: Joi.string().required().min(3),
  type: Joi.string(),
  withersHeight: Joi.number().required(),
  weight: Joi.number().required(),
  // TODO: Ask for minimum size of description. If this is required, can it be empty?
  description: Joi.string().required(),
  entryDate: Joi.number(),
};

export interface Animal {
  rfidKey?: string;
  species: string;
  type?: string;

  /**
   * Withers Height in centimeter
   */
  withersHeight: number;
  /**
   * Weight in grammes
   */
  weight: number;
  /**
   * Special attribute, location found, etc.
   */
  description: string;
  entryDate: number;
}

/**
 * Valid the data of an animal for creation
 * @param animal The data for validation
 */
export function validate(animal: any) {
  return Joi.validate(animal, schema);
}
