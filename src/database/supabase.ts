import { createClient } from '@supabase/supabase-js'
import config from '../utils/config.ts'

const supabaseUrl = config.SUPABASE_URL
const supabaseKey = config.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration')
}

const supabase = createClient(supabaseUrl, supabaseKey)
console.log('SUPABASE CONNECTED')

export default supabase