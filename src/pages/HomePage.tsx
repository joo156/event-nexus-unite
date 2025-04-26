
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import LiveEventTape from "@/components/events/LiveEventTape";
import LiveDemoBanner from "@/components/common/LiveDemoBanner";

const HomePage = () => {
  const [hasLiveEvent, setHasLiveEvent] = useState(false);
  const [liveEventId, setLiveEventId] = useState<number | null>(null);
  
  useEffect(() => {
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
          <LiveEventTape
            eventId={liveEventId}
            message="Live Event Happening Now! Click to join"
          />
          <LiveDemoBanner
            eventId={liveEventId}
            title="Live Demo Event"
            description="Join our interactive live event showcasing the latest features of our platform!"
          />
        </div>
      )}
      
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
