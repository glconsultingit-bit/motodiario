
import { createClient } from '@supabase/supabase-js'
// Metti qui le tue chiavi Supabase (gratis)
// Puoi lasciarle vuote e l'app funziona offline con localStorage
const url = import.meta.env.VITE_SUPABASE_URL || ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
export const supabase = url && key ? createClient(url, key) : null
