
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from "@/context/EventContext";

const speakerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().url("Please enter a valid URL").min(1, "Image URL is required"),
  email: z.string().email("Please enter a valid email"),
  socialLinks: z.string().min(1, "Social links are required"),
});

type SpeakerFormData = z.infer<typeof speakerSchema>;

type SpeakerManagementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventId: number | undefined;
  speaker?: {
    id: string;
    name: string;
    title: string;
    bio: string;
    image: string;
  };
  onSpeakerUpdated: () => void;
};

export default function SpeakerManagementModal({
  isOpen,
  onClose,
  eventId,
  speaker,
  onSpeakerUpdated
}: SpeakerManagementModalProps) {
  const { toast } = useToast();
  const form = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      name: speaker?.name || '',
      title: speaker?.title || '',
      bio: speaker?.bio || '',
      image: speaker?.image || '',
      email: '',
      socialLinks: '{}'
    }
  });

  const { events } = useEvents();
  // Fix: manage event ID as string for use in select
  const [selectedEventId, setSelectedEventId] = React.useState(
    (eventId ? String(eventId) : (events?.[0]?.id ? String(events[0].id) : ""))
  );

  const onSubmit = async (data: SpeakerFormData) => {
    // use number for insert
    const eventForSpeaker = selectedEventId ? parseInt(selectedEventId, 10) : (eventId || events[0]?.id);
    if (!eventForSpeaker) {
      toast({ title: "No event selected", description: "Please select an event", variant: "destructive" });
      return;
    }
    try {
      if (speaker) {
        const { error } = await supabase
          .from('speakers')
          .update({
            name: data.name,
            title: data.title,
            bio: data.bio,
            image: data.image,
            email: data.email,
            social_links: data.socialLinks,
            event_id: eventForSpeaker
          }).eq('id', speaker.id);
        if (error) throw error;
        toast({ title: "Speaker updated", description: "Speaker updated." });
      } else {
        const { error } = await supabase
          .from('speakers')
          .insert({
            name: data.name,
            title: data.title,
            bio: data.bio,
            image: data.image,
            email: data.email,
            social_links: data.socialLinks,
            event_id: eventForSpeaker
          });
        if (error) throw error;
        toast({ title: "Speaker added", description: "Speaker added." });
      }
      onSpeakerUpdated();
      onClose();
      form.reset();
    } catch (error: any) {
      console.error("Speaker save error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save speaker.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-modal sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {speaker ? 'Edit Speaker' : 'Add New Speaker'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Speaker name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Speaker title/position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Speaker biography" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Speaker image URL" {...field} />
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
                  <FormLabel className="text-white">Speaker Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Social Links (JSON)</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. {"linkedin": "..."}' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="text-white">Event</FormLabel>
              <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map(ev => (
                    <SelectItem key={ev.id} value={String(ev.id)}>
                      {ev.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-eventPrimary hover:bg-eventSecondary">
                {speaker ? 'Update Speaker' : 'Add Speaker'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
