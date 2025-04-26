
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/context/EventContext";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EventsPage = () => {
  const { events } = useEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState(events.filter(e => e.visible !== false));
  const eventsPerPage = 9;
  
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

    if (filters.isPaid === true) {
      filtered = filtered.filter(event => event.isPaid);
    } else if (filters.isPaid === false) {
      filtered = filtered.filter(event => !event.isPaid);
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Find the live demo event if exists
  const liveEvent = events.find(event => event.id === 99999);
  const isLiveEventSoon = liveEvent && new Date(liveEvent.date + " " + liveEvent.time) > new Date();

  return (
    <Layout>
      <HeroSection
        title="Browse All Events"
        subtitle="Discover and register for upcoming virtual and hybrid events"
        bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <EventFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Live Event Banner (if available) */}
          {liveEvent && isLiveEventSoon && (
            <div className="mb-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-4 shadow-lg">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute -top-1 -left-1">
                      <Badge variant="destructive" className="animate-pulse flex gap-1 items-center">
                        <span className="h-2 w-2 rounded-full bg-white"></span>
                        LIVE
                      </Badge>
                    </div>
                    <img 
                      src={liveEvent.image} 
                      alt={liveEvent.title} 
                      className="h-16 w-16 rounded object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">{liveEvent.title}</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Starting soon
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-white text-red-600 hover:bg-gray-100"
                  onClick={() => window.location.href = `/live/${liveEvent.id}`}
                >
                  Join Now
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
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

          {/* Pagination */}
          {filteredEvents.length > eventsPerPage && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4"
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    onClick={() => paginate(number)}
                    className={`px-4 ${
                      currentPage === number ? "bg-eventPrimary" : ""
                    }`}
                  >
                    {number}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;
