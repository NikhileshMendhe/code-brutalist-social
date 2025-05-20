
import React, { useState, useEffect } from 'react';
import { Terminal, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type Notification = {
  id: string;
  message: string;
  timestamp: Date;
};

const TerminalNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock notifications for demo purposes
  useEffect(() => {
    const demoNotifications = [
      { id: '1', message: 'User @hackerman liked your post', timestamp: new Date() },
      { id: '2', message: 'System: New version v0.1.3 deployed', timestamp: new Date(Date.now() - 120000) },
      { id: '3', message: 'User @glitchqueen started following you', timestamp: new Date(Date.now() - 300000) }
    ];
    
    setNotifications(demoNotifications);
    
    // Add a new notification every 30 seconds
    const interval = setInterval(() => {
      const newNotification = {
        id: Math.random().toString(36).substr(2, 9),
        message: `User @${getRandomUsername()} ${getRandomAction()}`,
        timestamp: new Date()
      };
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getRandomUsername = () => {
    const usernames = ['pixelwarrior', 'cybermonk', 'neonsamurai', 'glitch404', 'hackermind'];
    return usernames[Math.floor(Math.random() * usernames.length)];
  };
  
  const getRandomAction = () => {
    const actions = ['liked your post', 'commented on your photo', 'started following you', 'shared your post', 'mentioned you'];
    return actions[Math.floor(Math.random() * actions.length)];
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div 
        className={cn(
          "bg-card border-t border-terminal-green/30 transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-10"
        )}
      >
        {/* Terminal header */}
        <div 
          className="px-4 py-2 flex items-center justify-between cursor-pointer bg-muted border-b border-terminal-green/30"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-terminal-green" />
            <span className="font-mono text-xs">terminal_notifications.sh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </span>
            <span className="font-mono text-xs">{isOpen ? '[−]' : '[+]'}</span>
          </div>
        </div>
        
        {/* Notifications list */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="px-4 py-2 flex items-center justify-between hover:bg-muted/50 border-b border-muted"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-terminal-green">[{formatTime(notification.timestamp)}]</span>
                <span className="font-mono text-sm">{notification.message}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => removeNotification(notification.id)}
              >
                <X size={12} />
              </Button>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="px-4 py-4 text-center">
              <span className="font-mono text-sm text-muted-foreground">No notifications</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalNotifications;
