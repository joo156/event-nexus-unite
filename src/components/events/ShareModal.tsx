
import { useState } from "react";
import { X, Copy, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  event: {
    id: number;
    title: string;
    date: string;
    image: string;
  };
}

const ShareModal = ({ event }: ShareModalProps) => {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const eventUrl = `${window.location.origin}/events/${event.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Join me at ${event.title}`);
    const body = encodeURIComponent(
      `I thought you might be interested in this event:\n\n${event.title}\nDate: ${event.date}\n\nLearn more and register here: ${eventUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Join me at ${event.title} on ${event.date}! Learn more and register here: ${eventUrl}`
    );
    window.open(`https://wa.me/?text=${text}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Share This Event</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white hover:bg-secondary"
          onClick={() => closeModal("share")}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-300 mb-4">Share this event with your friends and colleagues</p>
        
        <div className="flex space-x-2">
          <Input 
            value={eventUrl} 
            readOnly 
            className="dark-input"
          />
          <Button 
            onClick={handleCopyLink}
            variant="outline"
            className={`${copied ? 'bg-green-900/20 text-green-500' : 'bg-secondary/50 text-white'}`}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm text-gray-400 mb-2">Share via</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="bg-secondary/50 border-white/10 text-white hover:bg-secondary w-full"
            onClick={handleEmailShare}
          >
            <Mail className="mr-2 h-4 w-4" /> Email
          </Button>
          
          <Button
            variant="outline"
            className="bg-secondary/50 border-white/10 text-white hover:bg-secondary w-full"
            onClick={handleWhatsAppShare}
          >
            <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
