
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Share2, Users, CheckCircle } from "lucide-react";
import { mockEvents } from "@/data/mockData";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundEvent = mockEvents.find((e) => e.id === Number(id));
      setEvent(foundEvent);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button className="bg-eventPrimary hover:bg-eventSecondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div 
        className="w-full h-64 md:h-80 lg:h-96 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${event.image})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags.map((tag: string, index: number) => (
                <Badge key={index} className="bg-eventPrimary border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <ul className="space-y-2">
                    {event.learningPoints?.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-eventPrimary mr-3 mt-0.5" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                  <div className="space-y-6">
                    {event.schedule?.map((item: any, index: number) => (
                      <div key={index} className="relative pl-8 pb-8 border-l-2 border-eventPrimary/30 last:border-0">
                        <div className="absolute top-0 left-[-9px] bg-eventPrimary rounded-full w-4 h-4 border-4 border-white"></div>
                        <div className="mb-1 text-sm text-gray-500">{item.time}</div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="text-gray-700 mt-1">{item.description}</p>
                        {item.speaker && (
                          <div className="mt-2 flex items-center">
                            <img 
                              src={item.speaker.image} 
                              alt={item.speaker.name} 
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                            <span className="text-sm font-medium">{item.speaker.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="speakers" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-6">Event Speakers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {event.speakers?.map((speaker: any) => (
                      <div key={speaker.id} className="flex space-x-4">
                        <img 
                          src={speaker.image} 
                          alt={speaker.name} 
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{speaker.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{speaker.title}</p>
                          <p className="text-sm text-gray-700">{speaker.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-1">
            <div className="glass-card p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Register for This Event</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Standard Ticket</span>
                  <span className="font-semibold">{event.price ? `$${event.price}` : 'Free'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    <Users className="inline h-4 w-4 mr-1" /> Attendees
                  </span>
                  <span className="font-semibold">{event.attendees || '0'} registered</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Spots</span>
                  <span className="font-semibold">{event.availableSpots || 'Unlimited'}</span>
                </div>
              </div>
              
              <Button className="w-full bg-eventPrimary hover:bg-eventSecondary mb-3">
                Register Now
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
