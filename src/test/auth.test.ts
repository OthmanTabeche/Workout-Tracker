import createApp from "../app.ts"
import request from "supertest";
import supabase from "../database/supabase.ts";

const app = createApp();
const api = request(app);

describe('Auth endpoints', () => {
    // Clean up test data after all tests
    afterAll(async () => {
        await supabase.from('users').delete().eq('email', 'test@example.com');
        await supabase.from('users').delete().eq('email', 'signin@example.com');
        await new Promise(resolve => setTimeout(resolve, 100));
    });

    describe('POST /auth/register', () => {
        it('should registre a new user', async () => {
            const res = await api
                .post('/auth/register')
                .send({ name: "TestUser", email: "test@example.com", password: "password123" });
                
                expect(res.statusCode).toBe(201)
                // expect(res.body).toHaveProperty('name')
                // expect(res.body).toHaveProperty('email')
                // expect(res.body).not.toHaveProperty('password')
        })

        it('should fail if email is missing', async () => {
            const res = await api
                .post('/auth/register')
                .send({ name: "Test", password: "password123" });
            
            expect(res.statusCode).toBe(400)
        })

        it('should fail if password is missing', async () => {
            const res = await api
                .post('/auth/register')
                .send({ name: "TestUser", email: "test@example.com" })
            
            expect(res.statusCode).toBe(400)
        })

        it('should fail if name is missing', async () => {
            const res = await api
                .post('/auth/register')
                .send({ email: "test@example.com", password: "password123" });
            
            expect(res.statusCode).toBe(400);
        })
    })

    describe('POST /auth/signin', () => {
        it('should sign in a new user', async () => {
            // First register the user
            await api.post('/auth/register').send({
                name: "SigninUser",
                email: "signin@example.com", 
                password: "password123"
            });

            // Then sign in
            const res = await api
                .post('/auth/signin')
                .send({
                    email: "signin@example.com", 
                    password: "password123" 
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("token");
        })

        it('should fail if password is incorrect', async () => {
            const res = await api
                .post('/auth/signin')
                .send({
                    email: "test@example.com", 
                    password: "wrongPassword"
                })

            expect(res.statusCode).toBe(400)
        })
    })
})