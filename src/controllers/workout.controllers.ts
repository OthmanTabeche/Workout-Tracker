import type { Request, Response, NextFunction } from 'express'
import workoutServices from "../services/workout.services.ts";

// GET /workouts => Listar workouts del usuario
const getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id

        if (!userId) {
            const error = new Error('User not authenticated');
            (error as any).statusCode = 401;
            return next(error);
        }

        const result = await workoutServices.getWorkouts(userId)
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// POST /workouts => Crear nuevo plan
const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, name, description } = req.body

        if (!userId || !name || !description) {
            const error = new Error('Id, name and description are required');
            (error as any).statusCode = 400;
            return next(error);
        }

        const result = await workoutServices.createWorkout({ userId, name, description })
        res.status(201).json({
            success: true,
            data: result
        })

    } catch (error) {
        next(error)
    }
}  

export default { getWorkouts, createWorkout }