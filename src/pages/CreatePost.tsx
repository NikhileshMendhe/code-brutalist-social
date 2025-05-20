
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error('Please select an image for your post');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('Post created successfully!');
      setIsSubmitting(false);
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6 max-w-lg">
            <h1 className="font-pixel text-2xl mb-6 text-terminal-green">Create New Post</h1>
            
            <form onSubmit={handleSubmit}>
              {/* Image upload area */}
              <div className="mb-6">
                <label className="block font-mono text-sm mb-2">Upload Image</label>
                
                {!imagePreview ? (
                  <div 
                    className="border-2 border-dashed border-terminal-green/50 h-64 rounded-none flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="font-mono text-sm text-muted-foreground">Click to upload an image</p>
                    <p className="font-mono text-xs text-muted-foreground mt-1">JPG, PNG, GIF up to 5MB</p>
                  </div>
                ) : (
                  <div className="relative h-64 border border-terminal-green/50">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-none"
                      onClick={handleRemoveImage}
                      type="button"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
                
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              {/* Caption input */}
              <div className="mb-6">
                <label htmlFor="caption" className="block font-mono text-sm mb-2">Caption</label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="terminal-input"
                  rows={4}
                />
              </div>
              
              {/* Tags input */}
              <div className="mb-6">
                <label htmlFor="tags" className="block font-mono text-sm mb-2">Tags</label>
                <Input
                  id="tags"
                  placeholder="#cyberpunk #glitch #digital"
                  className="terminal-input"
                />
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  Separate tags with spaces
                </p>
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !imagePreview}
                  className={`bg-terminal-green text-terminal-black ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  {isSubmitting ? 'Uploading...' : 'Share Post'}
                </Button>
              </div>
            </form>
          </div>
        </main>
        
        <TerminalNotifications />
      </div>
    </div>
  );
};

export default CreatePost;
