import { Request, Response } from 'express';

/**
 * GET /api
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  res.json({ foo: 'bar' });
};
