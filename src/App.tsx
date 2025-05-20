
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import pages
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import CreatePost from "./pages/CreatePost";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Mock auth state (in a real app, this would come from a context or store)
const isLoggedIn = true;

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={!isLoggedIn ? <Auth /> : <Navigate to="/" />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/explore" element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/:username" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            } />
            <Route path="/create/story" element={
              <ProtectedRoute>
                <CreatePost type="story" />
              </ProtectedRoute>
            } />
            <Route path="/create/album" element={
              <ProtectedRoute>
                <CreatePost type="album" />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
