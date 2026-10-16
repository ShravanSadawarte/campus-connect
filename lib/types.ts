export type EventCategory =
  | "Tech"
  | "Music"
  | "Sports"
  | "Arts"
  | "Career"
  | "Food"
  | "Social"
  | "Workshop";

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // e.g. "Sat, Oct 19"
  fullDate: string; // e.g. "Saturday, October 19, 2026"
  time: string; // e.g. "10:00 AM – 12:00 PM"
  venue: string;
  organizer: string;
  organizerRole: string;
  description: string;
  agenda: string[];
  image: string;
  attendees: number;
  capacity: number;
  featured?: boolean;
  price: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  members: number;
  meeting: string;
  location: string;
  image: string;
  color: string;
  president: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  kind: "event" | "club" | "reminder" | "system";
}

export interface Student {
  name: string;
  id: string;
  major: string;
  year: string;
  email: string;
  avatar: string;
  bio: string;
  joinedDate: string;
}
