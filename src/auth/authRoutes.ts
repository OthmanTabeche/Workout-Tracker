import express from "express"
const authRouter = express.Router()
import authController from "./authController.ts"
import authenticateToken from "../middleware/authMiddleware.ts"

//POST auth/register
authRouter.post('/auth/register', authController.register)
authRouter.post('/auth/login',authenticateToken, authController.login)


export default authRouter 