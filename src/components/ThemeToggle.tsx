
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Zap } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type ThemeOption = 'dark' | 'light' | 'synthwave';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeOption>('dark');

  useEffect(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') as ThemeOption | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: ThemeOption) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'light', 'synthwave');
    
    // Add the new theme class
    root.classList.add(newTheme);
    
    // Store in localStorage
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="neon-outline font-mono relative overflow-hidden group"
        >
          {theme === 'dark' && <Moon className="h-4 w-4 transition-transform group-hover:scale-110" />}
          {theme === 'light' && <Sun className="h-4 w-4 transition-transform group-hover:scale-110" />}
          {theme === 'synthwave' && <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />}
          <span className="ml-2">{theme === 'dark' ? 'DARK' : theme === 'light' ? 'LIGHT' : 'SYNTH'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card">
        <DropdownMenuItem 
          onClick={() => toggleTheme('light')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => toggleTheme('dark')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => toggleTheme('synthwave')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          <span>Synthwave</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
