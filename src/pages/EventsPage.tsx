
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const eventsPerPage = 9;
  
  const handleFilterChange = (filters: any) => {
    let filtered = [...mockEvents];

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
    setCurrentPage(1);
  };

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <HeroSection
        title="Browse All Events"
        subtitle="Discover and register for upcoming virtual and hybrid events"
        bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-padding">
        <div className="container mx-auto">
          <EventFilters onFilterChange={handleFilterChange} />

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
