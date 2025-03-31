
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  points: number;
  deadline: Date;
  isCompleted: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  isVirtual: boolean;
  link?: string;
  organizer: string;
  capacity: number;
  registered: number;
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'canceled';
  type: 'meeting' | 'training' | 'consultation';
  participant: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface Session {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  facilitator: string;
  availableSpots: number;
  status: 'open' | 'full' | 'canceled';
}
