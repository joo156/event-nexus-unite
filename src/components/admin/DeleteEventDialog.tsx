
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteEventDialogProps {
  eventTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteEventDialog = ({ eventTitle, onConfirm, onCancel }: DeleteEventDialogProps) => {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="p-3 rounded-full bg-red-900/20 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Delete Event</h3>
        <p className="text-center text-gray-300">
          Are you sure you want to delete <span className="font-medium text-white">{eventTitle}</span>?
        </p>
        <div className="mt-3 text-center">
          <p className="text-red-400 text-sm font-medium">
            This action is permanent and cannot be undone.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            The event will be removed from the homepage, event listings, and all user registrations.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center space-x-3">
        <Button 
          variant="outline"
          className="border-white/10 text-white hover:bg-secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onConfirm}
        >
          Delete Event
        </Button>
      </div>
    </div>
  );
};

export default DeleteEventDialog;
