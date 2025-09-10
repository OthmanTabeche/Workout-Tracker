import supabase from '../database/supabase.js'
import bcrypt from 'bcrypt'
const saltRounds = 10;
import jsonwebtoken from 'jsonwebtoken'
import config from '../utils/config.js';

interface Register {
    name: string
    email: string
    password: string
}

// POST /auth/register
const register = async (data: Register) =>  { // req.body.{name, email, password}
    const { name, email, password } = data

    const { data: existing } = await supabase
        .from('user')
        .select('id')
        .eq('email', email)
        .single();

    if (existing) {
        throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const {data: newUser, error: notRegistered} = await supabase
        .from('user')
        .insert({name: name, email: email, password_hash: passwordHash})
        .select()
    
    if (notRegistered) {
        throw new Error(notRegistered.message)
    }

    return {user: {id: newUser[0].id, name, email}}
}

interface SignIn {
    email: string
    password: string
}

// POST /auth/signin
const signIn = async (data: SignIn) =>  { // req.body.{email, password}
    const {email, password} = data

    const {data: users, error} = await supabase
        .from('user')
        .select('*')
        .eq('email', email)
    
    if (error || !users || users.length === 0) {
        throw new Error(`Invalid credentials`)
    }
        
    const user = users[0]
    const isValid = await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
        throw new Error(`Invalid credentials`)
    }

    const token = jsonwebtoken.sign(
        {id: user.id, email: user.email},
        config.JWT_SECRET!,
        { expiresIn: '1h' }
    )

    return {user: {id: user.id, name: user.name, email: user.email}, token}
}

export default {register, signIn}