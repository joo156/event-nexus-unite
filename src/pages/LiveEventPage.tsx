
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/context/NotificationContext";
import { Play, Send, Star, MessageSquare } from "lucide-react";

type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
};

const LiveEventPage = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const { events } = useEvents();
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!eventId) return;
    
    const parsedId = parseInt(eventId);
    const foundEvent = events.find(e => e.id === parsedId);
    
    if (!foundEvent) {
      toast({
        title: "Event not found",
        description: "The requested event could not be found.",
        variant: "destructive",
      });
      navigate("/events");
      return;
    }
    
    setEvent(foundEvent);
    
    // Load comments from localStorage if available
    const storedComments = localStorage.getItem(`event_${eventId}_comments`);
    if (storedComments) {
      try {
        setComments(JSON.parse(storedComments));
      } catch (error) {
        console.error("Error parsing stored comments:", error);
      }
    }
    
    setIsLoading(false);
    
    // Add some demo comments if none exist
    setTimeout(() => {
      if (!storedComments) {
        const demoComments = [
          {
            id: "c1",
            userId: "admin1",
            userName: "Event Host",
            text: "Welcome everyone to this live event! Feel free to ask questions in the chat.",
            timestamp: new Date().toISOString()
          },
          {
            id: "c2",
            userId: "user1",
            userName: "Alex Chen",
            text: "The presentation looks great! Looking forward to the Q&A session.",
            timestamp: new Date(Date.now() - 120000).toISOString()
          }
        ];
        setComments(demoComments);
        localStorage.setItem(`event_${eventId}_comments`, JSON.stringify(demoComments));
      }
      
      // Notify about live event
      addNotification({
        title: "Event is Live Now",
        message: `The event "${foundEvent.title}" has started! Join now.`,
        type: "update",
        link: `/live/${eventId}`
      });
    }, 3000);
  }, [eventId, events, navigate, toast, addNotification]);

  // Scroll to bottom of comments when new ones arrive
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [comments]);

  // Add automated comments periodically for demo purposes
  useEffect(() => {
    if (!isLive) return;
    
    const demoCommentIntervals = [
      setTimeout(() => {
        if (isLive) addDemoComment("Event Host", "If you have any questions about the topic, please feel free to ask!");
      }, 15000),
      setTimeout(() => {
        if (isLive) addDemoComment("Sarah Johnson", "This is amazing! Thank you for the insights.");
      }, 30000),
      setTimeout(() => {
        if (isLive) addDemoComment("David Wong", "How do you suggest implementing these strategies for small businesses?");
      }, 45000),
      setTimeout(() => {
        if (isLive) addDemoComment("Event Host", "Great question David! Let me address that in a moment.");
      }, 55000),
    ];
    
    return () => {
      demoCommentIntervals.forEach(clearTimeout);
    };
  }, [isLive]);

  const addDemoComment = (userName: string, text: string) => {
    const newDemoComment: Comment = {
      id: `c${Date.now()}`,
      userId: userName.toLowerCase().replace(/\s/g, ""),
      userName,
      text,
      timestamp: new Date().toISOString()
    };
    
    setComments(prev => {
      const updated = [...prev, newDemoComment];
      localStorage.setItem(`event_${eventId}_comments`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to comment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: user.id,
      userName: user.name || user.email.split('@')[0],
      text: newComment,
      timestamp: new Date().toISOString()
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`event_${eventId}_comments`, JSON.stringify(updatedComments));
    setNewComment("");
    
    // Simulate a reply after a delay
    if (Math.random() > 0.5) {
      setTimeout(() => {
        addDemoComment("Event Host", `Thanks for your comment, ${comment.userName}!`);
        
        // Send notification to the user
        addNotification({
          title: "New Reply",
          message: `The host replied to your comment in "${event?.title}"`,
          type: "update",
          link: `/live/${eventId}`
        });
      }, 5000 + Math.random() * 5000);
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    
    toast({
      title: "Rating submitted",
      description: `You rated this event ${rating} stars. Thank you for your feedback!`,
    });
    
    localStorage.setItem(`event_${eventId}_rating`, rating.toString());
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-white/10 rounded mb-4"></div>
            <div className="h-32 bg-white/10 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{event?.title}</h1>
          <p className="text-gray-400">{event?.description}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center z-10">
                <div className="flex items-center bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                  LIVE
                </div>
              </div>
              
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Live Event Stream"
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              <div className="bg-secondary/90 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Play className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-white font-medium">Live Now</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date().toLocaleDateString()} | {event?.time}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-300 text-sm mb-4">{event?.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Rate this event:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= (hoverRating || userRating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-500"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="bg-secondary/50 text-white border-white/10 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MessageSquare className="h-5 w-5 mr-2" /> Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div 
                  ref={commentsContainerRef} 
                  className="flex-grow bg-black/20 rounded-md p-4 mb-4 overflow-y-auto max-h-[400px]"
                >
                  {comments.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">
                      No comments yet. Be the first to comment!
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="mb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-eventPrimary/20 flex items-center justify-center">
                              <span className="text-eventPrimary font-medium">
                                {comment.userName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3 bg-white/5 rounded-lg p-3 w-full">
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium text-sm ${
                                comment.userName === "Event Host" ? "text-eventPrimary" : "text-white"
                              }`}>
                                {comment.userName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm break-words">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <form onSubmit={handleSubmitComment} className="flex">
                  <Input
                    type="text"
                    placeholder={user ? "Type your message..." : "Sign in to comment"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={!user}
                    className="dark-input flex-grow"
                  />
                  <Button 
                    type="submit" 
                    disabled={!user || !newComment.trim()} 
                    className="ml-2 bg-eventPrimary hover:bg-eventSecondary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveEventPage;
