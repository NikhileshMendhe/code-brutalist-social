
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import InfiniteScrollFeed from '@/components/InfiniteScrollFeed';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show floating button after a short delay
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <InfiniteScrollFeed />
        </main>
        <TerminalNotifications />

        {/* Floating action button for mobile */}
        <AnimatedFloatingButton show={showButton} onClick={() => navigate('/create')} />
      </div>
    </div>
  );
};

const AnimatedFloatingButton = ({ show, onClick }: { show: boolean, onClick: () => void }) => {
  return (
    <motion.button
      className="floating-action-button"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: show ? 1 : 0,
        opacity: show ? 1 : 0
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: 90
      }}
      onClick={onClick}
    >
      <Plus size={24} />
    </motion.button>
  );
};

export default Index;
