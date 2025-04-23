
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  isAdmin: () => boolean;
  resetPassword: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing auth user:", error);
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    return new Promise((resolve) => {
      // Mock authentication
      setTimeout(() => {
        if (email === "admin@eventnexus.com" && password === "password123") {
          const adminUser = { 
            id: "admin-1",
            email: email,
            role: "admin",
            name: "Admin User" 
          };
          
          localStorage.setItem("authUser", JSON.stringify(adminUser));
          setUser(adminUser);
          setIsAuthenticated(true);
          
          toast({
            title: "Login successful",
            description: "Welcome back, Admin!",
          });
          
          resolve(true);
        } else {
          // Check if it's a regular user (mock)
          if (email.includes("@") && password.length >= 8) {
            const regularUser = { 
              id: `user-${Date.now()}`,
              email: email,
              role: "user",
              name: "Regular User"
            };
            
            localStorage.setItem("authUser", JSON.stringify(regularUser));
            setUser(regularUser);
            setIsAuthenticated(true);
            
            toast({
              title: "Login successful",
              description: "Welcome back to eventNexus!",
            });
            
            resolve(true);
          } else {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
            
            resolve(false);
          }
        }
      }, 1000);
    });
  };

  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `user-${Date.now()}`,
          email: userData.email,
          name: userData.name,
          role: "user",
        };
        
        localStorage.setItem("authUser", JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Registration successful!",
          description: "Welcome to eventNexus. Your account has been created.",
        });
        
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...data };
          localStorage.setItem("authUser", JSON.stringify(updatedUser));
          setUser(updatedUser);
          
          toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
          });
          
          resolve(true);
        } else {
          toast({
            title: "Update failed",
            description: "You need to be logged in to update your profile.",
            variant: "destructive",
          });
          
          resolve(false);
        }
      }, 800);
    });
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Password reset email sent",
          description: `If ${email} is associated with an account, you will receive a password reset link.`,
        });
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        isAdmin,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
