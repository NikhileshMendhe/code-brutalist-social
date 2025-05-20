
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Login successful!');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!registerForm.email || !registerForm.username || !registerForm.password || !registerForm.confirmPassword) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (registerForm.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Registration successful!');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative px-4">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* ASCII art logo */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 font-mono text-terminal-green text-xs text-center whitespace-pre">
        {`
  _____     _     _____           _       _ 
 |  __ \\   | |   / ____|         (_)     | |
 | |__) |__| |__| (___   ___   ___ _  ___| |
 |  ___/ __  |_ \\\\___ \\ / _ \\ / __| |/ _ \\ |
 | |   | |_| |__) |__) | (_) | (__| |  __/ |
 |_|    \\__\\_|____/____/ \\___/ \\___|_|\\___|_|
                                            
        `}
      </div>
      
      <div className="w-full max-w-md">
        <div className="border-2 border-terminal-green bg-card shadow-lg p-6 shadow-terminal-green/10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="font-mono">Login</TabsTrigger>
              <TabsTrigger value="register" className="font-mono">Register</TabsTrigger>
            </TabsList>
            
            {/* Login tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block font-mono text-sm mb-2">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="terminal-input"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block font-mono text-sm mb-2">Password</label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      className="terminal-input"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="font-mono text-xs">
                      <a href="#" className="text-terminal-green hover:underline">Forgot password?</a>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-terminal-green text-terminal-black"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Login'}
                  </Button>
                  
                  <div className="text-center font-mono text-xs text-muted-foreground">
                    Don't have an account?{' '}
                    <TabsTrigger value="register" className="p-0 text-terminal-green hover:underline">
                      Register
                    </TabsTrigger>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            {/* Register tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="register-email" className="block font-mono text-sm mb-2">Email</label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="terminal-input"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="username" className="block font-mono text-sm mb-2">Username</label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="cooluser"
                      className="terminal-input"
                      value={registerForm.username}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="register-password" className="block font-mono text-sm mb-2">Password</label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="********"
                      className="terminal-input"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block font-mono text-sm mb-2">Confirm Password</label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="********"
                      className="terminal-input"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-terminal-green text-terminal-black"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Create Account'}
                  </Button>
                  
                  <div className="text-center font-mono text-xs text-muted-foreground">
                    Already have an account?{' '}
                    <TabsTrigger value="login" className="p-0 text-terminal-green hover:underline">
                      Login
                    </TabsTrigger>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-6 text-center font-mono text-xs text-muted-foreground">
          <p>By using this service, you agree to our</p>
          <p className="mt-1">
            <a href="#" className="text-terminal-green hover:underline">Terms of Service</a>
            {' '}&{' '}
            <a href="#" className="text-terminal-green hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
