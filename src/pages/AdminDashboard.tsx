
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Calendar, 
  Users, 
  Ticket, 
  BarChart, 
  Edit, 
  Trash2, 
  Plus, 
  Bell
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { useNotifications } from "@/context/NotificationContext";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/context/ModalContext";
import EventForm from "@/components/admin/EventForm";
import DeleteEventDialog from "@/components/admin/DeleteEventDialog";
import NotificationsPanel from "@/components/admin/NotificationsPanel";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("events");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { user } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { unreadCount } = useNotifications();
  const { toast } = useToast();
  const { openModal } = useModal();
  
  const activeEvents = events.filter(event => new Date(event.date) >= new Date()).length;
  const totalAttendees = events.reduce((sum, event) => sum + (event.attendees || 0), 0);
  const totalRevenue = events
    .filter(event => event.isPaid && event.price && event.attendees)
    .reduce((sum, event) => sum + (event.price || 0) * (event.attendees || 0), 0);
  
  const handleOpenCreateDialog = () => {
    setSelectedEvent(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (event: any) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (event: any) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateEvent = async (eventData: any) => {
    try {
      await addEvent({
        ...eventData,
        attendees: 0,
        isPaid: !!eventData.price && eventData.price > 0
      });
      setIsDialogOpen(false);
      toast({
        title: "Event created",
        description: "The new event has been created successfully."
      });
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "There was an error creating the event.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (!selectedEvent) return;
    
    try {
      await updateEvent(selectedEvent.id, {
        ...eventData,
        isPaid: !!eventData.price && eventData.price > 0
      });
      setIsDialogOpen(false);
      toast({
        title: "Event updated",
        description: "The event has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the event.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      await deleteEvent(selectedEvent.id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Event deleted",
        description: "The event has been deleted successfully."
      });
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the event.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            {user && <p className="text-gray-400">Logged in as {user.email}</p>}
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" className="relative" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-eventPrimary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            
            <Button 
              className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
              onClick={handleOpenCreateDialog}
            >
              <Plus className="mr-1 h-4 w-4" /> Create Event
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift bg-secondary/50 text-white border-white/10">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventPrimary/20 p-4 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Events</p>
                <h3 className="text-2xl font-bold text-white">{events.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift bg-secondary/50 text-white border-white/10">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventPrimary/20 p-4 rounded-full mr-4">
                <Users className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Attendees</p>
                <h3 className="text-2xl font-bold text-white">{totalAttendees}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift bg-secondary/50 text-white border-white/10">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventPrimary/20 p-4 rounded-full mr-4">
                <Ticket className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Events</p>
                <h3 className="text-2xl font-bold text-white">{activeEvents}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift bg-secondary/50 text-white border-white/10">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-eventPrimary/20 p-4 rounded-full mr-4">
                <BarChart className="h-6 w-6 text-eventPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <h3 className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8 bg-secondary">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <Card className="bg-secondary/50 text-white border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Manage Events</CardTitle>
                  <Button 
                    className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
                    onClick={handleOpenCreateDialog}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add New Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-secondary">
                      <tr>
                        <th className="px-6 py-3">Event Name</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Location</th>
                        <th className="px-6 py-3">Attendees</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {events.map((event) => (
                        <tr key={event.id} className="hover:bg-secondary">
                          <td className="px-6 py-4 font-medium text-white">
                            {event.title}
                          </td>
                          <td className="px-6 py-4 text-gray-300">{event.date}</td>
                          <td className="px-6 py-4 text-gray-300">{event.time}</td>
                          <td className="px-6 py-4 text-gray-300">{event.location}</td>
                          <td className="px-6 py-4 text-gray-300">{event.attendees || 0}</td>
                          <td className="px-6 py-4 text-gray-300">
                            {event.price ? `$${event.price}` : 'Free'}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(event.date) >= new Date() ? (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900/20 text-green-500">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700/20 text-gray-400">
                                Past
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                onClick={() => handleOpenEditDialog(event)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                onClick={() => handleOpenDeleteDialog(event)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {events.length === 0 && (
                        <tr>
                          <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                            No events found. Create your first event!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendees">
            <Card className="bg-secondary/50 text-white border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Attendee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Manage attendees for your events. View registrations and export attendee lists.
                </p>
                
                <div className="mt-6">
                  {events.length > 0 ? (
                    events.map(event => (
                      <div key={event.id} className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">{event.title}</h3>
                        <p className="text-gray-400 mb-2">Date: {event.date} | Attendees: {event.attendees || 0}</p>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-white border-white/10 hover:bg-secondary"
                          disabled={!event.attendees}
                        >
                          Export Attendee List
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No events found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="speakers">
            <Card className="bg-secondary/50 text-white border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Manage Speakers</CardTitle>
                  <Button className="bg-eventPrimary hover:bg-eventSecondary btn-animated">
                    <Plus className="mr-1 h-4 w-4" /> Add New Speaker
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  Manage speakers for your events. Add new speakers and update existing speaker profiles.
                </p>
                
                {events.some(event => event.speakers && event.speakers.length > 0) ? (
                  events.flatMap(event => event.speakers || [])
                    .filter((speaker, index, self) => 
                      index === self.findIndex(s => s.id === speaker.id)
                    )
                    .map(speaker => (
                      <div key={speaker.id} className="flex items-center space-x-4 mb-4 p-3 rounded-lg hover:bg-secondary">
                        <img 
                          src={speaker.image} 
                          alt={speaker.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">{speaker.name}</p>
                          <p className="text-sm text-gray-400">{speaker.title}</p>
                        </div>
                        <div className="ml-auto flex">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No speakers found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="bg-secondary/50 text-white border-white/10">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Configure system settings, notification preferences, and admin access.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Create/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-modal text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
          <EventForm 
            event={selectedEvent}
            onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Event Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="glass-modal text-white sm:max-w-md">
          <DeleteEventDialog
            eventTitle={selectedEvent?.title || ''}
            onConfirm={handleDeleteEvent}
            onCancel={() => setIsDeleteDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="bg-black/20 backdrop-blur-sm fixed inset-0" 
            onClick={() => setShowNotifications(false)}
          />
          <div className="w-full sm:max-w-md h-full bg-secondary z-10 overflow-auto animate-slide-in-right">
            <NotificationsPanel onClose={() => setShowNotifications(false)} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;
