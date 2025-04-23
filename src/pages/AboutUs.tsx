
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/common/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, MapPin } from "lucide-react";

const AboutUs = () => {
  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Sarah has 15+ years of experience in event management and tech. She founded eventNexus to bridge the gap between physical and virtual events.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "With a background in software engineering, Michael leads our technical team in building innovative solutions for virtual event experiences.",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Elena ensures that every user and attendee has a seamless experience, from registration to post-event engagement.",
    },
  ];

  return (
    <Layout>
      <HeroSection
        title="About Us"
        subtitle="Learn about our mission and the team behind eventNexus"
      />

      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-lg mb-6">
            Founded in 2023, eventNexus was born out of a vision to revolutionize how people connect, learn, and network through virtual and hybrid events. Our platform brings together cutting-edge technology and intuitive design to create memorable event experiences.
          </p>
          <p className="text-lg mb-12">
            We believe that great events should be accessible to everyone, regardless of their location. By breaking down geographical barriers, we're enabling knowledge sharing and community building on a global scale.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover-lift">
              <div className="mx-auto w-16 h-16 bg-eventLight/30 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-eventPrimary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Focused</h3>
              <p>Building meaningful connections through interactive virtual experiences.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover-lift">
              <div className="mx-auto w-16 h-16 bg-eventLight/30 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-eventPrimary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Excellence</h3>
              <p>Curating high-quality events that deliver real value to attendees.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover-lift">
              <div className="mx-auto w-16 h-16 bg-eventLight/30 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-eventPrimary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Access</h3>
              <p>Making exceptional events accessible to participants worldwide.</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover-scale">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-eventPrimary mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="relative border-l-4 border-eventPrimary ml-6 pl-8 py-4">
            <div className="mb-12">
              <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-eventPrimary"></div>
              <h3 className="text-xl font-bold mb-2">2023: Foundation</h3>
              <p>eventNexus was established with a mission to transform virtual events.</p>
            </div>
            <div className="mb-12">
              <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-eventPrimary"></div>
              <h3 className="text-xl font-bold mb-2">2023: Platform Launch</h3>
              <p>Our first version of the platform was released, supporting basic event functionality.</p>
            </div>
            <div className="mb-12">
              <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-eventPrimary"></div>
              <h3 className="text-xl font-bold mb-2">2024: Expansion</h3>
              <p>Introduced advanced features for hybrid events and expanded our global reach.</p>
            </div>
            <div>
              <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-eventPrimary"></div>
              <h3 className="text-xl font-bold mb-2">Today</h3>
              <p>Continuously evolving to meet the changing needs of event organizers and attendees worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
