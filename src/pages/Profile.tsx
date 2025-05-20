
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock user data
  const mockUser = {
    username: username || 'cyberghost',
    displayName: username ? `${username.charAt(0).toUpperCase()}${username.slice(1)}` : 'Cyber Ghost',
    bio: 'Digital artist and cyberpunk enthusiast. Creating glitch art and pixel animations since 2077.',
    followers: 1024,
    following: 512,
    posts: 42,
    avatarUrl: 'https://source.unsplash.com/random/200x200?face&sig=1'
  };
  
  // Generate mock posts
  const generateMockPosts = () => {
    const posts = [];
    
    for (let i = 0; i < 9; i++) {
      posts.push({
        id: `profile-${i}`,
        imageUrl: `https://source.unsplash.com/random/600x600?cyberpunk&sig=${i + 200}`,
      });
    }
    
    return posts;
  };
  
  const userPosts = generateMockPosts();
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            {/* Profile header */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-32 w-32 rounded-none border-2 border-terminal-green">
                    <AvatarImage src={mockUser.avatarUrl} alt={mockUser.username} />
                    <AvatarFallback className="bg-terminal-black text-terminal-green text-4xl">
                      {mockUser.displayName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-terminal-green animate-terminal-blink"></div>
                </div>
                
                {/* Profile info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-pixel text-2xl mb-2 text-terminal-green">@{mockUser.username}</h1>
                  <h2 className="font-mono text-lg mb-3">{mockUser.displayName}</h2>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <div className="text-center">
                      <span className="font-pixel text-xl">{mockUser.posts}</span>
                      <p className="font-mono text-xs text-muted-foreground">POSTS</p>
                    </div>
                    <div className="text-center">
                      <span className="font-pixel text-xl">{mockUser.followers}</span>
                      <p className="font-mono text-xs text-muted-foreground">FOLLOWERS</p>
                    </div>
                    <div className="text-center">
                      <span className="font-pixel text-xl">{mockUser.following}</span>
                      <p className="font-mono text-xs text-muted-foreground">FOLLOWING</p>
                    </div>
                  </div>
                  
                  <p className="font-mono text-sm mb-4 max-w-lg">{mockUser.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button 
                      variant={isFollowing ? 'outline' : 'default'}
                      className={isFollowing ? 'neon-outline' : 'bg-terminal-green text-terminal-black'}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button variant="outline" className="neon-outline">
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile tabs */}
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full mb-6 grid grid-cols-3 border border-terminal-green/50">
                <TabsTrigger value="posts" className="font-mono">Posts</TabsTrigger>
                <TabsTrigger value="saved" className="font-mono">Saved</TabsTrigger>
                <TabsTrigger value="tagged" className="font-mono">Tagged</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts">
                <div className="grid grid-cols-3 gap-1">
                  {userPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="aspect-square relative overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-2">
                          <span className="font-mono text-white text-xs">View post</span>
                        </div>
                      </div>
                      <img 
                        src={post.imageUrl} 
                        alt="Post"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saved">
                <div className="h-40 flex items-center justify-center border border-dashed border-terminal-green/30">
                  <p className="font-mono text-muted-foreground">No saved posts yet</p>
                </div>
              </TabsContent>
              
              <TabsContent value="tagged">
                <div className="h-40 flex items-center justify-center border border-dashed border-terminal-green/30">
                  <p className="font-mono text-muted-foreground">No tagged posts yet</p>
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

export default Profile;
