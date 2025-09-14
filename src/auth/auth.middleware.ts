import type { NextFunction, Request, Response } from "express";
import config from "../utils/config.ts";
import jsonwebtoken from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).json({ message: "Access denied." });

        if (!config.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;