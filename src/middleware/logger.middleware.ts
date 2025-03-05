import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

interface JwtPayload {
    id: number;
}

declare module 'express' {
    export interface Request {
      currentUser?: UserEntity;
    }
  }
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer')) {
            return next();
        }

        try {
            const token = authHeader.split(' ')[1];
            
            const { id } = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            console.log(id);
            
            const userId = Number(id);
            
            const currentUser = await this.userService.getUserById(userId);
            if (!currentUser) {
                return next();
            }
            req.currentUser = currentUser;
        } catch (error) {
            console.log('Invalid Token:', error.message);
        }

        next()
    }
}

