
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Explore = () => {
  const [view, setView] = useState<'grid' | 'zine'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Generate mock explore data
  const generateMockPosts = () => {
    const posts = [];
    
    for (let i = 0; i < 24; i++) {
      posts.push({
        id: `explore-${i}`,
        imageUrl: `https://source.unsplash.com/random/600x600?cyberpunk&sig=${i + 100}`,
      });
    }
    
    return posts;
  };
  
  const explorePosts = generateMockPosts();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            {/* Search and view controls */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search posts, users, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 terminal-input bg-card"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={view === 'grid' ? 'default' : 'outline'}
                    onClick={() => setView('grid')}
                    className={view === 'grid' ? 'bg-terminal-green text-terminal-black' : 'neon-outline'}
                  >
                    Grid View
                  </Button>
                  <Button
                    variant={view === 'zine' ? 'default' : 'outline'}
                    onClick={() => setView('zine')}
                    className={view === 'zine' ? 'bg-terminal-green text-terminal-black' : 'neon-outline'}
                  >
                    Zine Mode
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Trending tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="font-mono text-sm text-muted-foreground">Trending:</span>
              {['#cyberpunk', '#glitchart', '#digitalart', '#pixelart', '#vaporwave', '#retrocomputing'].map(tag => (
                <span key={tag} className="terminal-badge cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Grid view */}
            {view === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                {explorePosts.map(post => (
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
                      alt="Explore post" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Zine view */}
            {view === 'zine' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {explorePosts.map((post, index) => {
                  const isFeature = index % 7 === 0;
                  return (
                    <div 
                      key={post.id} 
                      className={`${isFeature ? 'md:col-span-2 md:row-span-2' : ''} terminal-card cursor-pointer`}
                    >
                      <img 
                        src={post.imageUrl} 
                        alt="Explore post" 
                        className="w-full h-full object-cover"
                        loading="lazy" 
                      />
                      <div className="p-3 border-t border-terminal-green/30">
                        <div className="flex justify-between items-center">
                          <span className="font-pixel text-sm">PIXEL_ART_{index + 1}</span>
                          <span className="font-mono text-xs text-muted-foreground">ID:{post.id}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        
        <TerminalNotifications />
      </div>
    </div>
  );
};

export default Explore;
