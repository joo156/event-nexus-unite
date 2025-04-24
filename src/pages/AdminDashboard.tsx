
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  Bell,
  Eye,
  EyeOff,
  Check,
  X,
  Mail,
  Download
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { useNotifications } from "@/context/NotificationContext";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/context/ModalContext";
import EventForm from "@/components/admin/EventForm";
import DeleteEventDialog from "@/components/admin/DeleteEventDialog";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { Badge } from "@/components/ui/badge";
import SpeakerManagementModal from "@/components/admin/SpeakerManagementModal";
import { exportAttendeeList } from "@/utils/exportUtils";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("events");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['events', 'attendees', 'speakers', 'settings'].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [location]);
  
  const { user } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent, toggleEventVisibility, speakerProposals, markProposalAsRead } = useEvents();
  const { unreadCount, addNotification } = useNotifications();
  const { toast } = useToast();
  const { openModal } = useModal();
  
  const activeEvents = events.filter(event => new Date(event.date) >= new Date()).length;
  const totalAttendees = events.reduce((sum, event) => sum + (event.attendees || 0), 0);
  const totalRevenue = events
    .filter(event => event.isPaid && event.price && event.attendees)
    .reduce((sum, event) => sum + (event.price || 0) * (event.attendees || 0), 0);
  
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  
  const handleViewSpeakerProposal = (proposal: any) => {
    setSelectedProposal(proposal);
    setIsProposalModalOpen(true);
    if (!proposal.isRead) {
      markProposalAsRead(proposal.id);
    }
  };
  
  const handleApproveSpeakerProposal = (proposal: any) => {
    markProposalAsRead(proposal.id);
    toast({
      title: "Proposal Approved",
      description: `${proposal.name} has been approved as a speaker.`,
    });
    setIsProposalModalOpen(false);
  };
  
  const handleRejectSpeakerProposal = (proposal: any) => {
    markProposalAsRead(proposal.id);
    toast({
      title: "Proposal Rejected",
      description: `${proposal.name}'s proposal has been rejected.`,
    });
    setIsProposalModalOpen(false);
  };

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

  const handleToggleVisibility = async (event: any) => {
    try {
      await toggleEventVisibility(event.id);
    } catch (error) {
      toast({
        title: "Operation failed",
        description: "There was an error toggling event visibility.",
        variant: "destructive"
      });
    }
  };

  const handleCreateEvent = async (eventData: any) => {
    try {
      await addEvent({
        ...eventData,
        attendees: 0,
        isPaid: !!eventData.price && eventData.price > 0,
        visible: true
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

  const handleExportAttendees = async (eventId: number) => {
    try {
      await exportAttendeeList(eventId);
      toast({
        title: "Export successful",
        description: "The attendee list has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the attendee list.",
        variant: "destructive",
      });
    }
  };

  const handleOpenSpeakerModal = (speaker?: any) => {
    setSelectedSpeaker(speaker);
    setIsSpeakerModalOpen(true);
  };

  const handleSpeakerUpdated = () => {
    // Refresh events data to show updated speakers
    // No need to manually set events as the context will handle this
    toast({
      title: "Success",
      description: "Speaker data has been updated successfully."
    });
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
                        <th className="px-6 py-3">Visibility</th>
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
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              event.visible !== false 
                                ? 'bg-blue-900/20 text-blue-400' 
                                : 'bg-gray-700/20 text-gray-400'
                            }`}>
                              {event.visible !== false ? 'Visible' : 'Hidden'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`${
                                  event.visible !== false 
                                    ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20' 
                                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/20'
                                }`}
                                onClick={() => handleToggleVisibility(event)}
                                title={event.visible !== false ? "Hide event" : "Show event"}
                              >
                                {event.visible !== false ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
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
                          <td colSpan={9} className="px-6 py-8 text-center text-gray-400">
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
                          onClick={() => handleExportAttendees(event.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
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
                  <Button 
                    className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
                    onClick={() => handleOpenSpeakerModal()}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add New Speaker
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Speakers</h3>
                    <div className="space-y-4">
                      {events.flatMap(event => event.speakers || [])
                        .filter((speaker, index, self) => 
                          index === self.findIndex(s => s.id === speaker.id)
                        ).length > 0 ? (
                        events.flatMap(event => event.speakers || [])
                          .filter((speaker, index, self) => 
                            index === self.findIndex(s => s.id === speaker.id)
                          )
                          .map(speaker => (
                            <div key={speaker.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary">
                              <img 
                                src={speaker.image} 
                                alt={speaker.name} 
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-white">{speaker.name}</p>
                                <p className="text-sm text-gray-400">{speaker.title}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-auto text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                onClick={() => handleOpenSpeakerModal(speaker)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No speakers found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Speaker Proposals</h3>
                    <div className="space-y-4">
                      {speakerProposals.length > 0 ? (
                        speakerProposals.map(proposal => (
                          <div 
                            key={proposal.id} 
                            className={`p-3 rounded-lg hover:bg-secondary cursor-pointer ${!proposal.isRead ? 'bg-blue-900/20' : ''}`}
                            onClick={() => handleViewSpeakerProposal(proposal)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-white">{proposal.name}</p>
                                <p className="text-sm text-gray-400">{proposal.email}</p>
                              </div>
                              {!proposal.isRead && (
                                <Badge className="bg-blue-500">New</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 mt-2">{proposal.bio}</p>
                            <div className="mt-2 text-xs text-gray-500">
                              {new Date(proposal.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No speaker proposals yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="glass-modal text-white sm:max-w-md">
          <DeleteEventDialog
            eventTitle={selectedEvent?.title || ''}
            onConfirm={handleDeleteEvent}
            onCancel={() => setIsDeleteDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isProposalModalOpen} onOpenChange={setIsProposalModalOpen}>
        <DialogContent className="glass-modal text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Speaker Proposal</DialogTitle>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Name</h4>
                <p className="text-white">{selectedProposal.name}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Email</h4>
                <p className="text-white">{selectedProposal.email}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Social Links</h4>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {selectedProposal.socialLinks.linkedin && (
                    <a href={selectedProposal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:underline">LinkedIn</a>
                  )}
                  {selectedProposal.socialLinks.twitter && (
                    <a href={selectedProposal.socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:underline">Twitter</a>
                  )}
                  {selectedProposal.socialLinks.instagram && (
                    <a href={selectedProposal.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:underline">Instagram</a>
                  )}
                  {selectedProposal.socialLinks.facebook && (
                    <a href={selectedProposal.socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:underline">Facebook</a>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Bio</h4>
                <p className="text-white mt-1">{selectedProposal.bio}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Submitted</h4>
                <p className="text-white">{new Date(selectedProposal.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700" 
                  onClick={() => handleApproveSpeakerProposal(selectedProposal)}
                >
                  <Check className="mr-1 h-4 w-4" /> Approve
                </Button>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700" 
                  onClick={() => handleRejectSpeakerProposal(selectedProposal)}
                >
                  <X className="mr-1 h-4 w-4" /> Reject
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/20 text-white"
                  onClick={() => {
                    window.location.href = `mailto:${selectedProposal.email}`;
                  }}
                >
                  <Mail className="mr-1 h-4 w-4" /> Contact
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <SpeakerManagementModal
        isOpen={isSpeakerModalOpen}
        onClose={() => {
          setIsSpeakerModalOpen(false);
          setSelectedSpeaker(null);
        }}
        eventId={selectedEvent?.id}
        speaker={selectedSpeaker}
        onSpeakerUpdated={handleSpeakerUpdated}
      />
      
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
