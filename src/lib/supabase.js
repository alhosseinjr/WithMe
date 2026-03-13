import { createClient } from '@supabase/supabase-js';

// 👇 Replace these with your own from supabase.com (free account)
const SUPABASE_URL = 'https://zalujityxqbnmzqamitf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbHVqaXR5eHFibm16cWFtaXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzcxMTcsImV4cCI6MjA4OTAxMzExN30.jQdsazIqM7VVSO-4uUtuiuophBa9-SYztRxgEpw1u0Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
