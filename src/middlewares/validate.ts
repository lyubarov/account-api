import type { Request, Response, NextFunction } from "express";
import { z } from "zod";


export const validate = (schema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if(error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues });
      } else {
        throw error;
      }
    }
  }
};