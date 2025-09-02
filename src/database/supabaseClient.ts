import config from "../utils/config.ts";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = config.supabaseUrl
const supabaseKey = config.supabaseKey;
if (!supabaseKey) {
    throw new Error("Missing Supabase key in environment variables");
}
if (!supabaseUrl) {
    throw new Error("Missing Supabase URL in environment variables");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;