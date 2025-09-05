import React, { useState, useEffect } from 'react';
import { Sparkles, Send, X, MessageCircle, Zap, Globe, Calendar, DollarSign, Brain } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Add welcome message if no messages exist
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: '1',
          type: 'ai',
          content: "Hi! I'm your AI travel assistant. I can help you plan trips, find destinations, manage budgets, and answer any travel questions. What would you like to explore today?",
          timestamp: new Date(),
          suggestions: [
            "Plan a 7-day trip to Japan",
            "Find budget-friendly destinations in Europe",
            "What's the best time to visit Bali?",
            "Create an itinerary for Paris"
          ]
        };
        setMessages([welcomeMessage]);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('japan')) {
      return "Japan is an incredible destination! For a 7-day trip, I'd recommend spending 3 days in Tokyo exploring districts like Shibuya and Asakusa, 2 days in Kyoto for temples and traditional culture, and 2 days in Osaka for amazing food. The best time to visit is spring (March-May) for cherry blossoms or fall (September-November) for beautiful foliage. Budget around $150-200 per day including accommodation, meals, and activities.";
    } else if (lowerInput.includes('europe') && lowerInput.includes('budget')) {
      return "For budget-friendly European destinations, consider Eastern Europe! Prague, Budapest, and Krakow offer incredible value with stunning architecture, rich history, and delicious food. Portugal and parts of Spain are also great options. You can travel comfortably on $50-80 per day. I can help you create a detailed itinerary with specific recommendations for accommodations and activities.";
    } else if (lowerInput.includes('bali')) {
      return "Bali is best visited during the dry season from April to October, with July-August being peak season. For fewer crowds and great weather, consider May-June or September. The island offers diverse experiences from beach relaxation in Seminyak to cultural immersion in Ubud and adventure activities around Mount Batur. Budget around $40-60 per day for a comfortable experience.";
    } else if (lowerInput.includes('paris')) {
      return "Paris is magical year-round! For a perfect itinerary, I'd suggest: Day 1-2: Classic sights (Eiffel Tower, Louvre, Notre-Dame area), Day 3: Montmartre and Sacré-Cœur, Day 4: Versailles day trip, Day 5: Latin Quarter and Seine river cruise. Don't miss trying authentic French pastries and visiting local markets. Would you like specific restaurant recommendations or museum tips?";
    } else {
      return "That's a great question! I'd be happy to help you with that. Based on your interests, I can provide personalized recommendations for destinations, create detailed itineraries, help with budget planning, suggest the best times to travel, and much more. What specific aspect of travel planning would you like to focus on?";
    }
  };

  const generateSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('japan')) {
      return [
        "Show me a detailed Tokyo itinerary",
        "What's the cost breakdown for Japan?",
        "Best areas to stay in Kyoto",
        "Japanese cultural etiquette tips"
      ];
    } else if (lowerInput.includes('europe')) {
      return [
        "Create a 2-week Europe itinerary",
        "Best European cities for first-time visitors",
        "How to travel between European countries",
        "European food experiences not to miss"
      ];
    } else {
      return [
        "Help me plan a romantic getaway",
        "Find family-friendly destinations",
        "Adventure travel recommendations",
        "Best destinations for solo travelers"
      ];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-end p-6 transition-all duration-300 ${
      isVisible ? 'bg-black/20 backdrop-blur-sm' : 'bg-black/0'
    }`}>
      <div className={`w-96 h-[600px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 flex flex-col transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Travel Assistant</h3>
              <p className="text-sm text-gray-500">Always here to help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs opacity-70">Suggested questions:</p>
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left p-2 bg-white/20 rounded-lg text-xs hover:bg-white/30 transition-all duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200/60">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className="flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 group">
              <Globe className="w-5 h-5 text-blue-500 mb-1 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs text-blue-600 font-medium">Destinations</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-200 group">
              <Calendar className="w-5 h-5 text-green-500 mb-1 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs text-green-600 font-medium">Itinerary</span>
            </button>
            <button className="flex flex-col items-center p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-200 group">
              <DollarSign className="w-5 h-5 text-purple-500 mb-1 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs text-purple-600 font-medium">Budget</span>
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200/60">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about travel..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}