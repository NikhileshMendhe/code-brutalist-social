
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export interface PostProps {
  id: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: Date;
}

const PostCard = ({ post }: { post: PostProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div className="terminal-card rounded-none overflow-hidden mb-6">
        {/* Post Header */}
        <div className="p-3 flex items-center justify-between border-b border-terminal-green/30">
          <Link to={`/profile/${post.username}`} className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-none border border-terminal-green/50">
              <AvatarImage src={post.avatarUrl} alt={post.username} />
              <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none">
                {getInitials(post.username)}
              </AvatarFallback>
            </Avatar>
            <span className="font-mono text-sm hover:text-terminal-green transition-colors">
              @{post.username}
            </span>
          </Link>
          <span className="text-muted-foreground text-xs font-mono">
            {formatTime(post.timestamp)}
          </span>
        </div>
        
        {/* Post Image */}
        <div 
          className="cursor-pointer relative"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
            <div className="p-4">
              <span className="font-mono text-white text-sm">Click to expand...</span>
            </div>
          </div>
          <img 
            src={post.imageUrl} 
            alt={post.caption} 
            className="w-full object-cover aspect-square" 
            loading="lazy"
          />
        </div>
        
        {/* Post Actions */}
        <div className="p-3 border-t border-terminal-green/30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-2 ${isLiked ? 'text-terminal-red' : ''}`}
              onClick={handleLike}
            >
              <Heart size={18} className={isLiked ? 'fill-terminal-red' : ''} />
              <span className="font-mono text-sm">{likesCount}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageCircle size={18} />
              <span className="font-mono text-sm">{post.comments}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Share size={18} />
              <span className="font-mono text-sm">Share</span>
            </Button>
          </div>
          
          {/* Caption */}
          <div className="mt-2">
            <p className="font-mono text-sm">
              <Link to={`/profile/${post.username}`} className="font-medium text-terminal-green">
                @{post.username}
              </Link>
              <span className="ml-2">{post.caption}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Post Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 rounded-none border border-terminal-green bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Image part */}
            <div className="bg-black flex items-center">
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full h-auto"
              />
            </div>
            
            {/* Comments part */}
            <div className="flex flex-col h-full">
              {/* Post Header */}
              <DialogHeader className="p-4 border-b border-terminal-green/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-none border border-terminal-green/50">
                    <AvatarImage src={post.avatarUrl} alt={post.username} />
                    <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none">
                      {getInitials(post.username)}
                    </AvatarFallback>
                  </Avatar>
                  <DialogTitle className="font-mono text-base m-0">
                    @{post.username}
                  </DialogTitle>
                </div>
              </DialogHeader>
              
              {/* Comments section */}
              <div className="flex-1 overflow-y-auto p-4">
                <p className="font-mono text-sm mb-4">{post.caption}</p>
                
                <div className="mt-6">
                  <h3 className="font-mono text-xs uppercase text-muted-foreground mb-2">Comments</h3>
                  
                  {/* Mock comments */}
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6 rounded-none">
                        <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none text-xs">
                          CG
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-mono text-terminal-green">@cyberghost</p>
                        <p className="text-sm font-mono">This is amazing! Great work!</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6 rounded-none">
                        <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-none text-xs">
                          NR
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-mono text-terminal-green">@neonrider</p>
                        <p className="text-sm font-mono">I love the aesthetic. Very cyberpunk!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="p-4 border-t border-terminal-green/30">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-2 ${isLiked ? 'text-terminal-red' : ''}`}
                    onClick={handleLike}
                  >
                    <Heart size={18} className={isLiked ? 'fill-terminal-red' : ''} />
                    <span className="font-mono text-sm">{likesCount}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    <span className="font-mono text-sm">{post.comments}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share size={18} />
                    <span className="font-mono text-sm">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
