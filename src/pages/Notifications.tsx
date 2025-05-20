
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
  username: string;
  avatar: string;
  content: string;
  postImage?: string;
  timestamp: Date;
  read: boolean;
}

const Notifications = () => {
  // Mock notifications
  const generateMockNotifications = (): Notification[] => {
    const now = new Date();
    
    return [
      {
        id: '1',
        type: 'like',
        username: 'cyberghost',
        avatar: 'https://source.unsplash.com/random/200x200?face&sig=10',
        content: 'liked your post',
        postImage: 'https://source.unsplash.com/random/300x300?cyberpunk&sig=101',
        timestamp: new Date(now.getTime() - 15 * 60000), // 15 minutes ago
        read: false
      },
      {
        id: '2',
        type: 'comment',
        username: 'neonrider',
        avatar: 'https://source.unsplash.com/random/200x200?face&sig=20',
        content: 'commented: "This is amazing! Love the aesthetic."',
        postImage: 'https://source.unsplash.com/random/300x300?cyberpunk&sig=102',
        timestamp: new Date(now.getTime() - 45 * 60000), // 45 minutes ago
        read: true
      },
      {
        id: '3',
        type: 'follow',
        username: 'glitch404',
        avatar: 'https://source.unsplash.com/random/200x200?face&sig=30',
        content: 'started following you',
        timestamp: new Date(now.getTime() - 2 * 3600000), // 2 hours ago
        read: false
      },
      {
        id: '4',
        type: 'system',
        username: 'system',
        avatar: '',
        content: 'Welcome to PixelSocial! Complete your profile to get started.',
        timestamp: new Date(now.getTime() - 24 * 3600000), // 1 day ago
        read: true
      },
      {
        id: '5',
        type: 'mention',
        username: 'pixelwarrior',
        avatar: 'https://source.unsplash.com/random/200x200?face&sig=40',
        content: 'mentioned you in a comment: "@user check this out!"',
        postImage: 'https://source.unsplash.com/random/300x300?cyberpunk&sig=103',
        timestamp: new Date(now.getTime() - 3 * 24 * 3600000), // 3 days ago
        read: true
      },
    ];
  };
  
  const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications());
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-pixel text-2xl">Notifications</h1>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="font-mono text-sm text-terminal-green hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="w-full mb-6 grid grid-cols-4 border border-terminal-green/50">
                <TabsTrigger value="all" className="font-mono">
                  All
                  {unreadCount > 0 && (
                    <span className="ml-2 bg-terminal-green text-terminal-black text-xs px-1.5 py-0.5">{unreadCount}</span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="likes" className="font-mono">Likes</TabsTrigger>
                <TabsTrigger value="comments" className="font-mono">Comments</TabsTrigger>
                <TabsTrigger value="follows" className="font-mono">Follows</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-1">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border ${notification.read ? 'border-terminal-green/20 bg-background' : 'border-terminal-green/50 bg-muted'} hover:bg-muted/80 cursor-pointer transition-colors`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        {notification.type !== 'system' ? (
                          <Avatar className="h-10 w-10 rounded-none border border-terminal-green/50">
                            <AvatarImage src={notification.avatar} alt={notification.username} />
                            <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none">
                              {getInitials(notification.username)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-none border border-terminal-green/50 bg-terminal-black flex items-center justify-center">
                            <span className="font-pixel text-terminal-green text-xs">SYS</span>
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              {notification.type !== 'system' && (
                                <Link to={`/profile/${notification.username}`} className="font-mono text-sm text-terminal-green hover:underline">
                                  @{notification.username}
                                </Link>
                              )}
                              <p className="font-mono text-sm">
                                {notification.content}
                              </p>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          
                          {notification.postImage && (
                            <div className="mt-2">
                              <img 
                                src={notification.postImage} 
                                alt="Post" 
                                className="h-14 w-14 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="likes">
                <div className="space-y-1">
                  {notifications
                    .filter(notif => notif.type === 'like')
                    .map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border ${notification.read ? 'border-terminal-green/20 bg-background' : 'border-terminal-green/50 bg-muted'} hover:bg-muted/80 cursor-pointer transition-colors`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10 rounded-none border border-terminal-green/50">
                            <AvatarImage src={notification.avatar} alt={notification.username} />
                            <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none">
                              {getInitials(notification.username)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link to={`/profile/${notification.username}`} className="font-mono text-sm text-terminal-green hover:underline">
                                  @{notification.username}
                                </Link>
                                <p className="font-mono text-sm">
                                  {notification.content}
                                </p>
                              </div>
                              <span className="font-mono text-xs text-muted-foreground">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            {notification.postImage && (
                              <div className="mt-2">
                                <img 
                                  src={notification.postImage} 
                                  alt="Post" 
                                  className="h-14 w-14 object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {notifications.filter(notif => notif.type === 'like').length === 0 && (
                      <div className="h-32 flex items-center justify-center border border-dashed border-terminal-green/30">
                        <p className="font-mono text-muted-foreground">No like notifications</p>
                      </div>
                    )}
                </div>
              </TabsContent>
              
              <TabsContent value="comments">
                <div className="space-y-1">
                  {notifications
                    .filter(notif => notif.type === 'comment' || notif.type === 'mention')
                    .map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border ${notification.read ? 'border-terminal-green/20 bg-background' : 'border-terminal-green/50 bg-muted'} hover:bg-muted/80 cursor-pointer transition-colors`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10 rounded-none border border-terminal-green/50">
                            <AvatarImage src={notification.avatar} alt={notification.username} />
                            <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none">
                              {getInitials(notification.username)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link to={`/profile/${notification.username}`} className="font-mono text-sm text-terminal-green hover:underline">
                                  @{notification.username}
                                </Link>
                                <p className="font-mono text-sm">
                                  {notification.content}
                                </p>
                              </div>
                              <span className="font-mono text-xs text-muted-foreground">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            {notification.postImage && (
                              <div className="mt-2">
                                <img 
                                  src={notification.postImage} 
                                  alt="Post" 
                                  className="h-14 w-14 object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {notifications.filter(notif => notif.type === 'comment' || notif.type === 'mention').length === 0 && (
                      <div className="h-32 flex items-center justify-center border border-dashed border-terminal-green/30">
                        <p className="font-mono text-muted-foreground">No comment notifications</p>
                      </div>
                    )}
                </div>
              </TabsContent>
              
              <TabsContent value="follows">
                <div className="space-y-1">
                  {notifications
                    .filter(notif => notif.type === 'follow')
                    .map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 border ${notification.read ? 'border-terminal-green/20 bg-background' : 'border-terminal-green/50 bg-muted'} hover:bg-muted/80 cursor-pointer transition-colors`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10 rounded-none border border-terminal-green/50">
                            <AvatarImage src={notification.avatar} alt={notification.username} />
                            <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none">
                              {getInitials(notification.username)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link to={`/profile/${notification.username}`} className="font-mono text-sm text-terminal-green hover:underline">
                                  @{notification.username}
                                </Link>
                                <p className="font-mono text-sm">
                                  {notification.content}
                                </p>
                              </div>
                              <span className="font-mono text-xs text-muted-foreground">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {notifications.filter(notif => notif.type === 'follow').length === 0 && (
                      <div className="h-32 flex items-center justify-center border border-dashed border-terminal-green/30">
                        <p className="font-mono text-muted-foreground">No follow notifications</p>
                      </div>
                    )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <TerminalNotifications />
      </div>
    </div>
  );
};

export default Notifications;
