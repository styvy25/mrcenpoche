
import { Appointment } from "@/components/quiz/types";
import { addDays, addHours, setHours, format } from "date-fns";

// Create base date for appointments
const today = new Date();
const tomorrow = addDays(today, 1);
const nextWeek = addDays(today, 7);

// Helper function to format date to string
const formatDateToString = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

// Helper function to add default startTime and endTime to appointments
const createAppointment = (appointment: Partial<Appointment>): Appointment => {
  const startDate = appointment.date ? new Date(appointment.date) : new Date();
  const durationMinutes = appointment.duration || 60;
  const endDate = addHours(startDate, durationMinutes / 60);
  
  return {
    id: appointment.id || `app-${Date.now()}`,
    title: appointment.title || "",
    description: appointment.description || "",
    date: typeof appointment.date === 'string' ? appointment.date : formatDateToString(startDate),
    startTime: appointment.startTime || format(startDate, "HH:mm"),
    endTime: appointment.endTime || format(endDate, "HH:mm"),
    location: appointment.location || "",
    status: appointment.status || "pending",
    isVirtual: appointment.isVirtual,
    link: appointment.link,
    duration: appointment.duration,
    participantsCount: appointment.participantsCount,
    maxParticipants: appointment.maxParticipants,
    type: appointment.type,
    participant: appointment.participant
  } as Appointment;
};

// Upcoming appointments data with the fixed type structure
export const UPCOMING_APPOINTMENTS: Appointment[] = [
  createAppointment({
    id: "event-1",
    title: "Webinaire: Stratégies d'organisation locale",
    description: "Apprenez à structurer et mobiliser efficacement les comités locaux",
    type: "training",
    date: formatDateToString(setHours(tomorrow, 14)),
    duration: 90,
    status: "pending",
    participantsCount: 12,
    maxParticipants: 25,
    isVirtual: true,
    link: "https://zoom.us/j/example"
  }),
  createAppointment({
    id: "event-2",
    title: "Atelier: Techniques de communication",
    description: "Formation pratique sur la communication politique efficace",
    type: "workshop",
    date: formatDateToString(setHours(addDays(today, 3), 10)),
    duration: 180,
    status: "pending",
    participantsCount: 8,
    maxParticipants: 15,
    isVirtual: false,
    location: "Siège du MRC, Yaoundé"
  }),
  createAppointment({
    id: "event-3",
    title: "Formation: Maîtrise des réseaux sociaux",
    description: "Comment utiliser efficacement les réseaux sociaux pour la mobilisation",
    type: "training",
    date: formatDateToString(setHours(nextWeek, 16)),
    duration: 120,
    status: "pending",
    participantsCount: 18,
    maxParticipants: 30,
    isVirtual: true,
    link: "https://teams.microsoft.com/l/meetup-join/example"
  })
];

// Sample available slots for appointment booking
export const AVAILABLE_SLOTS = [
  { date: addDays(today, 1), timeSlots: ["09:00", "11:00", "14:00", "16:00"] },
  { date: addDays(today, 2), timeSlots: ["10:00", "13:00", "15:30"] },
  { date: addDays(today, 3), timeSlots: ["09:30", "14:00", "17:00"] },
  { date: addDays(today, 4), timeSlots: ["11:00", "16:00"] },
  { date: addDays(today, 7), timeSlots: ["09:00", "10:30", "14:00", "16:30"] },
  { date: addDays(today, 8), timeSlots: ["11:00", "13:30", "15:00"] }
];
