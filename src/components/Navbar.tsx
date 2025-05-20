
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, Home, Menu, Search, User, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-terminal-green/30 shadow-sm backdrop-blur-sm">
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
              <Link to="/" className="flex items-center gap-2 text-foreground hover:text-terminal-green">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/explore" className="flex items-center gap-2 text-foreground hover:text-terminal-green">
                <Search size={20} />
                <span>Explore</span>
              </Link>
              <Link to="/notifications" className="flex items-center gap-2 text-foreground hover:text-terminal-green">
                <Bell size={20} />
                <span>Notifications</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-2 text-foreground hover:text-terminal-green">
                <User size={20} />
                <span>Profile</span>
              </Link>
              <ThemeToggle />
              <Button variant="outline" className="neon-outline" asChild>
                <Link to="/create">+ New Post</Link>
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
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 pb-4 space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/explore" 
              className="flex items-center gap-2 p-2 text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={20} />
              <span>Explore</span>
            </Link>
            <Link 
              to="/notifications" 
              className="flex items-center gap-2 p-2 text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 p-2 text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Button variant="outline" className="w-full neon-outline" asChild>
              <Link to="/create" onClick={() => setIsMenuOpen(false)}>+ New Post</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
