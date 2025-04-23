
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Mock form submission - in a real app, this would send data to a backend
    setTimeout(() => {
      console.log("Form submitted:", values);
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <HeroSection
        title="Contact Us"
        subtitle="Have questions or feedback? We'd love to hear from you"
      />

      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg mb-8">
              We're here to help with any questions you might have about events, 
              platform features, or technical support. Fill out the form and our 
              team will get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-eventLight/30 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-eventPrimary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-600">support@eventnexus.com</p>
                  <p className="text-gray-600">info@eventnexus.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-eventLight/30 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-eventPrimary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Monday - Friday, 9am - 6pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-eventLight/30 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-eventPrimary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-gray-600">123 Event Avenue</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 h-64 rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1619761654697!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What's this regarding?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full min-h-[150px] rounded-md border border-input p-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          placeholder="Your message..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-eventPrimary hover:bg-eventSecondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
