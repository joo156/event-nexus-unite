
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Calendar as CalendarIcon, Lock } from "lucide-react";

const PaymentPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { getEventById, registerForEvent } = useEvents();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) return;
      
      setLoading(true);
      try {
        const foundEvent = getEventById(Number(eventId));
        
        if (!foundEvent) {
          toast({
            title: "Event not found",
            description: "The event you're trying to pay for doesn't exist.",
            variant: "destructive"
          });
          navigate("/events");
          return;
        }
        
        if (!foundEvent.isPaid && !foundEvent.price) {
          toast({
            title: "Free event",
            description: "This is a free event. No payment required.",
          });
          navigate(`/events/${eventId}`);
          return;
        }
        
        setEvent(foundEvent);
      } catch (error) {
        console.error("Error loading event:", error);
        toast({
          title: "Error",
          description: "Failed to load event details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvent();
  }, [eventId, getEventById, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "") // Remove existing spaces
        .replace(/\D/g, "") // Remove non-digits
        .slice(0, 16) // Limit to 16 digits
        .replace(/(\d{4})/g, "$1 ").trim(); // Add space after every 4 digits
      
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === "expiryDate") {
      const formatted = value
        .replace(/\D/g, "") // Remove non-digits
        .slice(0, 4) // Limit to 4 digits
        .replace(/(\d{2})(\d{0,2})/, "$1/$2").trim(); // Format as MM/YY
      
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format CVV (limit to 3-4 digits)
    if (name === "cvv") {
      const formatted = value
        .replace(/\D/g, "") // Remove non-digits
        .slice(0, 4); // Limit to 4 digits
      
      setPaymentData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event || !user) return;
    
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Register for the event
      await registerForEvent(event.id, user.id);
      
      // Add notification for admin
      addNotification({
        title: "New Paid Registration",
        message: `${user.name} has registered for ${event.title} (Paid)`,
        type: "registration",
        link: `/admin?tab=attendees`
      });
      
      toast({
        title: "Payment successful",
        description: "You have successfully registered for this event.",
      });
      
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eventPrimary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Event Not Found</h2>
          <Button className="btn-primary" onClick={() => navigate("/events")}>
            Browse Events
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Complete Your Registration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Event Details</h3>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-medium text-white">{event.title}</h4>
                <p className="text-gray-400">{event.date} at {event.time}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Event Price</span>
                  <span className="font-semibold text-white">${event.price}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Processing Fee</span>
                  <span className="font-semibold text-white">$0.00</span>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-lg text-white">Total</span>
                  <span className="text-lg font-bold text-white">${event.price}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cardName" className="text-gray-300">Cardholder Name</Label>
                  <div className="relative mt-1">
                    <Input 
                      id="cardName"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="dark-input pl-10"
                      required
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
                  <div className="relative mt-1">
                    <Input 
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4242 4242 4242 4242"
                      className="dark-input pl-10"
                      required
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
                    <div className="relative mt-1">
                      <Input 
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="dark-input pl-10"
                        required
                      />
                      <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                    <div className="relative mt-1">
                      <Input 
                        id="cvv"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="dark-input pl-10"
                        required
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-eventPrimary hover:bg-eventSecondary btn-animated"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <span className="animate-spin mr-2">◇</span>
                        Processing...
                      </>
                    ) : (
                      `Pay $${event.price}`
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center mt-3">
                    <Lock className="inline-block h-3 w-3 mr-1" />
                    Your payment information is secure. This is a demo payment page - no real charges will be made.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
