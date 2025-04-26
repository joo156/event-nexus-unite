
import { Link } from "react-router-dom";
import { CircleDot } from "lucide-react";

interface LiveEventTapeProps {
  eventId: number;
  message?: string;
}

const LiveEventTape = ({ eventId, message = "Live Event Happening Now! Click to join" }: LiveEventTapeProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-eventPrimary rounded-lg p-3 mb-8 animate-pulse">
      <Link to={`/live/${eventId}`} className="flex items-center justify-center">
        <CircleDot className="text-white animate-pulse mr-2" />
        <span className="text-white font-bold text-lg">{message}</span>
      </Link>
    </div>
  );
};

export default LiveEventTape;
