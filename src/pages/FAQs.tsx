
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQs = () => {
  return (
    <Layout>
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to commonly asked questions about our platform and events"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is eventNexus?</AccordionTrigger>
                  <AccordionContent>
                    eventNexus is a premier platform for discovering, attending, and managing virtual and hybrid events. Our platform connects event organizers, speakers, and attendees from around the world, offering a seamless experience for all your event needs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is creating an account free?</AccordionTrigger>
                  <AccordionContent>
                    Yes, creating an account on eventNexus is completely free. With a free account, you can browse events, register for free events, save favorites, and receive updates about upcoming events that match your interests.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    You can contact our customer support team through the Contact Us page, by emailing support@eventnexus.com, or by using the live chat feature available on the bottom right of every page during business hours.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Are there mobile apps available?</AccordionTrigger>
                  <AccordionContent>
                    Currently, eventNexus is available as a responsive web application that works well on mobile devices. We're working on dedicated mobile apps for iOS and Android, which will be available soon.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="events">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I register for an event?</AccordionTrigger>
                  <AccordionContent>
                    To register for an event, navigate to the event page and click the "Register" button. Follow the prompts to complete your registration. For free events, you'll gain immediate access, while paid events will require payment information.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I get a refund for a paid event?</AccordionTrigger>
                  <AccordionContent>
                    Yes, refunds are available for paid events if requested at least 48 hours before the event starts. Please contact our support team with your order details to process a refund.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I access a live event?</AccordionTrigger>
                  <AccordionContent>
                    Once registered, you'll receive access instructions via email. On the day of the event, log in to your account, navigate to "My Events," and click on the event to join. You can also access it directly from the event page.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Are recordings available after the event?</AccordionTrigger>
                  <AccordionContent>
                    Yes, recordings of most events are available to registered attendees within 24-48 hours after the event concludes. You can access them from your user dashboard or through a link sent via email.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="speakers">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I apply to be a speaker?</AccordionTrigger>
                  <AccordionContent>
                    To apply as a speaker, navigate to our "Become a Speaker" page and fill out the application form. Include details about your expertise, previous speaking experience, and potential talk topics.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What happens after I submit my speaker application?</AccordionTrigger>
                  <AccordionContent>
                    After submitting your application, our team will review your profile and expertise. This process typically takes 1-2 weeks. If there's a potential match with our upcoming events, we'll contact you to discuss further details.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do speakers get paid?</AccordionTrigger>
                  <AccordionContent>
                    Speaker compensation varies depending on the event type, your expertise level, and the engagement scope. Some events offer honorariums, while others provide exposure and networking opportunities. Details are discussed during the selection process.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What technical setup do I need as a speaker?</AccordionTrigger>
                  <AccordionContent>
                    Speakers need a reliable internet connection, a good quality webcam, a microphone (headset or standalone), and adequate lighting. Our team provides technical checks before the event and assistance during your presentation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="technical">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What are the technical requirements for attending an event?</AccordionTrigger>
                  <AccordionContent>
                    To attend events, you need a device with internet access (computer, tablet, or smartphone), a modern web browser (Chrome, Firefox, Safari, Edge), and speakers or headphones. For interactive sessions, a microphone may be useful.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I troubleshoot connection issues during an event?</AccordionTrigger>
                  <AccordionContent>
                    If you experience connection issues, try refreshing the page, checking your internet connection, or using a different browser. We also provide a technical support chat during live events for immediate assistance.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I participate in events on mobile devices?</AccordionTrigger>
                  <AccordionContent>
                    Yes, eventNexus is fully responsive and works on mobile devices. For the best experience, we recommend using our platform on tablets or computers, especially for interactive sessions or workshops.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How secure is my information on eventNexus?</AccordionTrigger>
                  <AccordionContent>
                    We take security seriously. All data is encrypted during transmission, and we adhere to strict privacy policies. We never share your personal information with third parties without your consent. For more details, please review our Privacy Policy.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
