import supabase from '../database/supabase.ts'
import bcrypt from 'bcrypt'
const saltRounds = 10;
import jsonwebtoken from 'jsonwebtoken'
import config from '../utils/config.ts';

interface Register {
    name: string
    email: string
    password: string
}

// POST /auth/register
const register = async (data: Register) =>  { // req.body.{name, email, password}
    try {
        const { name, email, password } = data

        const { data: existing, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email);

        if (checkError) {
            throw new Error(`Database error: ${checkError.message}`);
        }

        if (existing && existing.length > 0) {
            throw new Error("Email already registered");
        }

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const {data: newUser, error: notRegistered} = await supabase
            .from('users')
            .insert({name: name, email: email, password_hash: passwordHash})
            .select()
        
        if (notRegistered) {
            throw new Error(notRegistered.message)
        }

        if (!newUser || newUser.length === 0) {
            throw new Error("Failed to create user");
        }

        return {user: {id: newUser[0].id, name, email}}
    } catch (error) {
        throw error;
    }
}

interface SignIn {
    email: string
    password: string
}

// POST /auth/signin
const signIn = async (data: SignIn) =>  { // req.body.{email, password}
    try {
        const {email, password} = data

        const {data: users, error} = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
        
        if (error) {
            throw new Error(`Database error: ${error.message}`)
        }

        if (!users || users.length === 0) {
            throw new Error(`Invalid credentials`)
        }
            
        const user = users[0]
        const isValid = await bcrypt.compare(password, user.password_hash)

        if (!isValid) {
            throw new Error(`Invalid credentials`)
        }

        if (!config.JWT_SECRET) {
            throw new Error('JWT secret not configured')
        }

        const token = jsonwebtoken.sign(
            {id: user.id, email: user.email},
            config.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {user: {id: user.id, name: user.name, email: user.email}, token}
    } catch (error) {
        throw error;
    }
}

export default {register, signIn}