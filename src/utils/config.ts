import dotenv from "dotenv"
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const JWT_SECRET = process.env.JWT_SECRET

export default {
  supabaseUrl,
  supabaseKey,
  JWT_SECRET
}