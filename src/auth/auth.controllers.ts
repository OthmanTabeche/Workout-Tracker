import type { Request, Response } from 'express'
import authServices from './auth.services.ts'
import validator from 'validator'

// POST /auth/register
const register = async (req: Request, res: Response) =>  { // req.body.{name, email, password}
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' })
        }

        if (!validator.isAlpha(name)) {
            return res.status(400).json({ message: 'Name must contain only letters' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Provide a valid email address' })
        }

        if (!validator.isLength(password, { min: 4 })) {
            return res.status(400).json({ message: 'Password must be at least 4 characters long' })
        }

        const result = await authServices.register({name, email, password})
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' })
    }
}

interface SignIn {
    email: string
    password: string
}

// POST /auth/signin
const signIn = async (req: Request, res: Response) =>  { // req.body.{email, password}
    try {
        const {email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Provide a valid email address' })
        }

        const result = await authServices.signIn({email, password})
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' })
    }
}

export default {register, signIn}