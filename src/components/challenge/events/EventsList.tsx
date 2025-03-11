
import React from "react";
import EventCard from "./EventCard";
import { Appointment } from "@/components/quiz/types";

interface EventsListProps {
  events: Appointment[];
  onEventAction: (event: Appointment) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, onEventAction }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">Aucun événement à venir</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onEventAction={onEventAction} 
        />
      ))}
    </div>
  );
};

export default EventsList;
