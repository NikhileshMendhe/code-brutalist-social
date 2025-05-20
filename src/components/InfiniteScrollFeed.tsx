
import { useState, useEffect, useRef } from 'react';
import PostCard, { PostProps } from './PostCard';
import { Loader } from 'lucide-react';

const InfiniteScrollFeed = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Mock data generation
  const generateMockPosts = (pageNum: number): PostProps[] => {
    const mockPosts = [];
    const baseDate = new Date();
    
    const usernames = ['cyberghost', 'neonrider', 'pixelwarrior', 'glitch404', 'hackermonk'];
    const captions = [
      'Just finished this digital art. What do you think? #digitalart #cyberpunk',
      'Evening vibes in the neon district. #nightlife #neon',
      'New pixel portrait. 8-bit nostalgia. #pixel #retro',
      'Abstract glitch experiment. #glitchart #digital',
      'Terminal aesthetics and code poetry. #code #ascii'
    ];
    
    for (let i = 0; i < 5; i++) {
      const id = `${pageNum}-${i}`;
      const randomDate = new Date(baseDate);
      randomDate.setMinutes(randomDate.getMinutes() - (pageNum * 60 + i * 15));
      
      mockPosts.push({
        id,
        username: usernames[Math.floor(Math.random() * usernames.length)],
        avatarUrl: `https://source.unsplash.com/random/150x150?tech&sig=${id}`,
        imageUrl: `https://source.unsplash.com/random/600x600?cyberpunk&sig=${id}`,
        caption: captions[Math.floor(Math.random() * captions.length)],
        likes: Math.floor(Math.random() * 300),
        comments: Math.floor(Math.random() * 50),
        timestamp: randomDate
      });
    }
    
    return mockPosts;
  };

  // Fetch initial posts
  useEffect(() => {
    fetchMorePosts();
  }, []);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        fetchMorePosts();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, hasMore]);

  const fetchMorePosts = async () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPosts = generateMockPosts(page);
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    
    // Stop after 5 pages for demo
    if (page >= 5) {
      setHasMore(false);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {hasMore && (
        <div 
          ref={loaderRef}
          className="py-8 flex justify-center"
        >
          {isLoading && (
            <div className="flex flex-col items-center">
              <Loader className="animate-spin text-terminal-green mb-2" />
              <span className="font-mono text-sm text-terminal-green">Loading posts...</span>
            </div>
          )}
        </div>
      )}
      
      {!hasMore && (
        <div className="py-8 text-center">
          <span className="font-mono text-sm text-muted-foreground">End of feed</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollFeed;
