import React, { useState, useEffect } from 'react';
import { Sparkles, Send, X, MessageCircle, Zap, Globe, Calendar, DollarSign, Brain, AlertCircle, Mic } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import VoiceAssistant from './VoiceAssistant';

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
  const [conversationContext, setConversationContext] = useState('');
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Add welcome message if no messages exist
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: '1',
          type: 'ai',
          content: geminiService.isConfigured() 
            ? "Hi! I'm your AI travel assistant powered by Gemini. I can help you plan trips, find destinations, manage budgets, and answer any travel questions. What would you like to explore today?"
            : "Hi! I'm your AI travel assistant. I can help you plan trips, find destinations, manage budgets, and answer any travel questions. Note: For enhanced AI responses, please configure your Gemini API key. What would you like to explore today?",
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

    try {
      // Generate AI response using Gemini
      const aiResponseText = await geminiService.generateResponse(inputValue, conversationContext);
      const suggestions = await geminiService.generateTravelSuggestions(inputValue);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseText,
        timestamp: new Date(),
        suggestions: suggestions
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Update conversation context (keep last few exchanges)
      setConversationContext(prev => {
        const newContext = `${prev}\nUser: ${inputValue}\nAssistant: ${aiResponseText}`;
        // Keep only last 1000 characters to avoid token limits
        return newContext.slice(-1000);
      });
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
        suggestions: [
          "Try rephrasing your question",
          "Ask about popular destinations",
          "Get help with trip planning",
          "Find budget travel tips"
        ]
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
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
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              geminiService.isConfigured() 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse' 
                : 'bg-gray-400'
            }`}>
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                AI Travel Assistant {geminiService.isConfigured() && <span className="text-xs text-purple-600">• Powered by Gemini</span>}
              </h3>
              <p className="text-sm text-gray-500">
                {geminiService.isConfigured() ? 'Always here to help' : 'Configure API key for enhanced responses'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowVoiceAssistant(true)}
              className="p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 transform hover:scale-110"
              title="Voice Assistant"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Warning */}
        {!geminiService.isConfigured() && (
          <div className="mx-6 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium">Enhanced AI features unavailable</p>
              <p className="text-yellow-700">
                Add your Gemini API key to <code className="bg-yellow-100 px-1 rounded">.env</code> file as <code className="bg-yellow-100 px-1 rounded">VITE_GEMINI_API_KEY</code> for smarter responses.
              </p>
            </div>
          </div>
        )}

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

      {/* Voice Assistant Modal */}
      <VoiceAssistant 
        isOpen={showVoiceAssistant} 
        onClose={() => setShowVoiceAssistant(false)} 
      />
    </div>
  );
}