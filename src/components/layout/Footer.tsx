
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-eventDark text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 py-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">eventNexus</h3>
            <p className="text-gray-300 mb-6">
              Your premier platform for discovering, attending, and managing virtual and hybrid events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-eventPrimary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eventPrimary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eventPrimary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eventPrimary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-eventPrimary transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-eventPrimary transition-colors">Events</Link></li>
              <li><Link to="/speakers" className="text-gray-300 hover:text-eventPrimary transition-colors">Speakers</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-eventPrimary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-eventPrimary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help-center" className="text-gray-300 hover:text-eventPrimary transition-colors">Help Center</Link></li>
              <li><Link to="/faqs" className="text-gray-300 hover:text-eventPrimary transition-colors">FAQs</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-eventPrimary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-300 hover:text-eventPrimary transition-colors">Terms of Service</Link></li>
              <li><Link to="/admin" className="text-gray-300 hover:text-eventPrimary transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white border-gray-700 focus:border-eventPrimary"
              />
              <Button className="bg-eventPrimary hover:bg-eventSecondary">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6 text-center text-gray-400">
          <p>&copy; {currentYear} eventNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
