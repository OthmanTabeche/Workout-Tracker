import express from 'express'
import workoutControllers from '../controllers/workout.controllers.ts'
import authMiddleware from '../auth/auth.middleware.ts'

const router = express.Router()

// GET /workouts
router.get('/workouts', authMiddleware, workoutControllers.listWorkouts)

// POST /workouts
router.post('/workouts', authMiddleware, workoutControllers.createWorkout)

// PUT /workouts/:id
router.put('/workouts/:id', authMiddleware, workoutControllers.updateWorkout)

// DELETE /workouts/:id
router.delete('/workouts/:id', authMiddleware, workoutControllers.deleteWorkouts)

// POST /workouts/:id/schedule
router.post('/workouts/:id/schedule',authMiddleware, workoutControllers.scheduleWorkouts)



export default router