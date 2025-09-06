import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Phone, PhoneOff, Volume2, AlertCircle } from 'lucide-react';
import { vapiService } from '../services/vapiService';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      if (callState === 'active' || callState === 'connecting') {
        handleEndCall();
      }
    }
  }, [isOpen, callState]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const handleStartCall = async () => {
    setError(null);
    setCallState('connecting');

    try {
      const success = await vapiService.startCall();
      if (success) {
        setCallState('active');
      } else {
        setCallState('idle');
        setError('Failed to start voice call. Please check your configuration.');
      }
    } catch (error) {
      console.error('Error starting call:', error);
      setCallState('idle');
      setError('Failed to connect to voice assistant. Please try again.');
    }
  };

  const handleEndCall = async () => {
    try {
      await vapiService.endCall();
    } catch (error) {
      console.error('Error ending call:', error);
    } finally {
      setCallState('ended');
      setTimeout(() => {
        setCallState('idle');
        setCallDuration(0);
      }, 2000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Note: Actual mute functionality would depend on VAPI SDK methods
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCallStateColor = () => {
    switch (callState) {
      case 'connecting': return 'text-yellow-500';
      case 'active': return 'text-green-500';
      case 'ended': return 'text-gray-500';
      default: return 'text-blue-500';
    }
  };

  const getCallStateText = () => {
    switch (callState) {
      case 'connecting': return 'Connecting...';
      case 'active': return `Active Call - ${formatDuration(callDuration)}`;
      case 'ended': return 'Call Ended';
      default: return 'Ready to Call';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
    }`}>
      <div className={`bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-200/60 transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Voice Assistant</h3>
            <p className="text-sm text-gray-600">AI-powered travel planning</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Warning */}
        {!vapiService.isConfigured() && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium">Voice Assistant Not Configured</p>
              <p className="text-yellow-700 mt-1">
                Please add your VAPI API key and Assistant ID to the environment variables:
              </p>
              <code className="block mt-2 p-2 bg-yellow-100 rounded text-xs">
                VITE_VAPI_API_KEY=your_api_key<br/>
                VITE_VAPI_ASSISTANT_ID=your_assistant_id
              </code>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Call Status */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 ${getCallStateColor()}`}>
            <div className={`w-2 h-2 rounded-full ${
              callState === 'active' ? 'bg-green-500 animate-pulse' :
              callState === 'connecting' ? 'bg-yellow-500 animate-pulse' :
              'bg-gray-400'
            }`} />
            <span className="text-sm font-medium">{getCallStateText()}</span>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center space-x-6 mb-8">
          {callState === 'idle' && (
            <button
              onClick={handleStartCall}
              disabled={!vapiService.isConfigured()}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-green-500/25"
            >
              <Phone className="w-6 h-6" />
            </button>
          )}

          {callState === 'connecting' && (
            <button
              onClick={handleEndCall}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-red-500/25"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          )}

          {callState === 'active' && (
            <>
              <button
                onClick={toggleMute}
                className={`w-12 h-12 ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-red-500/25"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg">
                <Volume2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          {callState === 'idle' && (
            <>
              <p className="text-gray-600 text-sm">
                Click the phone button to start a voice conversation with your AI travel assistant
              </p>
              <p className="text-gray-500 text-xs">
                Powered by VAPI • Secure voice processing
              </p>
            </>
          )}
          
          {callState === 'connecting' && (
            <p className="text-gray-600 text-sm">
              Connecting to your voice assistant...
            </p>
          )}
          
          {callState === 'active' && (
            <>
              <p className="text-gray-600 text-sm">
                Speak naturally about your travel plans
              </p>
              <p className="text-gray-500 text-xs">
                Your AI assistant is listening and ready to help
              </p>
            </>
          )}
          
          {callState === 'ended' && (
            <p className="text-gray-600 text-sm">
              Call ended. Thank you for using voice assistant!
            </p>
          )}
        </div>

        {/* Features */}
        {callState === 'idle' && vapiService.isConfigured() && (
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
            <h4 className="font-medium text-blue-900 mb-2">Voice Assistant Features:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Natural conversation about travel plans</li>
              <li>• Real-time destination recommendations</li>
              <li>• Budget planning and cost estimates</li>
              <li>• Itinerary creation and optimization</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}