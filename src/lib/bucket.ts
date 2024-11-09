import { createClient } from '@supabase/supabase-js';

export const bucket = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_ANON_KEY
).storage.from('bucket');
