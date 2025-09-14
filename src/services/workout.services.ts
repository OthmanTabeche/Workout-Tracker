import supabase from '../database/supabase.ts'

// GET /workouts => Listar workouts del usuario
const getWorkouts = async (userId: string) => {
    try {
        const { data: workouts, error } = await supabase
            .from('workout_plans')
            .select('*')
            .eq('user_id', userId)

        if (error) {
            throw new Error(`Database error: ${error.message}`);
        }

        return { workouts: workouts || [] };

    } catch (error) {
        throw error
    }
}

// POST /workouts => Crear nuevo plan
interface CreateWorkout {
    userId: number
    name: string
    description: string
    exercises: string[];
}

const createWorkout = async (data: CreateWorkout) => {
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
        
        // Ahora tengo que hacer el instert de los ejerciicos en el plan recen creado
        // Hago un map sobre exercice y lleno la tabla y lugeo hago un insert en workouts_plan_exercice

    } catch (error) {
        throw error
    }
}

export default { getWorkouts, createWorkout }