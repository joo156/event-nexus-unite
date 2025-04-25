import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import HeroSection from "@/components/common/HeroSection";
import { Mail, Key } from "lucide-react";
import { Google, Apple } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  rememberMe: z.boolean().optional(),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password, values.rememberMe);
      if (success) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error("Google OAuth error:", error);
    }
  };

  const handleAppleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });
    if (error) {
      console.error("Apple OAuth error:", error);
    }
  };

  return (
    <Layout>
      <HeroSection
        title="Sign In"
        subtitle="Access your account and manage your events"
      />
      
      <div className="container mx-auto py-12 max-w-md">
        <div className="glass-card p-8">
          <div className="flex gap-2 mb-4">
            <Button type="button" className="w-full flex items-center justify-center gap-2 bg-white text-black border" onClick={handleGoogleLogin}>
              <Google className="h-5 w-5" /> Continue with Google
            </Button>
            <Button type="button" className="w-full flex items-center justify-center gap-2 bg-black text-white border" onClick={handleAppleLogin}>
              <Apple className="h-5 w-5" /> Continue with Apple
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="your@email.com" 
                          className="dark-input pl-10" 
                          {...field} 
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
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
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="dark-input pl-10" 
                          {...field} 
                        />
                        <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
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
                        className="rounded border-white/20 bg-secondary text-eventPrimary focus:ring-eventPrimary"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                      <label htmlFor="remember-me" className="text-sm text-gray-400">
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
                className="w-full bg-eventPrimary hover:bg-eventSecondary btn-animated"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-eventPrimary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 text-center">
                <p className="text-xs text-gray-500 mb-2">Demo Credentials</p>
                <p className="text-xs text-gray-400">Admin: admin@eventnexus.com / password123</p>
                <p className="text-xs text-gray-400">User: user@example.com / password123</p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
