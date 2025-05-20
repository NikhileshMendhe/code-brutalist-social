
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="neon-outline font-mono"
      onClick={toggleTheme}
    >
      {isDark ? '[LIGHT]' : '[DARK]'}
    </Button>
  );
};

export default ThemeToggle;
