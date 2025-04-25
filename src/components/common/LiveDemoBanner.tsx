
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";
interface Props {
  eventId: number;
  title: string;
  description: string;
}
export default function LiveDemoBanner({ eventId, title, description }: Props) {
  return (
    <div className="w-full bg-gradient-to-r from-[#1A1F2C] via-[#9b87f5] to-[#1EAEDB] rounded-xl p-[2px] animate-pulse mb-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full bg-black/80 rounded-xl p-6 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center">
            <CircleDot className="animate-pulse text-red-500 h-7 w-7 mr-2" />
            <span className="text-white font-bold text-xl lg:text-2xl drop-shadow">🎥 A Live Demo Event Is Happening Now!</span>
          </span>
        </div>
        <div className="flex-1 mt-2 sm:mt-0 text-white text-sm sm:text-base sm:ml-6">{description}</div>
        <Link to={`/live/${eventId}`}>
          <Button className="btn-primary-live flex items-center gap-2 ml-4 px-6 py-3 rounded-2xl shadow-lg text-lg font-bold">
            <CircleDot className="text-white animate-pulse" /> Join Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
