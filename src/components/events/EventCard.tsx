
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  location: string;
  tags: string[];
  featured?: boolean;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  image,
  location,
  tags,
  featured = false,
}: EventCardProps) => {
  return (
    <div className={`glass-card overflow-hidden card-hover ${featured ? 'border-eventPrimary border-2' : ''}`}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-eventPrimary text-white">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-eventLight/30 text-eventDark border-eventLight">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-semibold line-clamp-2 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-eventSecondary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-eventSecondary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-eventSecondary" />
            <span>{location}</span>
          </div>
        </div>
        <Link to={`/events/${id}`}>
          <Button className="w-full bg-eventPrimary hover:bg-eventSecondary">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
