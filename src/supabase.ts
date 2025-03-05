import { createClient } from '@supabase/supabase-js';

// These would typically come from environment variables
// For this example, we'll use public variables since this is a demo
// In a production app, these should be in .env files and not committed to git
const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDY2Mjk0Niwic3ViIjoiYW5vbiIsImV4cCI6MTkzNjIzODk0Nn0.superfakekey';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our database tables
export type Participant = {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
};

// Functions to interact with the database
export async function getParticipantsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error getting participants count:', error);
    return 0;
  }
  
  return count || 0;
}

export async function addParticipant(participant: Omit<Participant, 'id' | 'created_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('participants')
    .insert([participant]);
  
  if (error) {
    console.error('Error adding participant:', error);
    return false;
  }
  
  return true;
}