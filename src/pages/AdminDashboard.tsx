
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Ticket, BarChart } from "lucide-react";
import { mockEvents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in and is an admin
    const authUser = localStorage.getItem("authUser");
    
    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        setUser(parsedUser);
        
        toast({
          title: "Welcome to Admin Dashboard",
          description: `Logged in as ${parsedUser.name}`,
        });
      } catch (error) {
        console.error("Error parsing auth user:", error);
      }
    }
  }, [toast]);
  
  // Mock data for the dashboard
  const totalEvents = mockEvents.length;
  const totalAttendees = mockEvents.reduce((sum, event) => sum + (event.attendees || 0), 0);
  const activeEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).length;
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            {user && <p className="text-gray-500">Logged in as {user.email}</p>}
          </div>
          <Button className="bg-eventPrimary hover:bg-eventSecondary mt-4 sm:mt-0">
            Create New Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventLight/30 p-4 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <h3 className="text-2xl font-bold">{totalEvents}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventLight/30 p-4 rounded-full mr-4">
                <Users className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Attendees</p>
                <h3 className="text-2xl font-bold">{totalAttendees}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventLight/30 p-4 rounded-full mr-4">
                <Ticket className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Events</p>
                <h3 className="text-2xl font-bold">{activeEvents}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventLight/30 p-4 rounded-full mr-4">
                <BarChart className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold">$12,450</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Events</CardTitle>
                  <Button className="bg-eventPrimary hover:bg-eventSecondary">
                    Add New Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Event Name</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Location</th>
                        <th className="px-6 py-3">Attendees</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockEvents.map((event) => (
                        <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {event.title}
                          </td>
                          <td className="px-6 py-4">{event.date}</td>
                          <td className="px-6 py-4">{event.time}</td>
                          <td className="px-6 py-4">{event.location}</td>
                          <td className="px-6 py-4">{event.attendees || 0}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:underline mr-2">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:underline">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendees">
            <Card>
              <CardHeader>
                <CardTitle>Attendee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Attendee management functionality will be implemented in a future release.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="speakers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Speakers</CardTitle>
                  <Button className="bg-eventPrimary hover:bg-eventSecondary">
                    Add New Speaker
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>Speaker management functionality will be implemented in a future release.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>System settings functionality will be implemented in a future release.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
