import type { Request, Response, NextFunction } from 'express'
import workoutServices from "../services/workout.services.ts";
import validator from 'validator';

// GET /workouts => Listar workouts del usuario
const listWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    
    try {
        if (!userId) {
            const error = new Error('User not authenticated');
            (error as any).statusCode(401);
            return next(error);
        }

        const data = await workoutServices.listWorkouts(userId)
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        next(error)
    }
}

// POST /workouts => Crear nuevo plan
const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, name, description, exercises } = req.body
    
    try {       
        if (!userId) {
            const error = new Error('User not authenticated');
            (error as any).statusCode(401);
            return next(error);
        }

        if (!name || !description || !exercises) {
            const error = new Error('Name, description, exercises are required');
            (error as any).statusCode(400);
            return next(error);
        }

        const data = await workoutServices.createWorkout({ userId, name, description, exercises });

        res.status(201).json({
            success: true,
            message: 'Workout plan created successfully',
            data: data
        });

    } catch (error) {
        next(error)
    }
}

const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, name, description, exercises } = req.body
    const workoutId = parseInt(req.params.id || '0')

    try {
        if (!userId) {
            const error = new Error('User not authenticated');
            (error as any).statusCode(401);
            return next(error);
        }

        if (!workoutId || isNaN(workoutId)) {
            const error = new Error('Valid workout ID is required');
            (error as any).statusCode(400);
            return next(error);
        }

        if (!name || !description) {
            const error = new Error('Name and description are required');
            (error as any).statusCode(400);
            return next(error);
        }

        const data = await workoutServices.updateWorkout(workoutId, { userId, name, description, exercises });

        res.status(200).json({
            success: true,
            message: 'Workout plan updated successfully',
            data: data
        });

    } catch (error) {
        next(error)
    }
}

// DELETE /workouts/:id
const deleteWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const workoutId = parseInt(req.params.id || '0')

    try {
        if (!userId) {
            const error = new Error('User not authenticated');
            (error as any).statusCode = 401;
            return next(error);
        }

        if (!workoutId || isNaN(workoutId)) {
            const error = new Error('Valid workout ID is required');
            (error as any).statusCode = 400;
            return next(error);
        }

        const data = await workoutServices.deleteWorkouts(workoutId, userId)

        res.status(200).json({
            success: true,
            message: 'Workout plan deleted successfully',
            data: data
        })
    } catch (error) {
        next(error)
    }   
}

// POST /workouts/:id/schedule
const scheduleWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    const workoutId = parseInt(req.params.id || '0')
    const { userId, schedule } = req.body

    try {
        if (!userId) {
            const error = new Error('User not authenticated');
            (error as any).statusCode = 401;
            return next(error);
        }

        if (!workoutId || isNaN(workoutId)) {
            const error = new Error('Valid workout ID is required');
            (error as any).statusCode = 400;
            return next(error);
        }

        if (!schedule) {
            const error = new Error('A date is required to schedule a workout');
            (error as any).statusCode = 400
            return next(error);
        }

        const isValidDate = validator.isISO8601(schedule,{ strict: false} )

        if (!isValidDate) {
            const error = new Error('Error insert a valid date to schedule a workout, expected input: YYYY-MM-DDThh:mm:ss, exemple: 2025-09-16T00:43:00');
            (error as any).statusCode = 400;
            return next(error);
        }

        const dateObj = new Date(schedule)

        const data = workoutServices.scheduleWorkouts(workoutId, {userId, schedule: dateObj})
        res.status(200).json({
            success: true,
            message: 'Workout plan scheduled successfully',
            data: data
        })
        
    } catch (error) {
        next(error)
    }   
}

export default { listWorkouts, createWorkout, updateWorkout, deleteWorkouts, scheduleWorkouts }