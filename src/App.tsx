import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Menu, 
  X, 
  Search, 
  Globe, 
  Compass, 
  Camera, 
  Heart, 
  Share2, 
  MessageCircle,
  Sparkles,
  User,
  LogIn,
  ChevronRight,
  Play,
  Award,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Mountain,
  Waves,
  Building,
  TreePine,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer
} from 'lucide-react';
import AISearchBox from './components/AISearchBox';
import SignIn from './components/SignIn';
import Explore from './components/Explore';
import Gallery from './components/Gallery';
import AIAssistant from './components/AIAssistant';
import ShareModal from './components/ShareModal';
import CollaborateModal from './components/CollaborateModal';
import PackingListModal from './components/PackingListModal';
import WeatherAlert from './components/WeatherAlert';
import TestimonialsSection from './components/TestimonialsSection';
import ImageCarousel from './components/ImageCarousel';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCollaborateModal, setShowCollaborateModal] = useState(false);
  const [showPackingModal, setShowPackingModal] = useState(false);
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleSignIn = (email: string) => {
    setIsSignedIn(true);
    setUserEmail(email);
    setShowSignIn(false);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserEmail('');
  };

  // Sample weather data
  const weatherData = [
    {
      quarter: 'Q1 2024',
      temperature: { min: 22, max: 28 },
      condition: 'sunny' as const,
      humidity: 65,
      visibility: '10km',
      description: 'Perfect weather for outdoor activities and sightseeing.',
      alert: 'Peak tourist season - book accommodations early'
    },
    {
      quarter: 'Q2 2024',
      temperature: { min: 26, max: 32 },
      condition: 'cloudy' as const,
      humidity: 75,
      visibility: '8km',
      description: 'Warm with occasional clouds, ideal for beach activities.',
    },
    {
      quarter: 'Q3 2024',
      temperature: { min: 24, max: 30 },
      condition: 'rainy' as const,
      humidity: 85,
      visibility: '6km',
      description: 'Monsoon season with refreshing rains and lush landscapes.',
      alert: 'Carry rain gear and waterproof bags'
    },
    {
      quarter: 'Q4 2024',
      temperature: { min: 20, max: 26 },
      condition: 'windy' as const,
      humidity: 60,
      visibility: '12km',
      description: 'Cool and breezy, perfect for hiking and adventure sports.',
    }
  ];

  const featuredDestinations = [
    {
      id: 1,
      name: 'Santorini',
      country: 'Greece',
      images: [
        'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      rating: 4.9,
      reviews: 2847,
      price: 1200,
      description: 'Iconic white buildings and stunning sunsets',
      highlights: ['Sunset Views', 'Wine Tasting', 'Volcanic Beaches']
    },
    {
      id: 2,
      name: 'Bali',
      country: 'Indonesia',
      images: [
        'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      rating: 4.8,
      reviews: 3156,
      price: 900,
      description: 'Tropical paradise with rich culture',
      highlights: ['Rice Terraces', 'Temples', 'Beach Resorts']
    },
    {
      id: 3,
      name: 'Kerala',
      country: 'India',
      images: [
        'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      rating: 4.7,
      reviews: 1923,
      price: 600,
      description: 'Serene backwaters and lush landscapes',
      highlights: ['Backwaters', 'Houseboats', 'Spice Gardens']
    },
    {
      id: 4,
      name: 'Goa',
      country: 'India',
      images: [
        'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      rating: 4.6,
      reviews: 2134,
      price: 500,
      description: 'Beautiful beaches and vibrant nightlife',
      highlights: ['Beach Parties', 'Portuguese Architecture', 'Water Sports']
    }
  ];

  const trustedPartners = [
    { name: 'Booking.com', logo: '🏨' },
    { name: 'Airbnb', logo: '🏠' },
    { name: 'Expedia', logo: '✈️' },
    { name: 'TripAdvisor', logo: '🌟' },
    { name: 'Kayak', logo: '🛫' },
    { name: 'Hotels.com', logo: '🏩' },
    { name: 'Agoda', logo: '🌴' },
    { name: 'Priceline', logo: '💰' }
  ];

  if (activeTab === 'explore') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Wanderlust
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="text-blue-600 font-medium"
                >
                  Explore
                </button>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Gallery
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {isSignedIn ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{userEmail}</span>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Explore />
        </main>

        {showSignIn && (
          <SignIn onClose={() => setShowSignIn(false)} onSignIn={handleSignIn} />
        )}
      </div>
    );
  }

  if (activeTab === 'gallery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Wanderlust
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setActiveTab('home')}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Explore
                </button>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className="text-blue-600 font-medium"
                >
                  Gallery
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {isSignedIn ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{userEmail}</span>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Gallery />
        </main>

        {showSignIn && (
          <SignIn onClose={() => setShowSignIn(false)} onSignIn={handleSignIn} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Wanderlust
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-blue-600 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('explore')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Explore
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Gallery
              </button>
              <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                About
              </button>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userEmail}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignIn(true)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => {setActiveTab('home'); setIsMenuOpen(false);}}
                  className="text-left text-blue-600 font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => {setActiveTab('explore'); setIsMenuOpen(false);}}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Explore
                </button>
                <button 
                  onClick={() => {setActiveTab('gallery'); setIsMenuOpen(false);}}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Gallery
                </button>
                <button className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                  About
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Plan Your Perfect
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover breathtaking destinations, create unforgettable memories, and explore the world with our AI-powered travel planning platform.
              </p>
            </div>

            {/* AI Search Box */}
            <div className="flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <AISearchBox 
                value={searchValue}
                onChange={setSearchValue}
                onSearch={handleSearch}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <button 
                onClick={() => setActiveTab('explore')}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="group bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-purple-500 group-hover:rotate-12 transition-transform duration-200" />
                <span>AI Assistant</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600 font-medium">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">4.9★</div>
                <div className="text-gray-600 font-medium">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the world's most breathtaking destinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageCarousel 
                    images={destination.images}
                    alt={destination.name}
                    className="h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Elements */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                    </div>
                  </div>

                  <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{destination.country}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                      <p className="text-gray-600">{destination.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">${destination.price}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{destination.reviews} reviews</span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Wanderlust?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of travel planning with our cutting-edge features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Planning',
                description: 'Get personalized recommendations and itineraries powered by advanced AI technology.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Globe,
                title: 'Global Destinations',
                description: 'Explore over 50,000 destinations worldwide with detailed guides and insider tips.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Shield,
                title: 'Secure Booking',
                description: 'Book with confidence using our secure payment system and travel protection.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Users,
                title: 'Collaborative Planning',
                description: 'Plan trips together with friends and family using our collaboration tools.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Zap,
                title: 'Instant Updates',
                description: 'Get real-time updates on weather, flights, and local events at your destination.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Award,
                title: 'Expert Curation',
                description: 'Access handpicked experiences curated by travel experts and local guides.',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Forecast Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Weather Insights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Plan your perfect trip with detailed weather forecasts and seasonal recommendations
            </p>
          </div>

          <WeatherAlert destination="Bali, Indonesia" weatherData={weatherData} />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Trusted Partners */}
      <section className="py-20 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h2>
            <p className="text-lg text-gray-600">
              We partner with the world's best travel companies to bring you amazing deals
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="animate-scroll">
              {[...trustedPartners, ...trustedPartners].map((partner, index) => (
                <div
                  key={index}
                  className="inline-flex items-center justify-center mx-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                >
                  <span className="text-3xl mr-3">{partner.logo}</span>
                  <span className="text-lg font-semibold text-gray-800">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered their perfect destinations with Wanderlust
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setActiveTab('explore')}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Explore Destinations
            </button>
            <button 
              onClick={() => setShowAIAssistant(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              Try AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Wanderlust</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your AI-powered travel companion for discovering amazing destinations and creating unforgettable memories.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Popular Destinations</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Hidden Gems</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Adventure Travel</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Cultural Experiences</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">AI Trip Planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Weather Forecasts</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Collaboration Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Travel Gallery</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2024 Wanderlust. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showSignIn && (
        <SignIn onClose={() => setShowSignIn(false)} onSignIn={handleSignIn} />
      )}

      {showAIAssistant && (
        <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
      )}

      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title="Amazing Trip to Bali"
          description="Check out this incredible 7-day adventure through Bali's most beautiful destinations!"
        />
      )}

      {showCollaborateModal && (
        <CollaborateModal
          isOpen={showCollaborateModal}
          onClose={() => setShowCollaborateModal(false)}
          tripTitle="Bali Adventure 2024"
        />
      )}

      {showPackingModal && (
        <PackingListModal
          isOpen={showPackingModal}
          onClose={() => setShowPackingModal(false)}
          destination="Bali, Indonesia"
          duration={7}
          season="summer"
        />
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30">
        <button
          onClick={() => setShowAIAssistant(true)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
        </button>
        
        <button
          onClick={() => setShowShareModal(true)}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <Share2 className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setShowCollaborateModal(true)}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <Users className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setShowPackingModal(true)}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <Calendar className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default App;