import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Apple, Chrome } from 'lucide-react';

interface SignInProps {
  onClose: () => void;
  onSignIn: (email: string) => void;
}

export default function SignIn({ onClose, onSignIn }: SignInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSignIn(email);
    setIsLoading(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-md transition-all duration-700 ease-out ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
      }`}>
        {/* Background with glassmorphism */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20" />
        
        {/* Animated background elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        
        <div className="relative p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 rounded-2xl transition-all duration-300 focus:outline-none ${
                    focusedField === 'email' 
                      ? 'border-blue-500 bg-white shadow-lg shadow-blue-500/10 scale-105' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white/80'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-4 bg-gray-50/80 border-2 rounded-2xl transition-all duration-300 focus:outline-none ${
                    focusedField === 'password' 
                      ? 'border-blue-500 bg-white shadow-lg shadow-blue-500/10 scale-105' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white/80'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">Remember me</span>
              </label>
              <button type="button" className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Sign In */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 hover:shadow-md">
              <Apple className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Apple</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 hover:shadow-md">
              <Chrome className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}