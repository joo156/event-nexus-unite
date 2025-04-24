
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNotifications } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/context/EventContext';
import { formatDistanceToNow } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const NotificationsDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const { events } = useEvents();
  
  // Find live event
  const liveEvent = events.find(event => event.id === 99999);
  const [liveNotificationShown, setLiveNotificationShown] = useState(false);
  
  useEffect(() => {
    // Check if the live event notification should be shown
    if (liveEvent && !liveNotificationShown) {
      const liveEventStartTime = new Date(liveEvent.date + " " + liveEvent.time);
      const currentTime = new Date();
      
      // If the live event is starting within the next minute or has just started
      if (
        liveEventStartTime > currentTime && 
        liveEventStartTime.getTime() - currentTime.getTime() < 60000
      ) {
        const timeUntilEvent = liveEventStartTime.getTime() - currentTime.getTime();
        
        setTimeout(() => {
          // Add notification when event starts
          setLiveNotificationShown(true);
        }, timeUntilEvent);
      }
    }
  }, [liveEvent, liveNotificationShown]);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return '🎟️';
      case 'proposal':
        return '🎤';
      case 'contact':
        return '📧';
      case 'update':
        return '🔔';
      default:
        return '📣';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-eventPrimary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                    !notification.read && "bg-blue-50/50"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm", !notification.read && "font-medium")}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No notifications yet</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
