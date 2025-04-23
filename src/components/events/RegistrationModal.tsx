
import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";

interface RegistrationModalProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    image: string;
  };
  onRegister: () => Promise<boolean>;
}

const RegistrationModal = ({ event, onRegister }: RegistrationModalProps) => {
  const { closeModal } = useModal();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      const success = await onRegister();
      if (success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="p-6">
      {!isSuccess ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Register for Event</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-secondary"
              onClick={() => closeModal("register")}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mb-6">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-40 object-cover rounded-lg mb-4" 
            />
            
            <h4 className="text-lg font-semibold text-white mb-1">{event.title}</h4>
            <p className="text-gray-300">{event.date} at {event.time}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-300">
              By registering, you'll secure your spot for this event. You'll receive event details and updates via email.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              className="border-white/10 text-white hover:bg-secondary"
              onClick={() => closeModal("register")}
            >
              Cancel
            </Button>
            <Button 
              className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? "Registering..." : "Confirm Registration"}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Registration Successful!</h3>
          
          <p className="text-gray-300 mb-6">
            You've successfully registered for "{event.title}". We've sent a confirmation to your email address.
          </p>
          
          <Button 
            className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
            onClick={() => closeModal("register")}
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegistrationModal;
