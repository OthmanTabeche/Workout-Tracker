import dotenv from "dotenv"
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export default {
  supabaseUrl,
  supabaseKey,
}