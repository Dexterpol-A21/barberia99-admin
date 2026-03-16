import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Advertencia: Faltan las llaves de Supabase en el archivo .env");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    flowType: 'pkce', // Sugerido en apps web modernas
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
