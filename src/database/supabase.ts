import { createClient } from '@supabase/supabase-js'
import config from '../utils/config.js'

const { supabaseUrl, supabaseKey } = config

if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Error traying to connect to the SB`) 
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase