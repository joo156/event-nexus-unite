
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, UserRound, Ticket, Mail, Users, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

const NavProfile = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { unreadCount } = useNotifications();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/signin">
          <Button variant="outline" className="border-white/10 text-white hover:bg-secondary">
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-eventPrimary hover:bg-eventSecondary btn-animated">
            Register
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      {isAdmin() && (
        <Link to="/admin" className="hidden sm:block">
          <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-secondary">
            Admin Dashboard
          </Button>
        </Link>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 border-white/10 hover:bg-secondary">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-eventPrimary/20 flex items-center justify-center">
                <UserRound className="h-5 w-5 text-eventPrimary" />
              </div>
            )}
            <span className="hidden md:inline text-white">{user.name.split(' ')[0]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-secondary/90 backdrop-blur-md border-white/10 text-white">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <DropdownMenuSeparator className="bg-white/10" />
          
          <DropdownMenuItem asChild className="focus:bg-secondary/70">
            <Link to="/profile" className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="focus:bg-secondary/70">
            <Link to="/profile?tab=registrations" className="cursor-pointer flex items-center">
              <Ticket className="mr-2 h-4 w-4" />
              <span>My Events</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="focus:bg-secondary/70">
            <Link to="/contact" className="cursor-pointer flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact Us</span>
            </Link>
          </DropdownMenuItem>
          
          {isAdmin() && (
            <>
              <DropdownMenuSeparator className="bg-white/10" />
              
              <DropdownMenuItem asChild className="focus:bg-secondary/70">
                <Link to="/admin" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="focus:bg-secondary/70">
                <Link to="/admin?tab=attendees" className="cursor-pointer flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Manage Attendees</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="focus:bg-secondary/70">
                <Link to="/admin" className="cursor-pointer flex items-center relative">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute right-2 bg-eventPrimary text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator className="bg-white/10" />
          
          <DropdownMenuItem onClick={logout} className="cursor-pointer focus:bg-secondary/70">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavProfile;
