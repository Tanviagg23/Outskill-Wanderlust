import React, { useState } from 'react';
import { Search, Plus, Calendar, MapPin, Users, DollarSign, Plane, Camera, Star, Globe, Compass, Heart, Award, TrendingUp, Clock, MessageCircle, User, Share2, Edit, Trash2, X, Check, ArrowLeft, UserPlus, Package, Cloud } from 'lucide-react';
import SignIn from './components/SignIn';
import AISearchBox from './components/AISearchBox';
import AIAssistant from './components/AIAssistant';
import Gallery from './components/Gallery';
import Explore from './components/Explore';
import ImageCarousel from './components/ImageCarousel';
import ShareModal from './components/ShareModal';
import CollaborateModal from './components/CollaborateModal';
import WeatherAlert from './components/WeatherAlert';
import PackingListModal from './components/PackingListModal';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  images: string[];
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  activities: string[];
  notes: string;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  images: string[];
  rating: number;
  price: string;
  priceUSD: number;
  priceINR: number;
  description: string;
}

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  trend: string;
}

interface BudgetDestination {
  id: string;
  name: string;
  country: string;
  images: string[];
  priceUSD: number;
  priceINR: number;
  duration: string;
  rating: number;
  description: string;
  included: string[];
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const stats: Stat[] = [
  {
    id: '1',
    label: 'Destinations',
    value: '2,500+',
    icon: Globe,
    trend: '+12% this month'
  },
  {
    id: '2',
    label: 'Happy Travelers',
    value: '150K+',
    icon: Heart,
    trend: '+25% this month'
  },
  {
    id: '3',
    label: 'Trip Success Rate',
    value: '98.5%',
    icon: Award,
    trend: '+2.1% this month'
  },
  {
    id: '4',
    label: 'Avg. Planning Time',
    value: '15 min',
    icon: Clock,
    trend: '-30% faster'
  }
];

const budgetDestinations: BudgetDestination[] = [
  {
    id: '1',
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    images: [
      'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    priceUSD: 800,
    priceINR: 66400,
    duration: '7 days',
    rating: 4.7,
    description: 'Tropical paradise with temples and beaches',
    included: ['Accommodation', 'Breakfast', 'Airport Transfer']
  },
  {
    id: '2',
    name: 'Goa, India',
    country: 'India',
    images: [
      'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    priceUSD: 400,
    priceINR: 33200,
    duration: '5 days',
    rating: 4.5,
    description: 'Beautiful beaches and Portuguese heritage',
    included: ['Beach Resort', 'Meals', 'Water Sports']
  },
  {
    id: '3',
    name: 'Prague, Czech Republic',
    country: 'Czech Republic',
    images: [
      'https://images.pexels.com/photos/1142260/pexels-photo-1142260.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    priceUSD: 1200,
    priceINR: 99600,
    duration: '5 days',
    rating: 4.6,
    description: 'Medieval charm with stunning architecture',
    included: ['Accommodation', 'City Tours', 'Breakfast']
  },
  {
    id: '4',
    name: 'Kerala, India',
    country: 'India',
    images: [
      'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    priceUSD: 600,
    priceINR: 49800,
    duration: '6 days',
    rating: 4.8,
    description: 'Gods own country with backwaters and spices',
    included: ['Houseboat', 'Ayurvedic Spa', 'Cultural Tours']
  },
  {
    id: '5',
    name: 'Santorini, Greece',
    country: 'Greece',
    images: [
      'https://images.pexels.com/photos/161853/santorini-oia-greece-water-161853.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    priceUSD: 1800,
    priceINR: 149400,
    duration: '6 days',
    rating: 4.9,
    description: 'Iconic sunsets and white-washed buildings',
    included: ['Accommodation', 'Sunset Tour', 'Wine Tasting']
  },
  {
    id: '6',
    name: 'Rajasthan, India',
    country: 'India',
    images: [
      'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2413613/pexels-photo-2413613.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    priceUSD: 700,
    priceINR: 58100,
    duration: '8 days',
    rating: 4.7,
    description: 'Royal palaces and desert adventures',
    included: ['Heritage Hotels', 'Camel Safari', 'Palace Tours']
  }
];

const featuredDestinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    images: [
      'https://images.pexels.com/photos/161853/santorini-oia-greece-water-161853.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.9,
    price: 'From $89/night',
    priceUSD: 89,
    priceINR: 7387,
    description: 'Stunning sunsets and white-washed buildings'
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    images: [
      'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    price: 'From $125/night',
    priceUSD: 125,
    priceINR: 10375,
    description: 'Ancient temples and cherry blossoms'
  },
  {
    id: '3',
    name: 'Goa',
    country: 'India',
    images: [
      'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    price: 'From ₹3500/night',
    priceUSD: 42,
    priceINR: 3500,
    description: 'Beautiful beaches and Portuguese heritage'
  },
  {
    id: '4',
    name: 'Machu Picchu',
    country: 'Peru',
    images: [
      'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.9,
    price: 'From $75/night',
    priceUSD: 75,
    priceINR: 6225,
    description: 'Ancient Incan citadel in the clouds'
  },
  {
    id: '5',
    name: 'Kerala',
    country: 'India',
    images: [
      'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    price: 'From ₹4500/night',
    priceUSD: 54,
    priceINR: 4500,
    description: 'Gods own country with backwaters'
  },
  {
    id: '6',
    name: 'Iceland',
    country: 'Iceland',
    images: [
      'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    price: 'From $110/night',
    priceUSD: 110,
    priceINR: 9130,
    description: 'Northern lights and dramatic landscapes'
  }
];

const myTrips: Trip[] = [
  {
    id: '1',
    destination: 'Paris, France',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    budget: 3500,
    spent: 2100,
    images: [
      'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    participants: 2,
    status: 'completed',
    activities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Montmartre'],
    notes: 'Amazing romantic getaway! The weather was perfect and we loved every moment.'
  },
  {
    id: '2',
    destination: 'Tokyo, Japan',
    startDate: '2024-05-10',
    endDate: '2024-05-18',
    budget: 4200,
    spent: 1200,
    images: [
      'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    participants: 1,
    status: 'upcoming',
    activities: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Market', 'Mount Fuji Day Trip'],
    notes: 'Excited for cherry blossom season and authentic sushi experiences!'
  },
  {
    id: '3',
    destination: 'Goa, India',
    startDate: '2024-02-01',
    endDate: '2024-02-07',
    budget: 1500,
    spent: 1450,
    images: [
      'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    participants: 4,
    status: 'completed',
    activities: ['Beach Hopping', 'Water Sports', 'Spice Plantation', 'Portuguese Churches'],
    notes: 'Perfect beach vacation with friends. Great food and amazing sunsets!'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'trips' | 'plan' | 'gallery' | 'explore' | 'wishlist' | 'budget'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [budget, setBudget] = useState(2000);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [filteredBudgetDestinations, setFilteredBudgetDestinations] = useState<BudgetDestination[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});
  const [shareModal, setShareModal] = useState<{ isOpen: boolean; item: any }>({ isOpen: false, item: null });
  const [collaborateModal, setCollaborateModal] = useState<{ isOpen: boolean; trip: any }>({ isOpen: false, trip: null });
  const [packingModal, setPackingModal] = useState<{ isOpen: boolean; trip: any }>({ isOpen: false, trip: null });
  const [newTripForm, setNewTripForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '1',
    budget: '',
    currency: 'USD' as 'USD' | 'INR',
    travelStyles: [] as string[],
    notes: ''
  });

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    const maxBudget = currency === 'USD' ? budget : budget * 83;
    const filtered = budgetDestinations.filter(dest => 
      currency === 'USD' ? dest.priceUSD <= budget : dest.priceINR <= maxBudget
    );
    setFilteredBudgetDestinations(filtered);
  }, [budget, currency]);

  const weatherData = [
    {
      quarter: 'Q1 (Jan-Mar)',
      temperature: { min: 15, max: 25 },
      condition: 'sunny' as const,
      humidity: 65,
      visibility: '10km',
      description: 'Perfect weather for sightseeing with clear skies and comfortable temperatures.',
      alert: 'Pack light layers for temperature variations'
    },
    {
      quarter: 'Q2 (Apr-Jun)',
      temperature: { min: 20, max: 30 },
      condition: 'cloudy' as const,
      humidity: 70,
      visibility: '8km',
      description: 'Warm weather with occasional clouds. Great for outdoor activities.',
    },
    {
      quarter: 'Q3 (Jul-Sep)',
      temperature: { min: 18, max: 28 },
      condition: 'rainy' as const,
      humidity: 80,
      visibility: '6km',
      description: 'Monsoon season with regular rainfall. Lush green landscapes.',
      alert: 'Carry waterproof clothing and umbrella'
    },
    {
      quarter: 'Q4 (Oct-Dec)',
      temperature: { min: 12, max: 22 },
      condition: 'windy' as const,
      humidity: 60,
      visibility: '12km',
      description: 'Cool and pleasant weather, ideal for travel and exploration.',
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProgress = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const handleSignIn = (email: string) => {
    setUser({ email });
    setShowSignIn(false);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleStartExploring = () => {
    setActiveTab('explore');
  };

  const handleViewGallery = () => {
    setActiveTab('gallery');
  };

  const handleBackToDiscover = () => {
    setActiveTab('discover');
  };

  const toggleWishlist = (destinationId: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(destinationId)) {
      newWishlist.delete(destinationId);
    } else {
      newWishlist.add(destinationId);
    }
    setWishlist(newWishlist);
  };

  const handleShare = (item: any, type: 'destination' | 'trip') => {
    setShareModal({ isOpen: true, item: { ...item, type } });
  };

  const handleCollaborate = (trip: any) => {
    setCollaborateModal({ isOpen: true, trip });
  };

  const handlePackingList = (trip: any) => {
    setPackingModal({ isOpen: true, trip });
  };

  const nextImage = (destinationId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [destinationId]: ((prev[destinationId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (destinationId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [destinationId]: ((prev[destinationId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const handleNewTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New trip created:', newTripForm);
    setShowNewTripModal(false);
    // Reset form
    setNewTripForm({
      destination: '',
      startDate: '',
      endDate: '',
      travelers: '1',
      budget: '',
      currency: 'USD',
      travelStyles: [],
      notes: ''
    });
  };

  const toggleTravelStyle = (style: string) => {
    setNewTripForm(prev => ({
      ...prev,
      travelStyles: prev.travelStyles.includes(style)
        ? prev.travelStyles.filter(s => s !== style)
        : [...prev.travelStyles, style]
    }));
  };

  const formatPrice = (priceUSD: number, priceINR: number) => {
    return currency === 'USD' ? `$${priceUSD}` : `₹${priceINR.toLocaleString()}`;
  };

  const getBudgetRange = () => {
    return currency === 'USD' ? { min: 500, max: 5000, step: 100 } : { min: 25000, max: 250000, step: 5000 };
  };

  const wishlistItems = featuredDestinations.filter(dest => wishlist.has(dest.id));

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-3000" />
      </div>

      {/* Header */}
      <header className={`bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Wanderlust</h1>
            </div>
            
            {/* Search Bar */}
            <AISearchBox 
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />

            <div className="flex items-center space-x-4">
              {/* Wishlist Counter */}
              <button 
                onClick={() => setActiveTab('wishlist')}
                className="relative p-2 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-110"
              >
                <Heart className="w-6 h-6" />
                {wishlist.size > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlist.size}
                  </div>
                )}
              </button>

              <button 
                onClick={() => setShowAIAssistant(true)}
                className="p-2 text-gray-600 hover:text-purple-600 transition-all duration-200 hover:scale-110 relative"
              >
                <MessageCircle className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              </button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Welcome, {user.email.split('@')[0]}</span>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span className="text-sm font-medium text-white">{user.email[0].toUpperCase()}</span>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`max-w-7xl mx-auto px-6 mt-8 relative z-10 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <nav className="flex space-x-8">
          {/* Back Button */}
          {activeTab !== 'discover' && (
            <button
              onClick={handleBackToDiscover}
              className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          
          {[
            { id: 'discover', label: 'Discover', icon: Search },
            { id: 'trips', label: 'My Trips', icon: MapPin },
            { id: 'plan', label: 'Plan New Trip', icon: Plus },
            { id: 'budget', label: 'Budget Explorer', icon: DollarSign },
            { id: 'wishlist', label: 'Wishlist', icon: Heart }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                activeTab === id 
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-6 py-12 relative z-10 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {activeTab === 'discover' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your Next
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Adventure
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Plan unforgettable journeys with AI-powered recommendations, budget tracking, and seamless collaboration tools.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={handleStartExploring}
                  className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
                >
                  <Compass className="w-5 h-5" />
                  <span>Start Exploring</span>
                </button>
                <button 
                  onClick={handleViewGallery}
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 border border-gray-200/60"
                >
                  <Camera className="w-5 h-5" />
                  <span>View Gallery</span>
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-200/50 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                      <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Destinations */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">Featured Destinations</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Handpicked destinations that offer the perfect blend of adventure, culture, and relaxation
                </p>
              </div>

              {/* Wishlist Preview */}
              {wishlist.size > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-6 border border-red-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <h4 className="text-lg font-semibold text-gray-900">Your Wishlist</h4>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{wishlist.size}</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {wishlistItems.slice(0, 3).map((destination) => (
                      <div key={destination.id} className="bg-white rounded-2xl p-4 shadow-sm">
                        <ImageCarousel 
                          images={destination.images} 
                          alt={destination.name}
                          className="w-full h-32 rounded-xl mb-3"
                        />
                        <h5 className="font-medium text-gray-900">{destination.name}</h5>
                        <p className="text-sm text-gray-600">{destination.country}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredDestinations.map((destination, index) => (
                  <div
                    key={destination.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer border border-gray-200/50 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <ImageCarousel 
                        images={destination.images} 
                        alt={destination.name}
                        className="w-full h-48"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Overlay Elements */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(destination.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                            wishlist.has(destination.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/80 text-gray-700 hover:bg-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${wishlist.has(destination.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(destination, 'destination');
                          }}
                          className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all duration-200"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

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
                          <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                          <p className="text-gray-600 mt-1">{destination.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {formatPrice(destination.priceUSD, destination.priceINR)}
                          </div>
                          <div className="text-xs text-gray-500">per night</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="space-y-8">
            {/* Header with Stats */}
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">My Trips</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">{myTrips.length}</div>
                  <div className="text-gray-600">Total Trips</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-green-600">
                    ${myTrips.reduce((sum, trip) => sum + trip.spent, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Spent</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {new Set(myTrips.map(trip => trip.destination.split(',')[1]?.trim())).size}
                  </div>
                  <div className="text-gray-600">Countries Visited</div>
                </div>
              </div>
            </div>

            {/* New Trip Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowNewTripModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                <Plus className="w-5 h-5" />
                <span>Plan New Trip</span>
              </button>
            </div>

            {/* Trips Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTrips.map((trip, index) => (
                <div
                  key={trip.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative">
                    <ImageCarousel 
                      images={trip.images} 
                      alt={trip.destination}
                      className="w-full h-48"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trip.status === 'completed' ? 'bg-green-100 text-green-600' :
                        trip.status === 'ongoing' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{trip.destination}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{trip.participants} people</span>
                        </div>
                      </div>
                    </div>

                    {/* Budget Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Budget Progress</span>
                        <span className="font-medium text-gray-900">
                          ${trip.spent.toLocaleString()} / ${trip.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            calculateProgress(trip.spent, trip.budget) > 90 ? 'bg-red-500' :
                            calculateProgress(trip.spent, trip.budget) > 70 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${calculateProgress(trip.spent, trip.budget)}%` }}
                        />
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-700">Activities</span>
                      <div className="flex flex-wrap gap-1">
                        {trip.activities.slice(0, 3).map((activity, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                            {activity}
                          </span>
                        ))}
                        {trip.activities.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{trip.activities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {trip.notes && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-sm text-gray-600 italic">"{trip.notes}"</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200 text-sm font-medium">
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleShare(trip, 'trip')}
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleCollaborate(trip)}
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        <UserPlus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handlePackingList(trip)}
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                      >
                        <Package className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">Plan Your Next Adventure</h2>
              <p className="text-xl text-gray-600">Tell us about your dream trip and we'll help you plan it perfectly</p>
            </div>

            <form onSubmit={handleNewTripSubmit} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 space-y-6">
              {/* Destination */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <input
                    type="text"
                    list="destinations"
                    value={newTripForm.destination}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Where do you want to go?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                  <datalist id="destinations">
                    {indianStates.map(state => (
                      <option key={state} value={`${state}, India`} />
                    ))}
                    <option value="Paris, France" />
                    <option value="Tokyo, Japan" />
                    <option value="New York, USA" />
                    <option value="London, UK" />
                    <option value="Rome, Italy" />
                    <option value="Barcelona, Spain" />
                    <option value="Amsterdam, Netherlands" />
                    <option value="Prague, Czech Republic" />
                    <option value="Bali, Indonesia" />
                    <option value="Thailand" />
                    <option value="Vietnam" />
                    <option value="Singapore" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                  <select
                    value={newTripForm.travelers}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, travelers: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newTripForm.startDate}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newTripForm.endDate}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Budget and Currency */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <div className="flex space-x-2">
                    <select
                      value={newTripForm.currency}
                      onChange={(e) => setNewTripForm(prev => ({ ...prev, currency: e.target.value as 'USD' | 'INR' }))}
                      className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                    <input
                      type="number"
                      value={newTripForm.budget}
                      onChange={(e) => setNewTripForm(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder={newTripForm.currency === 'USD' ? '2000' : '150000'}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Travel Styles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Travel Style (Select all that apply)</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {['Adventure', 'Relaxation', 'Culture', 'Food & Drink', 'Nature', 'Nightlife', 'Shopping', 'Photography', 'Family-friendly'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleTravelStyle(style)}
                      className={`p-3 rounded-2xl border-2 transition-all duration-200 text-sm font-medium ${
                        newTripForm.travelStyles.includes(style)
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {newTripForm.travelStyles.includes(style) && <Check className="w-4 h-4 inline mr-1" />}
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={newTripForm.notes}
                  onChange={(e) => setNewTripForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requirements, preferences, or notes about your trip..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Trip Plan</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">Budget Explorer</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find amazing destinations that fit your budget perfectly
              </p>
            </div>

            {/* Budget Controls */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50">
              <div className="space-y-6">
                {/* Currency Toggle */}
                <div className="flex justify-center">
                  <div className="bg-gray-100 rounded-2xl p-1 flex">
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                        currency === 'USD' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      onClick={() => setCurrency('INR')}
                      className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                        currency === 'INR' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      INR (₹)
                    </button>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {currency === 'USD' ? `$${budget.toLocaleString()}` : `₹${(budget * 83).toLocaleString()}`}
                    </div>
                    <div className="text-gray-600">Your Budget</div>
                  </div>
                  
                  <div className="px-4">
                    <input
                      type="range"
                      min={getBudgetRange().min}
                      max={getBudgetRange().max}
                      step={getBudgetRange().step}
                      value={currency === 'USD' ? budget : budget * 83}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setBudget(currency === 'USD' ? value : Math.round(value / 83));
                      }}
                      className="slider w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>{currency === 'USD' ? '$500' : '₹25,000'}</span>
                      <span>{currency === 'USD' ? '$5,000' : '₹2,50,000'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Budget Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  {currency === 'USD' 
                    ? [1000, 2000, 3000, 4000].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setBudget(amount)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            budget === amount 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          ${amount.toLocaleString()}
                        </button>
                      ))
                    : [50000, 100000, 150000, 200000].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setBudget(Math.round(amount / 83))}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            Math.abs(budget * 83 - amount) < 1000
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          ₹{amount.toLocaleString()}
                        </button>
                      ))
                  }
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Destinations Within Your Budget ({filteredBudgetDestinations.length})
                </h3>
              </div>

              {filteredBudgetDestinations.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBudgetDestinations.map((destination, index) => (
                    <div
                      key={destination.id}
                      className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer border border-gray-200/50 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <ImageCarousel 
                          images={destination.images} 
                          alt={destination.name}
                          className="w-full h-48"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Within Budget
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                            <p className="text-gray-600 mt-1">{destination.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                              <Clock className="w-3 h-3" />
                              <span>{destination.duration}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">
                              {formatPrice(destination.priceUSD, destination.priceINR)}
                            </div>
                            <div className="text-xs text-gray-500">total cost</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-sm font-medium text-gray-700">Included:</span>
                          <div className="flex flex-wrap gap-1">
                            {destination.included.map((item, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200 text-sm font-medium">
                            View Details
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(destination, 'destination');
                            }}
                            className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                          >
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                  <p className="text-gray-600 mb-4">Try increasing your budget to see more options</p>
                  <button
                    onClick={() => setBudget(currency === 'USD' ? 3000 : Math.round(250000 / 83))}
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all duration-200"
                  >
                    Increase Budget
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">My Wishlist</h2>
              <p className="text-xl text-gray-600">
                Your saved destinations for future adventures
              </p>
            </div>

            {wishlistItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((destination, index) => (
                  <div
                    key={destination.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer border border-gray-200/50 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <ImageCarousel 
                        images={destination.images} 
                        alt={destination.name}
                        className="w-full h-48"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(destination.id);
                          }}
                          className="p-2 bg-red-500 text-white rounded-full transition-all duration-200 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(destination, 'destination');
                          }}
                          className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all duration-200"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                          <p className="text-gray-600 mt-1">{destination.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {formatPrice(destination.priceUSD, destination.priceINR)}
                          </div>
                          <div className="text-xs text-gray-500">per night</div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200 text-sm font-medium">
                          Plan Trip
                        </button>
                        <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                          <MapPin className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-4">Start adding destinations you'd love to visit</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all duration-200"
                >
                  Explore Destinations
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'explore' && <Explore />}
      </main>

      {/* Weather Alert Section */}
      {(activeTab === 'discover' || activeTab === 'explore') && (
        <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
          <WeatherAlert destination="Popular Destinations" weatherData={weatherData} />
        </div>
      )}

      {/* Hotel Partners Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200/60 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted by Leading Hotel Partners</h3>
            <p className="text-gray-600">We work with the world's best hotels to bring you exceptional experiences</p>
          </div>
          
          <div className="overflow-hidden">
            <div className="animate-scroll flex items-center space-x-12">
              {[
                '🏨 Marriott International',
                '🏛️ Hilton Hotels',
                '🌟 Hyatt Hotels',
                '👑 InterContinental',
                '🏖️ Radisson Hotels',
                '🌺 Four Seasons',
                '💎 The Ritz-Carlton',
                '🏰 Fairmont Hotels',
                '🌴 Shangri-La Hotels',
                '⭐ Accor Hotels',
                '🏨 Marriott International',
                '🏛️ Hilton Hotels',
                '🌟 Hyatt Hotels',
                '👑 InterContinental',
                '🏖️ Radisson Hotels',
                '🌺 Four Seasons',
                '💎 The Ritz-Carlton',
                '🏰 Fairmont Hotels',
                '🌴 Shangri-La Hotels',
                '⭐ Accor Hotels'
              ].map((partner, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 font-medium whitespace-nowrap">
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">© 2024 Wanderlust. All rights reserved. | Making travel dreams come true.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} onSignIn={handleSignIn} />}
      {showAIAssistant && <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />}
      
      {/* New Trip Modal */}
      {showNewTripModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Plan New Trip</h3>
              <button
                onClick={() => setShowNewTripModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleNewTripSubmit} className="space-y-6">
              {/* Same form content as plan tab */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <input
                    type="text"
                    list="modal-destinations"
                    value={newTripForm.destination}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Where do you want to go?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                  <datalist id="modal-destinations">
                    {indianStates.map(state => (
                      <option key={state} value={`${state}, India`} />
                    ))}
                    <option value="Paris, France" />
                    <option value="Tokyo, Japan" />
                    <option value="New York, USA" />
                    <option value="London, UK" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                  <select
                    value={newTripForm.travelers}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, travelers: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newTripForm.startDate}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newTripForm.endDate}
                    onChange={(e) => setNewTripForm(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <div className="flex space-x-2">
                    <select
                      value={newTripForm.currency}
                      onChange={(e) => setNewTripForm(prev => ({ ...prev, currency: e.target.value as 'USD' | 'INR' }))}
                      className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                    <input
                      type="number"
                      value={newTripForm.budget}
                      onChange={(e) => setNewTripForm(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder={newTripForm.currency === 'USD' ? '2000' : '150000'}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Travel Style</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {['Adventure', 'Relaxation', 'Culture', 'Food & Drink', 'Nature', 'Nightlife'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleTravelStyle(style)}
                      className={`p-3 rounded-2xl border-2 transition-all duration-200 text-sm font-medium ${
                        newTripForm.travelStyles.includes(style)
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {newTripForm.travelStyles.includes(style) && <Check className="w-4 h-4 inline mr-1" />}
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newTripForm.notes}
                  onChange={(e) => setNewTripForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requirements..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTripModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {shareModal.isOpen && (
        <ShareModal
          isOpen={shareModal.isOpen}
          onClose={() => setShareModal({ isOpen: false, item: null })}
          title={shareModal.item?.name || shareModal.item?.destination || 'Travel Destination'}
          description={shareModal.item?.description || 'Check out this amazing travel destination!'}
        />
      )}

      {collaborateModal.isOpen && (
        <CollaborateModal
          isOpen={collaborateModal.isOpen}
          onClose={() => setCollaborateModal({ isOpen: false, trip: null })}
          tripTitle={collaborateModal.trip?.destination || 'Trip'}
        />
      )}

      {packingModal.isOpen && (
        <PackingListModal
          isOpen={packingModal.isOpen}
          onClose={() => setPackingModal({ isOpen: false, trip: null })}
          destination={packingModal.trip?.destination || 'Destination'}
          duration={7}
          season="summer"
        />
      )}
    </div>
  );
}

export default App;