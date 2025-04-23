
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import HeroSection from "@/components/common/HeroSection";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      await resetPassword(values.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during password reset request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <HeroSection
        title="Reset Your Password"
        subtitle="Enter your email address to receive a password reset link"
      />
      
      <div className="container mx-auto py-12 max-w-md">
        <div className="glass-card p-8">
          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-eventPrimary/20 p-4 rounded-full">
                    <Mail className="h-8 w-8 text-eventPrimary" />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          {...field} 
                          className="dark-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary btn-animated"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-400">
                    Remembered your password?{" "}
                    <Link to="/signin" className="text-eventPrimary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-6">
                <div className="bg-green-900/20 p-4 rounded-full">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-white">Check Your Email</h3>
              
              <p className="text-gray-400 mb-6">
                If an account exists with the email you provided, we've sent a password reset link.
                Please check your inbox and follow the instructions.
              </p>
              
              <Link to="/signin">
                <Button className="btn-primary btn-animated">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
