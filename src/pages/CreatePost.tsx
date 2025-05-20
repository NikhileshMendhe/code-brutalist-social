
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TerminalNotifications from '@/components/TerminalNotifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image, Upload, X, Plus, Camera, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PostType = 'post' | 'story' | 'album';

interface CreatePostProps {
  type?: PostType;
}

const CreatePost = ({ type = 'post' }: CreatePostProps) => {
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set page title based on post type
    document.title = `Create New ${type.charAt(0).toUpperCase() + type.slice(1)} | PixelSocial`;
  }, [type]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newPreviews = [...imagePreview];
    
    Array.from(files).forEach(file => {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Please select only image files');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result as string);
        setImagePreview([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      const newPreviews = [...imagePreview];
      
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
          toast.error('Please drop only image files');
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Image size should be less than 5MB');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          setImagePreview([...newPreviews]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newPreviews = [...imagePreview];
    newPreviews.splice(index, 1);
    setImagePreview(newPreviews);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imagePreview.length === 0) {
      toast.error('Please select at least one image for your post');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`);
      setIsSubmitting(false);
      navigate('/');
    }, 2000);
  };

  const filters = [
    { id: 'none', name: 'Normal' },
    { id: 'retro', name: 'Retro' },
    { id: 'cyberpunk', name: 'Cyberpunk' },
    { id: 'synthwave', name: 'Synthwave' },
    { id: 'glitch', name: 'Glitch' }
  ];
  
  const getPageTitle = () => {
    switch (type) {
      case 'story': return 'Create New Story';
      case 'album': return 'Create New Photo Album';
      default: return 'Create New Post';
    }
  };

  const getMaxImages = () => {
    switch (type) {
      case 'story': return 1;
      case 'album': return 10;
      default: return 1;
    }
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
            <motion.h1 
              className="font-pixel text-2xl mb-6 text-terminal-green"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getPageTitle()}
            </motion.h1>
            
            <form onSubmit={handleSubmit}>
              {/* Image upload area */}
              <div className="mb-6">
                <label className="block font-mono text-sm mb-2">
                  Upload {type === 'album' ? 'Images' : 'Image'}
                  {imagePreview.length > 0 && type === 'album' && ` (${imagePreview.length}/${getMaxImages()})`}
                </label>
                
                {imagePreview.length === 0 ? (
                  <div 
                    className={`upload-area h-64 ${dragActive ? 'active' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <Image className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="font-mono text-sm text-muted-foreground">
                        {dragActive ? 'Drop your images here' : 'Click or drag images here to upload'}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground mt-1">
                        JPG, PNG, GIF up to 5MB {type === 'album' && `(Max ${getMaxImages()} images)`}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className={`${type === 'album' ? 'grid grid-cols-2 gap-2' : 'relative h-64'}`}>
                    {imagePreview.map((src, index) => (
                      <div 
                        key={index} 
                        className={`relative ${type !== 'album' ? 'h-full' : 'aspect-square'} border border-terminal-green/50 overflow-hidden group`}
                      >
                        <motion.img 
                          src={src} 
                          alt={`Preview ${index + 1}`}
                          className={`w-full h-full object-cover ${activeFilter ? `filter-${activeFilter}` : ''}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                          type="button"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                    
                    {type === 'album' && imagePreview.length < getMaxImages() && (
                      <div 
                        className="aspect-square border-2 border-dashed border-terminal-green/50 flex items-center justify-center cursor-pointer hover:bg-terminal-green/10 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Plus size={24} className="text-terminal-green" />
                      </div>
                    )}
                  </div>
                )}
                
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple={type === 'album'}
                  className="hidden"
                />
              </div>
              
              {/* Filter options */}
              {imagePreview.length > 0 && (
                <div className="mb-6">
                  <label className="block font-mono text-sm mb-2">Apply Filter</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {filters.map((filter) => (
                      <Button 
                        key={filter.id}
                        type="button"
                        variant={activeFilter === filter.id ? "default" : "outline"}
                        className={`${activeFilter === filter.id ? 'bg-terminal-green text-terminal-black' : 'neon-outline'}`}
                        onClick={() => setActiveFilter(filter.id === 'none' ? null : filter.id)}
                      >
                        <Palette size={16} className="mr-2" />
                        {filter.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Caption input */}
              <div className="mb-6">
                <label htmlFor="caption" className="block font-mono text-sm mb-2">
                  {type === 'album' ? 'Album Description' : 'Caption'}
                </label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={type === 'album' ? 'Describe your album...' : 'Write a caption...'}
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
                  disabled={isSubmitting || imagePreview.length === 0}
                  className={`bg-terminal-green text-terminal-black ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  {isSubmitting ? 'Uploading...' : `Share ${type.charAt(0).toUpperCase() + type.slice(1)}`}
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
