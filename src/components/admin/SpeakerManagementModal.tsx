
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type SpeakerFormData = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

type SpeakerManagementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
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
    defaultValues: {
      name: speaker?.name || '',
      title: speaker?.title || '',
      bio: speaker?.bio || '',
      image: speaker?.image || '',
    }
  });

  const onSubmit = async (data: SpeakerFormData) => {
    try {
      if (speaker) {
        // Update existing speaker
        const { error } = await supabase
          .from('speakers')
          .update(data)
          .eq('id', speaker.id);

        if (error) throw error;
        
        toast({
          title: "Speaker updated",
          description: "The speaker has been successfully updated.",
        });
      } else {
        // Create new speaker
        const { error } = await supabase
          .from('speakers')
          .insert([{ ...data, event_id: eventId }]);

        if (error) throw error;
        
        toast({
          title: "Speaker added",
          description: "The new speaker has been successfully added.",
        });
      }

      onSpeakerUpdated();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save speaker.",
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
