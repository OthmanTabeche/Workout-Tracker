import express from "express"
const router = express.Router()
import authController from "./authController.ts"

//POST auth/register
router.post('/auth/register', authController.register)

export default router 