import type { Request, Response } from "express"
import validator from 'validator';
import service from "./authService.ts"

const register = async (req: Request, res: Response) => { //req.body
    try {
        const userData = req.body

        const isEmailValid = validator.isEmail(userData.email)

        if (!isEmailValid || !userData.email) {
            return res.status(400).json({ message: 'Email must be valid' })
        }

        if (!userData.name) {
            return res.status(400).json({ message: 'Name is required' })
        }

        if (!userData.password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        const response = await service.register(userData)
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ message: error })
    }

}

export default { register }