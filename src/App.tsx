
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import { ModalProvider } from "./context/ModalContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import AdminProfile from "./pages/AdminProfile";
import BecomeASpeaker from "./pages/BecomeASpeaker";
import PaymentPage from "./pages/PaymentPage";
import LiveEventPage from "./pages/LiveEventPage";

// Auth components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import { useNotifications } from "./context/NotificationContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check if the live event is already added
    const liveEventAdded = localStorage.getItem("live_event_added");
    
    if (!liveEventAdded) {
      // Add a live event that will start 1 minute after the homepage is loaded
      const currentDate = new Date();
      const liveEventStartTime = new Date(currentDate.getTime() + 60000); // 1 minute from now
      
      // Format time to "10:30 AM" format
      const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
      const formattedTime = liveEventStartTime.toLocaleTimeString([], timeOptions);
      
      // Format date to "April 23, 2023" format
      const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = liveEventStartTime.toLocaleDateString('en-US', dateOptions);
      
      // Store live event in localStorage
      const liveEvent = {
        id: 99999, // Special ID for the live event
        title: "Live Demo Event",
        description: "Join our interactive live event showcasing the latest features of our platform. Ask questions, participate in discussions, and learn from industry experts.",
        date: formattedDate,
        time: formattedTime,
        location: "Online",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop",
        tags: ["Technology", "Live", "Interactive"],
        isPaid: false,
        visible: true,
        featured: true,
        attendees: 0,
        availableSpots: 1000
      };
      
      // Get existing events
      const storedEvents = localStorage.getItem("events");
      let events = [];
      
      if (storedEvents) {
        try {
          events = JSON.parse(storedEvents);
          
          // Check if live event with this ID already exists
          const existingIndex = events.findIndex((e: any) => e.id === liveEvent.id);
          if (existingIndex !== -1) {
            events[existingIndex] = liveEvent;
          } else {
            events.push(liveEvent);
          }
        } catch (error) {
          events = [liveEvent];
        }
      } else {
        events = [liveEvent];
      }
      
      // Save updated events
      localStorage.setItem("events", JSON.stringify(events));
      localStorage.setItem("live_event_added", "true");
      
      // Set a timeout to send a notification when the event goes live
      setTimeout(() => {
        addNotification({
          title: "Live Event Starting Now!",
          message: "Live Demo Event is starting now! Join to participate.",
          type: "update",
          link: `/live/99999`
        });
      }, 60000); // Notification after 1 minute
    }
  }, [addNotification]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/become-speaker" element={<BecomeASpeaker />} />
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/admin/profile" element={
        <ProtectedRoute requiredRole="admin">
          <AdminProfile />
        </ProtectedRoute>
      } />
      <Route path="/payment/:eventId" element={
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      } />
      <Route path="/live/:eventId" element={<LiveEventPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <NotificationProvider>
            <ModalProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AppContent />
              </TooltipProvider>
            </ModalProvider>
          </NotificationProvider>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
