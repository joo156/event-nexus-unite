
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { mockEvents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Speaker = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
};

type Schedule = {
  time: string;
  title: string;
  description: string;
  speaker?: {
    name: string;
    image: string;
  };
};

type TicketPackage = {
  id: string;
  name: string;
  price: number;
  benefits: string[];
};

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  tags: string[];
  price?: number;
  isPaid: boolean;
  attendees?: number;
  availableSpots?: number;
  featured?: boolean;
  visible: boolean;
  learningPoints?: string[];
  schedule?: Schedule[];
  speakers?: Speaker[];
  ticketPackages?: TicketPackage[];
};

type SpeakerProposal = {
  id: string;
  name: string;
  email: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  bio: string;
  createdAt: string;
  isRead: boolean;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => Promise<Event>;
  updateEvent: (id: number, event: Partial<Omit<Event, "id">>) => Promise<Event | null>;
  deleteEvent: (id: number) => Promise<boolean>;
  getEventById: (id: number) => Event | undefined;
  registerForEvent: (eventId: number, userId: string) => Promise<boolean>;
  getUserRegisteredEvents: (userId: string) => Promise<Event[]>;
  speakerProposals: SpeakerProposal[];
  addSpeakerProposal: (proposal: Omit<SpeakerProposal, "id" | "createdAt" | "isRead">) => Promise<SpeakerProposal>;
  markProposalAsRead: (id: string) => Promise<boolean>;
  toggleEventVisibility: (id: number) => Promise<Event | null>;
};

