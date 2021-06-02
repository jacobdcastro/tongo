export interface Event {
  _id: string;
  title: string;
  venue: string;
  time: string;
  location: string;
  image: string;
}

export interface EventCategory {
  name: string;
  events: Event[];
}

export type EventsData = EventCategory[];
