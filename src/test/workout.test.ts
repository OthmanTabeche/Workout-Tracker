import createApp from "../app.ts"
import request from "supertest";
import supabase from "../database/supabase.ts";

const app = createApp();
const api = request(app);

// Variables to store test data
let workoutId;
let token;

// CRUD test
describe('Workout endpoints', () => {
    beforeAll(async () => {
        // First register and sign in a user to get a token
        await api.post('/auth/register').send({
            name: "WorkoutTestUser",
            email: "workouttest@example.com", 
            password: "password123"
        });

        const authRes = await api.post('/auth/signin').send({
            email: "workouttest@example.com", 
            password: "password123"
        });
        
        token = authRes.body.token;
        // Insertamos un workout de prueba en la BD
        const { data, error } = await supabase
          .from("workouts")
          .insert([{ name: "Chest Day", description: "Bench press, dips, pushups" }])
          .select();
    
        if (error) throw error;
        workoutId = data[0].id;
      })

      afterAll(async () => {
        // Limpiar el workout creado
        await supabase.from("workouts").delete().eq("id", workoutId);
    
        // Limpiar usuarios de prueba si hiciste auth antes
        await supabase.from("users").delete().eq("email", "test@example.com");
        await supabase.from("users").delete().eq("email", "signin@example.com");
        await supabase.from("users").delete().eq("email", "workouttest@example.com");
    
        // pequeña espera para que Jest cierre conexiones bien
        await new Promise((resolve) => setTimeout(resolve, 100));
      })
    

    // GET /workouts
    describe('GET /workouts', () => {
        it('the user should get all workouts plan', async () => {
            const res = await api
                .get("/workouts")
                .set("Authorization", `Bearer ${token}`);

            const workout = res.body.find((w) => w.id === workoutId);

            expect(res.statusCode).toBe(200)
            expect(workout).toHaveProperty("name")
            expect(workout).toHaveProperty("description")
        })
    })

    // POST /workouts
    describe('POST /workouts', () => {
        it('should create a new workout', async () => {
            const res = await api
                .post("/workouts")
                .set("Authorization", `Bearer ${token}`)
                .send({ name: "Test Workout", description: "Test description" });

            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("description")
        })
    })

    // PUT /workouts/:id
    describe('PUT /workouts/:id', () => {
        it('should update a workout', async () => {
            const res = await api
                .put(`/workouts/${workoutId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ name: "Updated Workout", description: "Updated description" });

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("description")
        })
    })

    // DELETE /workouts/:id
    describe('DELETE /workouts/:id', () => {
        it('should delete a workout', async () => {
            const res = await api
                .delete(`/workouts/${workoutId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200)
        })
    })

    // POST /workouts/:id/schedule
    describe('/workouts/:id/schedule', () => {
        it('should schedule a workout', async () => {
            const res = await api
                .post(`/workouts/${workoutId}/schedule`)
                .set("Authorization", `Bearer ${token}`)
                .send({ scheduled_date: new Date().toISOString() });

            expect(res.statusCode).toBe(200)
        })
    })
})