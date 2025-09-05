import React, { useState } from 'react';
import { X, Share2, Copy, Facebook, Twitter, Mail, MessageCircle, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  url?: string;
}

export default function ShareModal({ isOpen, onClose, title, description, url = window.location.href }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareData = {
    title,
    text: description,
    url
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link');
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`, '_blank')
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`, '_blank')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Share Trip</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Native Share (if available) */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-200"
            >
              <Share2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-600">Share via device</span>
            </button>
          )}

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-200"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600" />
            )}
            <span className={`font-medium ${copied ? 'text-green-600' : 'text-gray-600'}`}>
              {copied ? 'Link copied!' : 'Copy link'}
            </span>
          </button>

          {/* Social Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`flex items-center space-x-2 p-3 ${option.color} text-white rounded-2xl hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
              >
                <option.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}