import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, DollarSign, Users, Calendar, Compass, Mountain, Waves, Building, TreePine, Camera, Heart, Plane } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: string;
  highlights: string[];
  description: string;
  bestTime: string;
  activities: string[];
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 2847,
    price: 1200,
    duration: '5-7 days',
    difficulty: 'Easy',
    category: 'Beach & Culture',
    highlights: ['Stunning sunsets', 'White-washed buildings', 'Volcanic beaches', 'Wine tasting'],
    description: 'Experience the magic of Santorini with its iconic blue domes, breathtaking sunsets, and unique volcanic landscape.',
    bestTime: 'April - October',
    activities: ['Photography', 'Wine Tours', 'Boat Trips', 'Beach Relaxation']
  },
  {
    id: '2',
    name: 'Machu Picchu',
    country: 'Peru',
    continent: 'South America',
    image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 1923,
    price: 1800,
    duration: '7-10 days',
    difficulty: 'Challenging',
    category: 'Adventure & Culture',
    highlights: ['Ancient Incan ruins', 'Andes Mountains', 'Sacred Valley', 'Inca Trail'],
    description: 'Discover the lost city of the Incas, perched high in the Andes mountains with breathtaking views and rich history.',
    bestTime: 'May - September',
    activities: ['Hiking', 'Cultural Tours', 'Photography', 'Archaeological Exploration']
  },
  {
    id: '3',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 3156,
    price: 1500,
    duration: '4-6 days',
    difficulty: 'Easy',
    category: 'Culture & Nature',
    highlights: ['Ancient temples', 'Cherry blossoms', 'Traditional gardens', 'Geisha districts'],
    description: 'Immerse yourself in traditional Japanese culture with ancient temples, beautiful gardens, and historic districts.',
    bestTime: 'March - May, October - November',
    activities: ['Temple Visits', 'Garden Tours', 'Cultural Experiences', 'Food Tours']
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 4231,
    price: 900,
    duration: '7-14 days',
    difficulty: 'Easy',
    category: 'Beach & Culture',
    highlights: ['Rice terraces', 'Hindu temples', 'Tropical beaches', 'Yoga retreats'],
    description: 'Experience the perfect blend of culture, nature, and relaxation in this tropical paradise.',
    bestTime: 'April - October',
    activities: ['Beach Activities', 'Temple Tours', 'Yoga', 'Cultural Workshops']
  },
  {
    id: '5',
    name: 'Iceland Ring Road',
    country: 'Iceland',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 1567,
    price: 2200,
    duration: '10-14 days',
    difficulty: 'Moderate',
    category: 'Nature & Adventure',
    highlights: ['Northern Lights', 'Geysers', 'Waterfalls', 'Glaciers'],
    description: 'Journey through Iceland\'s dramatic landscapes, from glaciers to geysers, waterfalls to volcanic fields.',
    bestTime: 'June - August, September - March (Northern Lights)',
    activities: ['Road Trip', 'Northern Lights', 'Glacier Hiking', 'Hot Springs']
  },
  {
    id: '6',
    name: 'Maldives',
    country: 'Maldives',
    continent: 'Asia',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 2134,
    price: 3500,
    duration: '5-10 days',
    difficulty: 'Easy',
    category: 'Beach & Luxury',
    highlights: ['Overwater villas', 'Crystal clear waters', 'Coral reefs', 'Luxury resorts'],
    description: 'Escape to paradise with pristine beaches, crystal-clear waters, and world-class luxury accommodations.',
    bestTime: 'November - April',
    activities: ['Snorkeling', 'Diving', 'Spa Treatments', 'Water Sports']
  },
  {
    id: '7',
    name: 'Swiss Alps',
    country: 'Switzerland',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 1876,
    price: 2800,
    duration: '7-10 days',
    difficulty: 'Moderate',
    category: 'Nature & Adventure',
    highlights: ['Mountain peaks', 'Alpine lakes', 'Scenic trains', 'Hiking trails'],
    description: 'Experience the majestic beauty of the Swiss Alps with pristine mountain landscapes and charming villages.',
    bestTime: 'June - September, December - March',
    activities: ['Hiking', 'Skiing', 'Scenic Trains', 'Mountain Climbing']
  },
  {
    id: '8',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    image: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 3892,
    price: 1600,
    duration: '5-8 days',
    difficulty: 'Easy',
    category: 'Urban & Culture',
    highlights: ['Modern skyline', 'Traditional districts', 'Food scene', 'Technology'],
    description: 'Discover the perfect blend of ultra-modern city life and traditional Japanese culture in the world\'s largest metropolis.',
    bestTime: 'March - May, September - November',
    activities: ['City Tours', 'Food Experiences', 'Shopping', 'Cultural Sites']
  }
];

const categories = ['All', 'Beach & Culture', 'Adventure & Culture', 'Culture & Nature', 'Beach & Luxury', 'Nature & Adventure', 'Urban & Culture'];
const continents = ['All', 'Europe', 'Asia', 'South America', 'North America', 'Africa', 'Oceania'];
const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesContinent = selectedContinent === 'All' || destination.continent === selectedContinent;
    const matchesDifficulty = selectedDifficulty === 'All' || destination.difficulty === selectedDifficulty;
    const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesContinent && matchesDifficulty && matchesPrice;
  });

  const toggleFavorite = (destinationId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(destinationId)) {
      newFavorites.delete(destinationId);
    } else {
      newFavorites.add(destinationId);
    }
    setFavorites(newFavorites);
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Beach')) return Waves;
    if (category.includes('Adventure')) return Mountain;
    if (category.includes('Urban')) return Building;
    if (category.includes('Nature')) return TreePine;
    return Compass;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Explore Destinations</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing places around the world and plan your next adventure
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50">
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search destinations, countries, or activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-200"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Continent Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Continent</label>
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {continents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredDestinations.length}</span> destinations
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Sort by:</span>
          <select className="border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map((destination, index) => {
          const CategoryIcon = getCategoryIcon(destination.category);
          return (
            <div
              key={destination.id}
              className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer border border-gray-200/50 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Elements */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-gray-900">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {destination.difficulty}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination.id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    favorites.has(destination.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.has(destination.id) ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{destination.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <CategoryIcon className="w-4 h-4" />
                      <span>{destination.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">${destination.price}</div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium">
                    View Details
                  </button>
                  <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                    <Plane className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedContinent('All');
              setSelectedDifficulty('All');
              setPriceRange([0, 5000]);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}