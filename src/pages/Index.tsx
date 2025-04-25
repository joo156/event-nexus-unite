import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEvents } from "@/context/EventContext";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import LiveDemoBanner from "@/components/common/LiveDemoBanner";
import LiveNowTape from "@/components/common/LiveNowTape";

const Index = () => {
  const { events } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState(events.filter(e => e.visible !== false));
  const speakerSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setFilteredEvents(events.filter(e => e.visible !== false));
  }, [events]);

  const handleFilterChange = (filters: any) => {
    let filtered = [...events].filter(e => e.visible !== false);

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      filtered = filtered.filter((event) =>
        event.tags.includes(filters.category)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(
        (event) => event.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    setFilteredEvents(filtered);
  };

  const handleLearnMoreClick = () => {
    if (speakerSectionRef.current) {
      speakerSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const liveEvent = events.find(event => event.id === 99999);
  const isLiveEventOngoing =
    liveEvent &&
    (() => {
      const now = new Date();
      const eventDate = new Date(liveEvent.date + " " + liveEvent.time);
      return eventDate < now && now < new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
    })();

  const featuredEvents = filteredEvents.filter(event => event.featured || event.id === 99999).slice(0, 6);
  const recentEvents = filteredEvents.slice(0, 3);
  
  const speakers = events
    .flatMap(event => event.speakers || [])
    .filter((speaker, index, self) => 
      index === self.findIndex(s => s.id === speaker.id)
    )
    .slice(0, 4);

  return (
    <Layout>
      <HeroSection
        title="Discover Amazing Virtual Events"
        subtitle="Join thousands of attendees on the leading platform for virtual and hybrid events"
        bgImage="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
      />

      {liveEvent && isLiveEventOngoing && (
        <LiveNowTape
          eventId={liveEvent.id}
          message="A Live Event is happening now! Join instantly ➤"
        />
      )}

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              <span className="text-gradient">Featured Events</span>
            </h2>
            <Link to="/events">
              <Button variant="link" className="text-eventPrimary flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <EventFilters onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  image={event.image}
                  location={event.location}
                  tags={event.tags}
                  featured={event.featured}
                  isLive={event.id === 99999}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No events found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient">Why Choose eventNexus</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eventPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Events</h3>
              <p className="text-gray-600">Access a wide range of virtual and hybrid events from around the world.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eventPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
              <p className="text-gray-600">Enjoy a hassle-free registration and attendance process for all events.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eventPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Speakers</h3>
              <p className="text-gray-600">Learn from industry leaders and subject matter experts across various fields.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eventPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Rest assured with our secure and reliable event management platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" ref={speakerSectionRef}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient">Featured Speakers</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover-lift">
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{speaker.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{speaker.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events">
              <Button className="bg-eventPrimary hover:bg-eventSecondary px-8">View All Speakers</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-eventPrimary section-padding">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Host Your Own Event?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10">
            Become an event organizer on eventNexus and reach thousands of attendees worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/become-speaker">
              <Button size="lg" className="bg-white text-eventPrimary hover:bg-gray-100">
                Become a Speaker
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
