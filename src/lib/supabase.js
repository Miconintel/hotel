import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fkjczmihhtvxnokwoajv.supabase.co";

// const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZramN6bWloaHR2eG5va3dvYWp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDM2Mjk4MiwiZXhwIjoyMDQ5OTM4OTgyfQ.FASHe_W71VQyQPuU08jODuWV0oNbsqmYMObvZkeSClk";
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// console.log("supabaseUrl: ", supabaseUrl);
// console.log(supabaseKey);
//
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
