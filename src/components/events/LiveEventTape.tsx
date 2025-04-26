
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { Clock } from "lucide-react";

const LiveEventTape = () => {
  const { events } = useEvents();
  const liveEvent = events.find(event => event.id === 99999);
  const isLiveEventSoon = liveEvent && new Date(liveEvent.date + " " + liveEvent.time) > new Date();

  if (!liveEvent || !isLiveEventSoon) return null;

  return (
    <div className="container mx-auto mt-6 mb-6">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -top-1 -left-1">
                <Badge variant="destructive" className="animate-pulse flex gap-1 items-center">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                  LIVE NOW
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
                <Clock className="h-3 w-3" /> Live now - Join the event!
              </p>
            </div>
          </div>
          <Link to={`/live/${liveEvent.id}`}>
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-medium">
              Join Live Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveEventTape;
