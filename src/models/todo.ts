import Joi from 'joi';
import { Entity } from './entity';

const schema = {
  what: Joi.string().required().min(3),
  done: Joi.boolean(),
};

export interface Todo extends Entity {
  creationDate: number;
  done: boolean;
  lastUpdated: number;
  what: string;
}

export function validate(todo: any) {
  return Joi.validate(todo, schema);
}
