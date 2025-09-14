import express from 'express'
import authControllers from './auth.controllers.ts'

const authRouter = express.Router()

// POST /auth/register
authRouter.post('/register', authControllers.register)

// POST /auth/signin
authRouter.post('/signin', authControllers.signIn)

export default authRouter