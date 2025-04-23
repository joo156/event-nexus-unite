
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { Ticket, Calendar, Clock, MapPin, User, Mail, Key } from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const { getUserRegisteredEvents } = useEvents();
  
  const [loading, setLoading] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadRegisteredEvents = async () => {
      if (user) {
        setLoading(true);
        try {
          const events = await getUserRegisteredEvents(user.id);
          setRegisteredEvents(events);
        } catch (error) {
          console.error("Error loading registered events:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadRegisteredEvents();
  }, [user, getUserRegisteredEvents]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.password && profileData.password !== profileData.confirmPassword) {
      return; // Add error handling here
    }
    
    setUpdatingProfile(true);
    
    try {
      // Only update fields that have been changed
      const updateData: any = {};
      
      if (profileData.name !== user?.name) {
        updateData.name = profileData.name;
      }
      
      if (profileData.email !== user?.email) {
        updateData.email = profileData.email;
      }
      
      // Don't send empty password
      if (profileData.password) {
        updateData.password = profileData.password;
      }
      
      if (Object.keys(updateData).length > 0) {
        await updateUser(updateData);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">My Profile</h1>
        <p className="text-gray-400 mb-8">Manage your account settings and event registrations</p>
        
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="w-full grid grid-cols-3 max-w-md mb-8 bg-secondary">
            <TabsTrigger value="registrations">My Events</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="registrations">
            <Card className="bg-secondary/50 text-white border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">My Registered Events</h2>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eventPrimary"></div>
                </div>
              ) : registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registeredEvents.map(event => (
                    <div key={event.id} className="glass-card overflow-hidden hover-lift">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-white">{event.title}</h3>
                        
                        <div className="space-y-2 text-sm mt-4">
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-2 text-eventPrimary" />
                            {event.date}
                          </div>
                          
                          <div className="flex items-center text-gray-400">
                            <Clock className="h-4 w-4 mr-2 text-eventPrimary" />
                            {event.time}
                          </div>
                          
                          <div className="flex items-center text-gray-400">
                            <MapPin className="h-4 w-4 mr-2 text-eventPrimary" />
                            {event.location}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center text-eventPrimary">
                            <Ticket className="h-4 w-4 mr-1" />
                            <span className="text-sm">{event.isPaid ? `Paid` : 'Free'}</span>
                          </div>
                          
                          <Link to={`/events/${event.id}`}>
                            <Button variant="outline" size="sm" className="text-white border-white/10 hover:bg-secondary">
                              View Event
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-secondary/70 inline-flex p-4 rounded-full mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No Registered Events</h3>
                  <p className="text-gray-400 mb-6">You haven't registered for any events yet.</p>
                  <Link to="/events">
                    <Button className="bg-eventPrimary hover:bg-eventSecondary btn-animated">
                      Browse Events
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card className="bg-secondary/50 text-white border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">Account Settings</h2>
              
              <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <div className="relative mt-1">
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="dark-input pl-10"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <div className="relative mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="dark-input pl-10"
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-medium mb-4 text-white">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="password" className="text-gray-300">New Password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={profileData.password}
                          onChange={handleInputChange}
                          className="dark-input pl-10"
                          placeholder="Leave blank to keep current password"
                        />
                        <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" className="text-gray-300">Confirm New Password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={handleInputChange}
                          className="dark-input pl-10"
                        />
                        <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
                  disabled={updatingProfile}
                >
                  {updatingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card className="bg-secondary/50 text-white border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">Notification Preferences</h2>
              
              <p className="text-gray-400 mb-6">
                Customize how and when you receive notifications about events, updates, and more.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email_notifications"
                    className="h-4 w-4 rounded border-white/20 bg-secondary text-eventPrimary focus:ring-eventPrimary"
                    defaultChecked
                  />
                  <Label htmlFor="email_notifications" className="ml-2 text-gray-300">
                    Email notifications for event updates
                  </Label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reminder_notifications"
                    className="h-4 w-4 rounded border-white/20 bg-secondary text-eventPrimary focus:ring-eventPrimary"
                    defaultChecked
                  />
                  <Label htmlFor="reminder_notifications" className="ml-2 text-gray-300">
                    Event reminders 24 hours before start
                  </Label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketing_emails"
                    className="h-4 w-4 rounded border-white/20 bg-secondary text-eventPrimary focus:ring-eventPrimary"
                    defaultChecked
                  />
                  <Label htmlFor="marketing_emails" className="ml-2 text-gray-300">
                    Promotional emails about new events
                  </Label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="speaker_updates"
                    className="h-4 w-4 rounded border-white/20 bg-secondary text-eventPrimary focus:ring-eventPrimary"
                    defaultChecked
                  />
                  <Label htmlFor="speaker_updates" className="ml-2 text-gray-300">
                    Updates about speakers you follow
                  </Label>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <Button
                  className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
                >
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
