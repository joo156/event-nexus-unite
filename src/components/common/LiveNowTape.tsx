
import { Link } from "react-router-dom";

interface Props {
  eventId: number;
  message?: string;
}

export default function LiveNowTape({ eventId, message }: Props) {
  return (
    <div className="w-full bg-gradient-to-r from-red-500 via-yellow-200 to-red-400 rounded-full px-4 py-2 text-center shadow-lg mb-6 animate-pulse">
      <Link to={`/live/${eventId}`}>
        <span className="font-semibold text-lg text-red-900">
          {message || "Live Now! Tap to join the live event"}
        </span>
      </Link>
    </div>
  );
}
