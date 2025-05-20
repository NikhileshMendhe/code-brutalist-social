
import Navbar from '@/components/Navbar';
import InfiniteScrollFeed from '@/components/InfiniteScrollFeed';
import TerminalNotifications from '@/components/TerminalNotifications';

const Index = () => {
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
      </div>
    </div>
  );
};

export default Index;
