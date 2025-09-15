import supabase from '../database/supabase.ts'

interface Exercise {
    exercise_id: number;
    sets: number;
    reps: number;
    weight?: number;
    rest_time_seconds?: number;
    order_in_workout: number;
    notes?: string;
}

interface DataWorkout {
    userId: number
    name: string
    description: string
    exercises?: Exercise[];
}

interface ScheduleWorkoutData {
    userId: number;
    schedule: Date;
}

// GET /workouts
const listWorkouts = async (userId: string) => {
    try {
        const { data: workouts, error } = await supabase
            .from('workout_plans')
            .select(`
                id,
                user_id,
                name,
                description,
                inserted_at,
                updated_at,
                scheduled_workouts(
                    scheduled_date,
                    status
                )`
            )
            .eq('user_id', userId)
            .order("scheduled_date", { ascending: true })

        if (error) {
            throw new Error(`Database error: ${error.message}`);
        }

        return { workouts: workouts || [] };

    } catch (error) {
        throw error
    }   
}

// POST /workouts 
const createWorkout = async (data: DataWorkout) => {
    try {
        const { userId, name, description, exercises } = data

        const { data: plan, error: planError } = await supabase
            .from('workout_plans')
            .insert({
                user_id: userId,
                name: name,
                description: description
            })
            .select()
            .single()

        if (planError || !plan) {
            throw new Error(`Failed to create workout plan: ${planError?.message}`)
        }

        if (!exercises || exercises.length === 0) {
            throw new Error('At least one exercise is required to create a workout')
        }
    
        const exercisesToInsert = exercises.map(ex => ({
            workout_plan_id: plan.id, // la unica cosa que NO VIENE DEL REQUEST
            exercise_id: ex.exercise_id,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight || null,
            rest_time_seconds: ex.rest_time_seconds || null,
            order_in_workout: ex.order_in_workout,
            notes: ex.notes || null
          }))

          
          const { data: insertedExercises, error: exercisesError } = await supabase
            .from('workout_plan_exercises')
            .insert(exercisesToInsert)
            .select()

        if (exercisesError) {
            await supabase.from('workout_plans').delete().eq('id', plan.id)
            throw new Error(`Failed to add exercises: ${exercisesError.message}`)
        }

        return {
            ...plan,
            exercises: insertedExercises
          }

    } catch (error) {
        throw error
    }
}

// PUT /workouts/:id
const updateWorkout = async (workoutId: number, data: DataWorkout) => {
    const { userId, name, description, exercises } = data
    
    try {
        const { data: existingWorkout, error: workoutError } = await supabase
            .from('workout_plans')
            .select('*')
            .eq('id', workoutId)
            .eq('user_id', userId)
            .single()

        if (workoutError || !existingWorkout) {
            throw new Error('Workout not found or access denied')
        }
        
        // Update workout plan basic info
        const { data: updatedWorkout, error: updateError } = await supabase
            .from('workout_plans')
            .update({name, description})
            .eq('id', workoutId)
            .eq('user_id', userId)
            .select()
            .single()
        
        if (updateError || !updatedWorkout) {
            throw new Error(`Failed to update workout plan: ${updateError?.message}`)
        }

        // Handle exercises if provided
        if (exercises && exercises.length > 0) {
            // Upsert exercises (update if exists, insert if not)
            const exercisesToUpsert = exercises.map(ex => ({
                workout_plan_id: workoutId,
                exercise_id: ex.exercise_id,
                sets: ex.sets,
                reps: ex.reps,
                weight: ex.weight || null,
                rest_time_seconds: ex.rest_time_seconds || null,
                order_in_workout: ex.order_in_workout,
                notes: ex.notes || null
            }))

            const { data: upsertedExercises, error: upsertError } = await supabase
                .from('workout_plan_exercises')
                .upsert(exercisesToUpsert)
                .select()
            
            if (upsertError) {
                throw new Error(`Failed to update exercises: ${upsertError.message}`)
            }

            return {
                ...updatedWorkout,
                exercises: upsertedExercises
            }
        }

        return updatedWorkout

    } catch (error) {
        throw error
    }
}

// DELETE /workouts/:id
const deleteWorkouts = async (workoutId: number, userId: number) => {
    try {
        const { data: existingWorkout, error: checkError } = await supabase
            .from('workout_plans')
            .select('id')
            .eq('id', workoutId)
            .eq('user_id', userId)
            .single()

        if (checkError || !existingWorkout) {
            throw new Error('Workout not found or access denied')
        }

        const { data, error } = await supabase
            .from('workout_plans')
            .delete()
            .eq('id', workoutId)
            .eq('user_id', userId)
        
        if (error) {
            throw new Error(`Error: ${error.message}`);
        }

        return { message: 'Workout deleted successfully' }
        
    } catch (error) {
        throw error
    }   
}

// POST /workouts/:id/schedule
const scheduleWorkouts = async (workoutId: number, data: ScheduleWorkoutData) => {
    const { userId, schedule } = data
    
    try {
        const { data: existingWorkout, error: checkError } = await supabase
            .from('workout_plans')
            .select('id')
            .eq('id', workoutId)
            .eq('user_id', userId)
            .single()

        if (checkError || !existingWorkout) {
            throw new Error('Workout not found or access denied')
        }

        if (!schedule) {
            throw new Error('A date is required to schedule a workout')
        }

        const insertDate = schedule

        const {data: scheduleWorkouts, error} = await supabase
            .from('scheduled_workouts')
            .insert({
                'user_id': userId,
                'workout_plan_id': workoutId,
                'scheduled_date': insertDate})
            .select()
            .single()

        if (error) {
            throw new Error('Workout not scheduled')
        }

        return {
            ...existingWorkout,
            schedule: scheduleWorkouts
        }

    } catch (error) {
        throw(error)
    }   
}

export default { listWorkouts, createWorkout, updateWorkout, deleteWorkouts, scheduleWorkouts }