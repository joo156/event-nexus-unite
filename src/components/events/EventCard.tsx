
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  tags: string[];
  featured?: boolean;
  isPaid?: boolean;
  price?: number;
  isLive?: boolean;
  isCompact?: boolean;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  image,
  tags,
  featured = false,
  isPaid = false,
  price,
  isLive = false,
  isCompact = false,
}: EventCardProps) => {
  const renderTags = () => {
    return tags.slice(0, 3).map((tag) => (
      <Badge
        key={tag}
        className="bg-eventPrimary/10 text-eventPrimary hover:bg-eventPrimary/20"
      >
        {tag}
      </Badge>
    ));
  };

  const isOnline = location.toLowerCase() === "online";

  return (
    <Link
      to={isLive ? `/live/${id}` : `/events/${id}`}
      className={cn(
        "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
        featured && "ring-2 ring-eventPrimary/50"
      )}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full object-cover ${isCompact ? "h-40" : "h-52"}`}
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-eventPrimary">Featured</Badge>
        )}
        {isLive && (
          <Badge className="absolute top-2 right-2 bg-red-600 animate-pulse flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            LIVE
          </Badge>
        )}
        {isPaid && (
          <Badge className="absolute top-2 left-2 bg-gray-800">{price ? `$${price}` : 'Paid'}</Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-3">{renderTags()}</div>

        <div className="text-sm text-gray-500 flex flex-col gap-1.5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-eventPrimary" />
            <span>{date} • {time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-eventPrimary" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
