
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, Home, Menu, Search, User, X, Plus } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      className="sticky top-0 z-50 glass-card border-b border-terminal-green/30 shadow-md backdrop-blur-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-pixel text-2xl text-terminal-green">
              &gt;_PixelSocial
              <span className="terminal-cursor"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center gap-2 text-foreground hover:text-terminal-green transition-all duration-200 hover:scale-105">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/explore" className="flex items-center gap-2 text-foreground hover:text-terminal-green transition-all duration-200 hover:scale-105">
                <Search size={20} />
                <span>Explore</span>
              </Link>
              <Link to="/notifications" className="flex items-center gap-2 text-foreground hover:text-terminal-green transition-all duration-200 hover:scale-105">
                <Bell size={20} />
                <span>Notifications</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-2 text-foreground hover:text-terminal-green transition-all duration-200 hover:scale-105">
                <User size={20} />
                <span>Profile</span>
              </Link>
              <ThemeToggle />
              <Button variant="outline" className="neon-outline pulse-effect" asChild>
                <Link to="/create">
                  <Plus className="mr-2" size={16} />
                  New Post
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="neon-outline"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div 
              className="mt-4 pb-4 space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to="/" 
                className="flex items-center gap-2 p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link 
                to="/explore" 
                className="flex items-center gap-2 p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search size={20} />
                <span>Explore</span>
              </Link>
              <Link 
                to="/notifications" 
                className="flex items-center gap-2 p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <Button variant="outline" className="w-full neon-outline" asChild>
                <Link to="/create" onClick={() => setIsMenuOpen(false)}>
                  <Plus className="mr-2" size={16} />
                  New Post
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
