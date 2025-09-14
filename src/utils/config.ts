import dotenv from "dotenv"
dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const JWT_SECRET = process.env.JWT_SECRET

export default {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  JWT_SECRET
}