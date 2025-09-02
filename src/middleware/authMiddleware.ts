import type { NextFunction, Request, Response } from "express";
import config from "../utils/config.ts";
import jwt from "jsonwebtoken";

const JWT_SECRET = config.JWT_SECRET

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('sss')
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: 'Missing TOKEN'})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET!);
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Inavlid token or expired' });
    }
}

export default authenticateToken 

