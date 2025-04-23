
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEvents } from "@/context/EventContext";
import { useNotifications } from "@/context/NotificationContext";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/common/HeroSection";
import { Mic, User, Mail, Link } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal('')),
  twitter: z.string().url({ message: "Please enter a valid Twitter URL." }).optional().or(z.literal('')),
  instagram: z.string().url({ message: "Please enter a valid Instagram URL." }).optional().or(z.literal('')),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters long." }),
});

const BecomeASpeaker = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addSpeakerProposal } = useEvents();
  const { addNotification } = useNotifications();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      bio: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const socialLinks = {
        linkedin: values.linkedin || undefined,
        twitter: values.twitter || undefined,
        instagram: values.instagram || undefined,
      };
      
      await addSpeakerProposal({
        name: values.name,
        email: values.email,
        socialLinks,
        bio: values.bio,
      });
      
      // Add notification for admin
      addNotification({
        title: "New Speaker Proposal",
        message: `${values.name} has submitted a speaker proposal`,
        type: "proposal",
        link: `/admin?tab=speakers`
      });
      
      toast({
        title: "Proposal submitted",
        description: "Your speaker proposal has been successfully submitted.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting speaker proposal:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <HeroSection
        title="Become a Speaker"
        subtitle="Share your expertise and insights with our community"
      />
      
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <div className="glass-card p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto bg-eventPrimary/20 p-4 rounded-full inline-flex mb-4">
                  <Mic className="h-8 w-8 text-eventPrimary" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Speaker Application</h2>
                <p className="text-gray-400">
                  Fill out the form below to apply as a speaker for our upcoming events.
                  We're looking for experts in technology, innovation, leadership, and more.
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="John Doe" 
                                className="dark-input pl-10"
                                {...field} 
                              />
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="john@example.com" 
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
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">Social Media Links</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">LinkedIn</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  placeholder="https://linkedin.com/in/yourusername" 
                                  className="dark-input pl-10"
                                  {...field} 
                                />
                                <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Twitter/X</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  placeholder="https://twitter.com/yourusername" 
                                  className="dark-input pl-10"
                                  {...field} 
                                />
                                <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Instagram</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  placeholder="https://instagram.com/yourusername" 
                                  className="dark-input pl-10"
                                  {...field} 
                                />
                                <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Bio and Speaking Experience
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself, your expertise, and your previous speaking experience..." 
                            className="dark-input min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eventPrimary hover:bg-eventSecondary btn-animated"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto bg-green-900/20 p-4 rounded-full inline-flex mb-4">
                <Mic className="h-8 w-8 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-white">Application Submitted!</h2>
              
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                Thank you for your interest in speaking at our events. Our team will review your application
                and get back to you soon. We appreciate your patience.
              </p>
              
              <Button 
                className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
                onClick={() => window.location.href = "/"}
              >
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BecomeASpeaker;
