
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Ticket, BarChart } from "lucide-react";
import { mockEvents } from "@/data/mockData";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in a real app, this would validate against a backend
    if (email === "admin@eventnexus.com" && password === "password123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full input-primary"
                    placeholder="admin@eventnexus.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full input-primary"
                    placeholder="password123"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-eventPrimary hover:bg-eventSecondary">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // Mock data for the dashboard
  const totalEvents = mockEvents.length;
  const totalAttendees = mockEvents.reduce((sum, event) => sum + (event.attendees || 0), 0);
  const activeEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).length;
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
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
