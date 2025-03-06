
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dycdnqoixwlcxonzrmql.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5Y2RucW9peHdsY3hvbnpybXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTQwMTAsImV4cCI6MjA1NjczMDAxMH0.6z8wFU9rMONxhLONqFseef5mqkSHNST7psGP3U9kF1M';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
