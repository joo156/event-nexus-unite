
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeroSection from "@/components/common/HeroSection";
import { Mail, MessageCircle, Info } from "lucide-react";

const HelpCenter = () => {
  return (
    <Layout>
      <HeroSection
        title="Help Center"
        subtitle="Get answers to your questions and find the support you need"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-eventPrimary" />
              </div>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="/faqs" className="text-eventPrimary hover:underline">View FAQs</a>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-eventPrimary" />
              </div>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Reach out to our support team</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="/contact" className="text-eventPrimary hover:underline">Contact Us</a>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto bg-eventLight/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Info className="h-8 w-8 text-eventPrimary" />
              </div>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Guides and resources to help you</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="/about" className="text-eventPrimary hover:underline">Learn More</a>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-gradient">Popular Help Topics</span>
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I register for an event?</AccordionTrigger>
              <AccordionContent>
                To register for an event, navigate to the event page by clicking on the event card from the homepage or events page. Then click the "Register" button and follow the prompts to complete your registration.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I become a speaker?</AccordionTrigger>
              <AccordionContent>
                To become a speaker, go to our "Become a Speaker" page and fill out the application form. Our team will review your submission and contact you if there's a match with our upcoming events.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I get a refund for a paid event?</AccordionTrigger>
              <AccordionContent>
                Yes, refunds are available for paid events if requested at least 48 hours before the event starts. Please contact our support team with your order details to process a refund.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I access a live event?</AccordionTrigger>
              <AccordionContent>
                After registering for a live event, you'll receive an email with access instructions. You can also access the event by going to the event page at the scheduled time and clicking the "Join Live" button.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Are recordings available after the event?</AccordionTrigger>
              <AccordionContent>
                Yes, recordings of most events are available to registered attendees within 24-48 hours after the event concludes. You can access them from your user dashboard or through a link sent via email.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
