import { createClient } from "@supabase/supabase-js";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(process.env.SUPABASE_URL, supabaseKey);
export default supabase;
