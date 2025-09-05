import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, MapPin, Calendar, Users, Mic, X, Zap } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface SearchSuggestion {
  id: string;
  type: 'destination' | 'experience' | 'ai-suggestion';
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

interface AISearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}

export default function AISearchBox({ value, onChange, onSearch }: AISearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  const aiSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      type: 'ai-suggestion',
      title: 'Plan a romantic getaway for 2',
      subtitle: 'AI-curated destinations for couples',
      icon: Sparkles
    },
    {
      id: '2',
      type: 'destination',
      title: 'Santorini, Greece',
      subtitle: 'Perfect for sunset views',
      icon: MapPin
    },
    {
      id: '3',
      type: 'experience',
      title: 'Adventure trip in March',
      subtitle: 'Best weather for outdoor activities',
      icon: Calendar
    },
    {
      id: '4',
      type: 'ai-suggestion',
      title: 'Family vacation under $5000',
      subtitle: 'Budget-friendly destinations',
      icon: Users
    }
  ];

  useEffect(() => {
    const generateSuggestions = async () => {
      if (value.length > 2 && geminiService.isConfigured()) {
        setIsGeneratingSuggestions(true);
        try {
          const aiSuggestionTexts = await geminiService.generateTravelSuggestions(value);
          const dynamicSuggestions: SearchSuggestion[] = aiSuggestionTexts.map((text, index) => ({
            id: `ai-${index}`,
            type: 'ai-suggestion',
            title: text,
            subtitle: 'AI-generated suggestion',
            icon: Sparkles
          }));
          setSuggestions(dynamicSuggestions);
        } catch (error) {
          console.error('Error generating AI suggestions:', error);
          setSuggestions(aiSuggestions);
        } finally {
          setIsGeneratingSuggestions(false);
        }
        setShowSuggestions(true);
      } else if (value.length > 0) {
        const filtered = aiSuggestions.filter(suggestion =>
          suggestion.title.toLowerCase().includes(value.toLowerCase()) ||
          suggestion.subtitle.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions(aiSuggestions);
        setShowSuggestions(isFocused);
      }
    };

    const debounceTimer = setTimeout(generateSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value, isFocused]);

  useEffect(() => {
    if (value.length === 0) {
      setSuggestions(aiSuggestions);
      setShowSuggestions(isFocused);
    } else {
      setShowSuggestions(isFocused);
    }
  }, [isFocused]);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        onChange('Bali Indonesia beach resort');
      }, 2000);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.title);
    onSearch(suggestion.title);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative flex-1 max-w-2xl mx-8">
      <form onSubmit={handleSubmit} className="relative">
        {/* Main Search Input */}
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'transform scale-105' : ''
        }`}>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <Search className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? 'text-blue-500' : 'text-gray-400'
            }`} />
            {(value || isGeneratingSuggestions) && (
              <Sparkles className={`w-4 h-4 text-purple-500 ${isGeneratingSuggestions ? 'animate-spin' : 'animate-pulse'}`} />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask AI: 'Plan a romantic trip to Paris' or search destinations..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className={`w-full pl-12 pr-20 py-4 bg-white/90 backdrop-blur-sm border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none ${
              isFocused 
                ? 'border-blue-500 bg-white shadow-2xl shadow-blue-500/20 ring-4 ring-blue-500/10' 
                : 'border-gray-200/60 hover:border-gray-300 hover:bg-white/95 shadow-lg'
            }`}
          />

          {/* Action Buttons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-full transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-blue-500/25"
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI-Powered Suggestions Dropdown */}
        {showSuggestions && (
          <div className={`absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden z-50 transition-all duration-300 ${
            showSuggestions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  {geminiService.isConfigured() ? 'AI-Powered Suggestions' : 'Quick Suggestions'}
                </span>
                {isGeneratingSuggestions && (
                  <div className="w-3 h-3 border border-purple-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] group animate-fade-in-up`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`p-2 rounded-lg ${
                      suggestion.type === 'ai-suggestion' 
                        ? 'bg-purple-100 text-purple-600' 
                        : suggestion.type === 'destination'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      <suggestion.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {suggestion.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {suggestion.subtitle}
                      </div>
                    </div>
                    {suggestion.type === 'ai-suggestion' && geminiService.isConfigured() && (
                      <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
                        AI
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-100 p-4 bg-gray-50/50">
              <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200">
                  🏖️ Beach Destinations
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200">
                  🏔️ Mountain Retreats
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200">
                  🏛️ Cultural Tours
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Voice Recognition Indicator */}
      {isListening && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
          🎤 Listening...
        </div>
      )}
    </div>
  );
}