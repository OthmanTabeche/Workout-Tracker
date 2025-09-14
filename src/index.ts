import express from "express";
import authRouter from './auth/auth.routes.ts'
import router from "./routes/workout.routes.ts";
import errorHandler from './middleware/errorHandler.ts';
import notFound from './middleware/notFound.ts';

const app = express();
app.use(express.json());

//auth
app.use('/auth', authRouter)

//CRUD
// GET /workouts
app.use('/', router)

// Middleware  (404)
app.use(notFound);

//Global error handler 
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});