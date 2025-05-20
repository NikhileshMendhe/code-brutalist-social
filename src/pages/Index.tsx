
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import InfiniteScrollFeed from '@/components/InfiniteScrollFeed';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Plus, Image, ImagePlus, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Index = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [activeThemeColor, setActiveThemeColor] = useState('green');

  useEffect(() => {
    // Show floating button after a short delay
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Array of color themes the user can select
  const themeColors = [
    { name: 'green', class: 'bg-terminal-green' },
    { name: 'blue', class: 'bg-terminal-blue' },
    { name: 'purple', class: 'bg-terminal-purple' },
    { name: 'pink', class: 'bg-terminal-pink' },
    { name: 'yellow', class: 'bg-terminal-yellow' }
  ];

  const changeThemeColor = (colorName) => {
    setActiveThemeColor(colorName);
    // You could store this in localStorage or a context for app-wide theme
    document.documentElement.setAttribute('data-theme-color', colorName);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Theme color selector */}
      <div className="fixed top-20 right-6 z-40">
        <div className="bg-card glass-card p-2 rounded-lg shadow-lg">
          <div className="flex flex-col gap-2">
            {themeColors.map((color) => (
              <button
                key={color.name}
                className={`w-6 h-6 rounded-full ${color.class} ${
                  activeThemeColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                }`}
                onClick={() => changeThemeColor(color.name)}
                title={`${color.name} theme`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <InfiniteScrollFeed />
        </main>
        <TerminalNotifications />

        {/* Enhanced floating action button for mobile */}
        <AnimatedFloatingButton show={showButton} navigate={navigate} />
      </div>
    </div>
  );
};

const AnimatedFloatingButton = ({ show, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: '0 0 25px var(--color-terminal-green)'
    }
  };

  const optionsVariants = {
    closed: {
      opacity: 0,
      y: 0,
      transition: {
        staggerDirection: -1,
        staggerChildren: 0.05,
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const optionVariants = {
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  const handleOptionClick = (route) => {
    setIsOpen(false);
    navigate(route);
  };

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-40"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={buttonVariants}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <motion.button
              className="floating-action-button"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Plus size={24} />
            </motion.button>
          </PopoverTrigger>
          <PopoverContent className="glass-card border border-terminal-green/30 p-2 w-auto" sideOffset={5}>
            <motion.div 
              className="flex flex-col gap-2"
              variants={optionsVariants}
              initial="closed"
              animate="open"
            >
              <motion.button 
                className="flex items-center gap-2 p-2 hover:bg-terminal-green/20 rounded transition-colors text-left"
                onClick={() => handleOptionClick('/create')}
                variants={optionVariants}
              >
                <ImagePlus size={18} />
                <span>Create Post</span>
              </motion.button>
              
              <motion.button 
                className="flex items-center gap-2 p-2 hover:bg-terminal-green/20 rounded transition-colors text-left"
                onClick={() => handleOptionClick('/create/story')}
                variants={optionVariants}
              >
                <Camera size={18} />
                <span>Add Story</span>
              </motion.button>
              
              <motion.button 
                className="flex items-center gap-2 p-2 hover:bg-terminal-green/20 rounded transition-colors text-left"
                onClick={() => handleOptionClick('/create/album')}
                variants={optionVariants}
              >
                <Image size={18} />
                <span>Create Album</span>
              </motion.button>
            </motion.div>
          </PopoverContent>
        </Popover>
      </motion.div>
    </>
  );
};

export default Index;
