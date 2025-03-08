import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    if (!authHeader)
      return res.status(401).json({ error: 'No token provided' });
    if (!authHeader.startsWith('Bearer'))
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authHeader.split(' ').at(1) || '';

    try {
      const payload =
      
    } catch (error) {
      
    }

    next();
  }
}
