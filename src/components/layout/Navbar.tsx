
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavProfile from '@/components/auth/NavProfile';
import NotificationsDropdown from '@/components/notifications/NotificationsDropdown';
import { useEvents } from '@/context/EventContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const location = useLocation();
  const { events } = useEvents();
  
  // Find live event
  const liveEvent = events.find(event => event.id === 99999);
  const isLiveEventSoon = liveEvent && new Date(liveEvent.date + " " + liveEvent.time) > new Date();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">eventNexus</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn(
                "text-gray-700 hover:text-eventPrimary transition-colors", 
                isActive("/") && "text-eventPrimary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={cn(
                "text-gray-700 hover:text-eventPrimary transition-colors", 
                isActive("/events") && "text-eventPrimary font-medium"
              )}
            >
              Events
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className="flex items-center text-gray-700 hover:text-eventPrimary transition-colors"
              >
                Quick Links <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isQuickLinksOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isQuickLinksOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg w-48 py-2 z-10">
                  <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</Link>
                  <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact Us</Link>
                  <Link to="/become-speaker" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Become a Speaker</Link>
                  {isLiveEventSoon && (
                    <Link 
                      to={`/live/${liveEvent?.id}`} 
                      className="block px-4 py-2 text-red-600 hover:bg-gray-100 font-medium"
                    >
                      🔴 Live Event
                    </Link>
                  )}
                  <hr className="my-1" />
                  <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin</Link>
                </div>
              )}
            </div>
            <Link 
              to="/about" 
              className={cn(
                "text-gray-700 hover:text-eventPrimary transition-colors", 
                isActive("/about") && "text-eventPrimary font-medium"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-gray-700 hover:text-eventPrimary transition-colors", 
                isActive("/contact") && "text-eventPrimary font-medium"
              )}
            >
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <NotificationsDropdown />
            <NavProfile />
          </div>
          
          <div className="md:hidden flex items-center">
            <NotificationsDropdown />
            <button onClick={toggleMenu} className="text-gray-700 ml-3">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden bg-white shadow-lg absolute w-full transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
          <Link to="/events" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md">Events</Link>
          <Link to="/about" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md">About</Link>
          <Link to="/contact" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md">Contact</Link>
          <Link to="/become-speaker" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md">Become a Speaker</Link>
          <Link to="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md">Admin</Link>
          {isLiveEventSoon && (
            <Link 
              to={`/live/${liveEvent?.id}`}
              className="block py-2 px-4 text-red-600 hover:bg-gray-100 rounded-md font-medium"
            >
              🔴 Live Event
            </Link>
          )}
          <div className="pt-4 flex flex-col space-y-2">
            <Link to="/signin">
              <Button variant="outline" className="w-full border-eventPrimary text-eventPrimary">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full bg-eventPrimary hover:bg-eventSecondary">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
