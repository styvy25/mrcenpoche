import { supabase } from "./supabaseClient";

// Fix the Date to string conversion issue
export const formatDateForSupabase = (date: Date): string => {
  return date.toISOString();
};

// Update any function that was using Date directly to use formatDateForSupabase
export const createAppointment = async (appointmentData: any) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          ...appointmentData,
          date: formatDateForSupabase(appointmentData.date), // Convert Date to string
          created_at: formatDateForSupabase(new Date())
        }
      ]);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to create appointment" };
  }
};
