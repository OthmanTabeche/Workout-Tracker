import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.supabaseKey
const PORT = process.env.PORT || 3000

export default { supabaseUrl, supabaseKey, PORT } 