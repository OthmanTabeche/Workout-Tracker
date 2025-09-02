import express from 'express';
import router from './auth/authRoutes.ts';

const app = express()
app.use(express.json());

app.use('/', router)

export default app