const EventContext = createContext<EventContextType | null>(null);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents must be used within an EventProvider");
  return context;
};

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [speakerProposals, setSpeakerProposals] = useState<SpeakerProposal[]>([]);
  const [registrations, setRegistrations] = useState<{eventId: number, userId: string}[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load events from mock data or localStorage if available
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        // Ensure proper typing with the updated Event type that includes visible property
        const typedEvents: Event[] = parsedEvents.map((event: any) => ({
          ...event,
          isPaid: !!event.price && event.price > 0,
          visible: event.visible !== false // Default to visible if not specified
        }));
        setEvents(typedEvents);
      } catch (error) {
        console.error("Error parsing stored events:", error);
        // Ensure mockEvents has the required fields before setting to state
        const processedMockEvents: Event[] = mockEvents.map((event: any) => ({
          ...event,
          isPaid: !!event.price && event.price > 0,
          visible: event.visible !== false, // Default to visible if not specified
          // Convert any numeric speaker IDs to strings to match our type
          speakers: event.speakers?.map((speaker: any) => ({
            ...speaker,
            id: String(speaker.id)
          }))
        }));
        setEvents(processedMockEvents);
        localStorage.setItem("events", JSON.stringify(processedMockEvents));
      }
    } else {
      // Ensure mockEvents has the required fields before setting to state
      const processedMockEvents: Event[] = mockEvents.map((event: any) => ({
        ...event,
        isPaid: !!event.price && event.price > 0,
        visible: true,
        // Convert any numeric speaker IDs to strings to match our type
        speakers: event.speakers?.map((speaker: any) => ({
          ...speaker,
          id: String(speaker.id)
        }))
      }));
      setEvents(processedMockEvents);
      localStorage.setItem("events", JSON.stringify(processedMockEvents));
    }
    
    // Load speaker proposals if available
    const storedProposals = localStorage.getItem("speakerProposals");
    if (storedProposals) {
      try {
        setSpeakerProposals(JSON.parse(storedProposals));
      } catch (error) {
        console.error("Error parsing stored speaker proposals:", error);
      }
    }
    
    // Load registrations if available
    const storedRegistrations = localStorage.getItem("eventRegistrations");
    if (storedRegistrations) {
      try {
        setRegistrations(JSON.parse(storedRegistrations));
      } catch (error) {
        console.error("Error parsing stored registrations:", error);
      }
    }
  }, []);

  const saveEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const saveSpeakerProposals = (proposals: SpeakerProposal[]) => {
    setSpeakerProposals(proposals);
    localStorage.setItem("speakerProposals", JSON.stringify(proposals));
  };

  const saveRegistrations = (updatedRegistrations: {eventId: number, userId: string}[]) => {
    setRegistrations(updatedRegistrations);
    localStorage.setItem("eventRegistrations", JSON.stringify(updatedRegistrations));
  };

  const addEvent = async (event: Omit<Event, "id">): Promise<Event> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEvent: Event = {
          ...event,
          id: Date.now(),
          attendees: 0,
          visible: true
        };
        
        const updatedEvents = [...events, newEvent];
        saveEvents(updatedEvents);
        
        toast({
          title: "Event created",
          description: "The event has been successfully created.",
        });
        
        resolve(newEvent);
      }, 500);
    });
  };

  const updateEvent = async (id: number, eventData: Partial<Omit<Event, "id">>): Promise<Event | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const eventIndex = events.findIndex(e => e.id === id);
        if (eventIndex === -1) {
          toast({
            title: "Update failed",
            description: "Event not found.",
            variant: "destructive",
          });
          resolve(null);
          return;
        }
        
        const updatedEvent: Event = { ...events[eventIndex], ...eventData };
        const updatedEvents = [...events];
        updatedEvents[eventIndex] = updatedEvent;
        
        saveEvents(updatedEvents);
        
        toast({
          title: "Event updated",
          description: "The event has been successfully updated.",
        });
        
        resolve(updatedEvent);
      }, 500);
    });
  };

  const toggleEventVisibility = async (id: number): Promise<Event | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const eventIndex = events.findIndex(e => e.id === id);
        if (eventIndex === -1) {
          toast({
            title: "Update failed",
            description: "Event not found.",
            variant: "destructive",
          });
          resolve(null);
          return;
        }
        
        const currentEvent = events[eventIndex];
        const updatedEvent: Event = { 
          ...currentEvent, 
          visible: !currentEvent.visible 
        };
        
        const updatedEvents = [...events];
        updatedEvents[eventIndex] = updatedEvent;
        
        saveEvents(updatedEvents);
        
        toast({
          title: currentEvent.visible ? "Event hidden" : "Event visible",
          description: currentEvent.visible 
            ? "The event is now hidden from users." 
            : "The event is now visible to users.",
        });
        
        resolve(updatedEvent);
      }, 500);
    });
  };

  const deleteEvent = async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedEvents = events.filter(event => event.id !== id);
        
        if (updatedEvents.length === events.length) {
          toast({
            title: "Delete failed",
            description: "Event not found.",
            variant: "destructive",
          });
          resolve(false);
          return;
        }
        
        saveEvents(updatedEvents);
        
        // Also remove any registrations for this event
        const updatedRegistrations = registrations.filter(reg => reg.eventId !== id);
        saveRegistrations(updatedRegistrations);
        
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted.",
        });
        
        resolve(true);
      }, 500);
    });
  };

  const getEventById = (id: number) => {
    return events.find(event => event.id === id);
  };

  const registerForEvent = async (eventId: number, userId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if already registered
        const alreadyRegistered = registrations.some(
          reg => reg.eventId === eventId && reg.userId === userId
        );
        
        if (alreadyRegistered) {
          toast({
            title: "Already registered",
            description: "You are already registered for this event.",
            variant: "destructive",
          });
          resolve(false);
          return;
        }
        
        // Update registrations
        const updatedRegistrations = [...registrations, { eventId, userId }];
        saveRegistrations(updatedRegistrations);
        
        // Update event attendee count
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
          const updatedEvents = [...events];
          const currentAttendees = updatedEvents[eventIndex].attendees || 0;
          updatedEvents[eventIndex] = {
            ...updatedEvents[eventIndex],
            attendees: currentAttendees + 1
          };
          saveEvents(updatedEvents);
        }
        
        toast({
          title: "Registration successful",
          description: "You have successfully registered for this event.",
        });
        
        resolve(true);
      }, 500);
    });
  };

  const getUserRegisteredEvents = async (userId: string): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userEventIds = registrations
          .filter(reg => reg.userId === userId)
          .map(reg => reg.eventId);
        
        const userEvents = events.filter(event => userEventIds.includes(event.id));
        resolve(userEvents);
      }, 300);
    });
  };

  const addSpeakerProposal = async (proposal: Omit<SpeakerProposal, "id" | "createdAt" | "isRead">): Promise<SpeakerProposal> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProposal: SpeakerProposal = {
          ...proposal,
          id: `proposal-${Date.now()}`,
          createdAt: new Date().toISOString(),
          isRead: false
        };
        
        const updatedProposals = [...speakerProposals, newProposal];
        saveSpeakerProposals(updatedProposals);
        
        toast({
          title: "Proposal submitted",
          description: "Your speaker proposal has been successfully submitted.",
        });
        
        resolve(newProposal);
      }, 500);
    });
  };

  const markProposalAsRead = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proposalIndex = speakerProposals.findIndex(p => p.id === id);
        if (proposalIndex === -1) {
          resolve(false);
          return;
        }
        
        const updatedProposals = [...speakerProposals];
        updatedProposals[proposalIndex] = {
          ...updatedProposals[proposalIndex],
          isRead: true
        };
        
        saveSpeakerProposals(updatedProposals);
        resolve(true);
      }, 300);
    });
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        registerForEvent,
        getUserRegisteredEvents,
        speakerProposals,
        addSpeakerProposal,
        markProposalAsRead,
        toggleEventVisibility
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
