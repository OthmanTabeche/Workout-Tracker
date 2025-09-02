import supabase from "../../database/supabaseClient.ts";
import exercisesData from "./seeder.ts";

const seedExercises = async () => {
    try {
        const {data, error} = await supabase 
            .from("exercises")
            .upsert(exercisesData, { onConflict: "name" }); 
    
            if (error) {
                console.error(`Error seeding exercises:`, error.message);
                return; 
            }

        console.log(`Exercices seed correctly`)
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

export default seedExercises