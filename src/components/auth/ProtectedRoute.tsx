
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole = "user" }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const authUser = localStorage.getItem("authUser");
    
    if (!authUser) {
      setIsAuthenticated(false);
      setHasRequiredRole(false);
      return;
    }
    
    try {
      const user = JSON.parse(authUser);
      setIsAuthenticated(true);
      
      // Check if user has the required role
      setHasRequiredRole(user.role === requiredRole || requiredRole === "user");
      
      if (user.role !== requiredRole && requiredRole !== "user") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error parsing auth user:", error);
      setIsAuthenticated(false);
      setHasRequiredRole(false);
    }
  }, [requiredRole, toast]);

  // Show nothing while checking auth status
  if (isAuthenticated === null || hasRequiredRole === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eventPrimary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // If authenticated but wrong role, redirect to home
  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and has required role, render children
  return <>{children}</>;
};

export default ProtectedRoute;
