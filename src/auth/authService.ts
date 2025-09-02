import supabase from "../database/supabaseClient.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config.ts";

const JWT_SECRET = config.JWT_SECRET

interface RegisterUserData {
    name: string;
    email: string;
    password: string;
}

//POST auth/register
const register = async (userData: RegisterUserData) => { //req.body
    const { name, email, password } = userData;
    const saltRounds = 10;
    const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

    if (existingUser) {
        throw new Error('Your email is already registered');
    }

    const passwordHashed = await bcrypt.hash(password, saltRounds);

    const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
            { name: name, email: email, password_hash: passwordHashed }
        ])
        .select()

    if (insertError) {
        throw new Error(`Insert error: ${insertError.message}`)
    }

    return newUser
}

interface LogInUserData {
    email: string;
    password: string;
}

// POST /auth/login
const login = async (userData: LogInUserData) => {
    const {email, password} = userData

    const {data: user} = await supabase
        .from("users")
        .select('id, name, email, password_hash')
        .eq('email', email)
        .maybeSingle();
    
    if (!user) {
        throw new Error('Invalid credentails');
    }

    const isValidPassword = await bcrypt.compare(password, user?.password_hash)

    if (!isValidPassword) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {id: user.id, email: user.email, name: user.name},
        JWT_SECRET!,
        { expiresIn: '24h' }
        
    )

    return { user: { id: user.id, name: user.name, email: user.email }, token }

}


export default { register, login }