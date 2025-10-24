import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://gxpydymawnoascdapznu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cHlkeW1hd25vYXNjZGFwem51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTkwMTIsImV4cCI6MjA3NDAzNTAxMn0.DQfgDDipMexRCgJkEjUlEcb5MZNvTmbGYYn5BoTju3w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

