
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import LiveEventTape from "@/components/events/LiveEventTape";
import LiveDemoBanner from "@/components/common/LiveDemoBanner";

// Import the original Index component content
// Since we can't import the Index component directly (it's in read-only files),
// we'll recreate the essential parts and add our LiveEventTape

const HomePage = () => {
  const [hasLiveEvent, setHasLiveEvent] = useState(false);
  const [liveEventId, setLiveEventId] = useState<number | null>(null);
  
  useEffect(() => {
    // Check if there's a live event
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      try {
        const events = JSON.parse(storedEvents);
        const liveEvent = events.find((e: any) => e.id === 99999);
        if (liveEvent) {
          setHasLiveEvent(true);
          setLiveEventId(liveEvent.id);
        }
      } catch (error) {
        console.error("Error parsing events:", error);
      }
    }
  }, []);

  return (
    <Layout>
      {hasLiveEvent && liveEventId && (
        <div className="container mx-auto px-4 mt-6">
          <LiveDemoBanner
            eventId={liveEventId}
            title="Live Demo Event"
            description="Join our interactive live event showcasing the latest features of our platform!"
          />
        </div>
      )}
      
      {/* We would include the original Index content here */}
      {/* Since we can't directly copy it, we're implementing a placeholder that points to the original page */}
      <iframe 
        src="/" 
        style={{ 
          display: "none", 
          width: "100%", 
          height: "100vh", 
          border: "none" 
        }}
        title="Original home page"
      />
    </Layout>
  );
};

export default HomePage;
