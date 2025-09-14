import express from 'express'
import workoutControllers from '../controllers/workout.controllers.ts'
import authMiddleware from '../auth/auth.middleware.ts'

const router = express.Router()

// GET /workouts
router.get('/workouts', authMiddleware, workoutControllers.getWorkouts)

// POST /workouts
router.post('/workouts', authMiddleware, workoutControllers.createWorkout)

export default router