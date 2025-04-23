
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavProfile from '@/components/auth/NavProfile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">eventNexus</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-eventPrimary transition-colors">Home</Link>
            <Link to="/events" className="text-gray-700 hover:text-eventPrimary transition-colors">Events</Link>
            <Link to="/about" className="text-gray-700 hover:text-eventPrimary transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-eventPrimary transition-colors">Contact</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <NavProfile />
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
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
