
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

const NavProfile = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const authUser = localStorage.getItem("authUser");
    
    if (authUser) {
      try {
        setUser(JSON.parse(authUser));
      } catch (error) {
        console.error("Error parsing auth user:", error);
        setUser(null);
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/signin">
          <Button variant="outline" className="border-eventPrimary text-eventPrimary hover:bg-eventPrimary hover:text-white">
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-eventPrimary hover:bg-eventSecondary">
            Register
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-eventPrimary/20 flex items-center justify-center">
            <User className="h-5 w-5 text-eventPrimary" />
          </div>
          <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-4 py-3">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfile;
