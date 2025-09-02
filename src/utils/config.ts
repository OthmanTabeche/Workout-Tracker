import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.supabaseKey
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET


export default { supabaseUrl, supabaseKey, PORT, JWT_SECRET } 