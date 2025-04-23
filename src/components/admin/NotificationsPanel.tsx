
import { Button } from "@/components/ui/button";
import { X, Bell, Check } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    clearNotifications 
  } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return <div className="bg-green-900/20 p-2 rounded-full"><Check className="h-4 w-4 text-green-500" /></div>;
      case 'proposal':
        return <div className="bg-blue-900/20 p-2 rounded-full"><Bell className="h-4 w-4 text-blue-500" /></div>;
      case 'contact':
        return <div className="bg-orange-900/20 p-2 rounded-full"><Bell className="h-4 w-4 text-orange-500" /></div>;
      default:
        return <div className="bg-eventPrimary/20 p-2 rounded-full"><Bell className="h-4 w-4 text-eventPrimary" /></div>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white">Notifications</h2>
          <p className="text-sm text-gray-400">{unreadCount} unread</p>
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm border-white/10 text-white hover:bg-secondary"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white hover:bg-secondary"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-white/10">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 cursor-pointer hover:bg-secondary/70 ${!notification.read ? 'bg-secondary/30' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-grow">
                    <h4 className={`font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                      {notification.title}
                    </h4>
                    <p className={`text-sm ${!notification.read ? 'text-gray-300' : 'text-gray-400'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-eventPrimary"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-secondary/50 p-4 rounded-full mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-400">No notifications yet</p>
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-sm border-white/10 text-white hover:bg-secondary"
            onClick={clearNotifications}
          >
            Clear all notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
