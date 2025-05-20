
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [reaction, setReaction] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setReaction(null);
    } else {
      setLikesCount(prev => prev + 1);
      setReaction('❤️');
    }
    setIsLiked(!isLiked);
  };

  const setEmoji = (emoji: string) => {
    setReaction(emoji);
    setLikesCount(prev => isLiked ? prev : prev + 1);
    setIsLiked(true);
    setShowReactions(false);
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

  const reactions = ['❤️', '🔥', '👍', '👏', '😂', '😮'];

  return (
    <>
      <motion.div 
        className="terminal-card glass-card overflow-hidden mb-6 hover-tilt"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Post Header */}
        <div className="p-3 flex items-center justify-between border-b border-terminal-green/30">
          <Link to={`/profile/${post.username}`} className="flex items-center gap-2">
            <div className={`relative ${Math.random() > 0.5 ? 'profile-border-active' : ''}`}>
              <Avatar className="h-8 w-8 rounded-lg border border-terminal-green/50">
                <AvatarImage src={post.avatarUrl} alt={post.username} />
                <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-lg">
                  {getInitials(post.username)}
                </AvatarFallback>
              </Avatar>
            </div>
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
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-2 ${isLiked ? 'text-terminal-red' : ''}`}
                onClick={() => setShowReactions(!showReactions)}
                onMouseEnter={() => setShowReactions(true)}
              >
                <Heart size={18} className={isLiked ? 'fill-terminal-red' : ''} />
                <motion.span 
                  className="font-mono text-sm flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {reaction && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mr-1"
                    >
                      {reaction}
                    </motion.span>
                  )}
                  {likesCount}
                </motion.span>
              </Button>
              
              {/* Emoji reactions panel */}
              <AnimatePresence>
                {showReactions && (
                  <motion.div 
                    className="absolute bottom-full left-0 mb-2 p-1 bg-card border border-terminal-green/30 shadow-lg rounded-lg flex gap-1 z-10"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    onMouseLeave={() => setShowReactions(false)}
                  >
                    {reactions.map(emoji => (
                      <motion.button 
                        key={emoji}
                        className="emoji-reaction"
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setEmoji(emoji)}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
      </motion.div>
      
      {/* Post Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 rounded-lg border border-terminal-green bg-card glass-card">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Image part */}
            <div className="bg-black flex items-center">
              <motion.img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full h-auto"
                initial={{ filter: "blur(10px)", opacity: 0.5 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Comments part */}
            <div className="flex flex-col h-full">
              {/* Post Header */}
              <DialogHeader className="p-4 border-b border-terminal-green/30">
                <div className="flex items-center gap-3">
                  <div className={`relative ${Math.random() > 0.5 ? 'profile-border-active' : ''}`}>
                    <Avatar className="h-8 w-8 rounded-lg border border-terminal-green/50">
                      <AvatarImage src={post.avatarUrl} alt={post.username} />
                      <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-lg">
                        {getInitials(post.username)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
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
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Avatar className="h-6 w-6 rounded-lg">
                        <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-lg text-xs">
                          CG
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-mono text-terminal-green">@cyberghost</p>
                        <p className="text-sm font-mono">This is amazing! Great work!</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Avatar className="h-6 w-6 rounded-lg">
                        <AvatarFallback className="bg-terminal-black border border-terminal-green text-terminal-green rounded-lg text-xs">
                          NR
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-mono text-terminal-green">@neonrider</p>
                        <p className="text-sm font-mono">I love the aesthetic. Very cyberpunk!</p>
                      </div>
                    </motion.div>
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
                    <motion.div
                      animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart size={18} className={isLiked ? 'fill-terminal-red' : ''} />
                    </motion.div>
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
