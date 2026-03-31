import { createClient } from '@supabase/supabase-js';

function readViteEnv(name) {
  const raw = import.meta.env[name];
  if (raw == null) return '';
  let s = String(raw).trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

const supabaseUrl = readViteEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = readViteEnv('VITE_SUPABASE_ANON_KEY');

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('[Supabase] createClient failed — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env', e);
  }
}

export { supabase };
export const isSupabaseConfigured = () => !!supabase;
