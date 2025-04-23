
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/common/HeroSection";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  rememberMe: z.boolean().optional(),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Mock authentication - in a real app, this would validate against a backend
    setTimeout(() => {
      if (values.email === "admin@eventnexus.com" && values.password === "password123") {
        // Store login state
        localStorage.setItem("authUser", JSON.stringify({ 
          email: values.email,
          role: "admin",
          name: "Admin User"
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome back to eventNexus!",
        });
        
        navigate("/admin");
      } else {
        // Check if it's a regular user (mock)
        if (values.email.includes("@") && values.password.length >= 8) {
          // Store login state for regular user
          localStorage.setItem("authUser", JSON.stringify({ 
            email: values.email,
            role: "user",
            name: "Regular User"
          }));
          
          toast({
            title: "Login successful",
            description: "Welcome back to eventNexus!",
          });
          
          navigate("/");
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <HeroSection
        title="Sign In"
        subtitle="Access your account and manage your events"
      />
      
      <div className="container mx-auto py-12 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember-me"
                        className="rounded border-gray-300 text-eventPrimary focus:ring-eventPrimary"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                      <label htmlFor="remember-me" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                  )}
                />
                
                <Link to="/forgot-password" className="text-sm text-eventPrimary hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-eventPrimary hover:bg-eventSecondary"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-eventPrimary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
