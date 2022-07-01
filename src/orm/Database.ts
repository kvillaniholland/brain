import { PostgrestClient } from '@supabase/postgrest-js'

const REST_URL = 'http://localhost:3000'
const postgrest = new PostgrestClient(REST_URL)

export default postgrest;
