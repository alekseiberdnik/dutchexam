import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://wqgbbjdrgzwedbadjgvs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZ2JiamRyZ3p3ZWRiYWRqZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMDI1ODQsImV4cCI6MjA3MjY3ODU4NH0.NV5kcu-eh8IWrLbM56UEtuKs52H6OhDsbA1aU5OP5PU';

// NOTE: anon key is public by design. If you rotate the key in Supabase,
// update it here as well.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
