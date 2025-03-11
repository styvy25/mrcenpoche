
import { Appointment } from "@/components/quiz/types";
import { addDays, addHours, setHours, format } from "date-fns";

// Create base date for appointments
const today = new Date();
const tomorrow = addDays(today, 1);
const nextWeek = addDays(today, 7);

// Helper function to add default startTime and endTime to appointments
const createAppointment = (appointment: Partial<Appointment>): Appointment => {
  const startDate = appointment.date instanceof Date ? appointment.date : new Date();
  const endDate = appointment.duration ? addHours(startDate, appointment.duration / 60) : addHours(startDate, 1);
  
  return {
    id: appointment.id || `appt-${Date.now()}`,
    title: appointment.title || '',
    description: appointment.description || '',
    date: appointment.date instanceof Date ? format(appointment.date, 'yyyy-MM-dd') : (appointment.date || ''),
    startTime: appointment.startTime || format(startDate, 'HH:mm'),
    endTime: appointment.endTime || format(endDate, 'HH:mm'),
    location: appointment.location || '',
    status: appointment.status || 'pending',
    isVirtual: appointment.isVirtual,
    link: appointment.link,
    participantsCount: appointment.participantsCount,
    maxParticipants: appointment.maxParticipants,
    duration: appointment.duration,
    type: appointment.type
  };
};

// Upcoming appointments data with the fixed type structure
export const UPCOMING_APPOINTMENTS: Appointment[] = [
  createAppointment({
    id: "event-1",
    title: "Webinaire: Stratégies d'organisation locale",
    description: "Apprenez à structurer et mobiliser efficacement les comités locaux",
    type: "training",
    date: setHours(tomorrow, 14),
    duration: 90,
    status: "pending",
    participantsCount: 12,
    maxParticipants: 25,
    isVirtual: true,
    link: "https://zoom.us/j/example",
    location: "En ligne"
  }),
  createAppointment({
    id: "event-2",
    title: "Atelier: Techniques de communication",
    description: "Formation pratique sur la communication politique efficace",
    type: "workshop",
    date: setHours(addDays(today, 3), 10),
    duration: 180,
    status: "confirmed",
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
    date: setHours(nextWeek, 16),
    duration: 120,
    status: "pending",
    participantsCount: 18,
    maxParticipants: 30,
    isVirtual: true,
    link: "https://teams.microsoft.com/l/meetup-join/example",
    location: "En ligne"
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
