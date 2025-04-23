
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
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Delete Event</h3>
        <p className="text-center text-gray-300">
          Are you sure you want to delete <span className="font-medium text-white">{eventTitle}</span>?
          This action cannot be undone.
        </p>
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
