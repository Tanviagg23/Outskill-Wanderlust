import React, { useState } from 'react';
import { X, Heart, Share2, Download, MapPin, Calendar, Camera, Filter, Grid, List } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  location: string;
  photographer: string;
  date: string;
  category: string;
  likes: number;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Santorini Sunset',
    location: 'Oia, Greece',
    photographer: 'Maria Komninos',
    date: '2024-01-15',
    category: 'Architecture',
    likes: 1247,
    description: 'The iconic blue domes and white buildings of Santorini create a perfect contrast against the golden sunset.'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kyoto Temple',
    location: 'Kyoto, Japan',
    photographer: 'Takeshi Yamamoto',
    date: '2024-01-20',
    category: 'Culture',
    likes: 892,
    description: 'Ancient temple surrounded by cherry blossoms in the heart of traditional Japan.'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Bali Rice Terraces',
    location: 'Ubud, Bali',
    photographer: 'Indira Sari',
    date: '2024-01-25',
    category: 'Nature',
    likes: 1156,
    description: 'Stunning rice terraces carved into the hillsides of Ubud, showcasing traditional Balinese agriculture.'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Machu Picchu',
    location: 'Cusco, Peru',
    photographer: 'Carlos Rodriguez',
    date: '2024-02-01',
    category: 'Adventure',
    likes: 2103,
    description: 'The lost city of the Incas emerges from the morning mist high in the Andes mountains.'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Maldives Paradise',
    location: 'Maldives',
    photographer: 'Ahmed Hassan',
    date: '2024-02-05',
    category: 'Beach',
    likes: 1834,
    description: 'Crystal clear turquoise waters and pristine white sand beaches in the tropical paradise of Maldives.'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Iceland Northern Lights',
    location: 'Reykjavik, Iceland',
    photographer: 'Erik Johansson',
    date: '2024-02-10',
    category: 'Nature',
    likes: 1567,
    description: 'The magical aurora borealis dancing across the night sky over Iceland\'s dramatic landscape.'
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Paris Eiffel Tower',
    location: 'Paris, France',
    photographer: 'Sophie Laurent',
    date: '2024-02-15',
    category: 'Architecture',
    likes: 2456,
    description: 'The iconic Eiffel Tower illuminated against the Parisian night sky, a symbol of romance and elegance.'
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Tokyo Skyline',
    location: 'Tokyo, Japan',
    photographer: 'Hiroshi Tanaka',
    date: '2024-02-20',
    category: 'Urban',
    likes: 1923,
    description: 'The futuristic skyline of Tokyo showcasing the perfect blend of modern architecture and traditional culture.'
  }
];

const categories = ['All', 'Architecture', 'Nature', 'Culture', 'Beach', 'Adventure', 'Urban'];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleLike = (imageId: string) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Travel Gallery</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover breathtaking destinations through the lens of our community photographers
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">{filteredImages.length} photos</span>
          <div className="flex bg-white/80 rounded-2xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all duration-200 ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(image.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      likedImages.has(image.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all duration-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{image.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {image.photographer}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="flex space-x-6">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-32 h-24 object-cover rounded-2xl"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{image.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{image.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Camera className="w-3 h-3" />
                          <span>{image.photographer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(image.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(image.id);
                        }}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          likedImages.has(image.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                      </button>
                      <span className="text-sm text-gray-500">
                        {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{image.description}</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-96 object-cover"
            />
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedImage.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Camera className="w-4 h-4" />
                      <span>{selectedImage.photographer}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleLike(selectedImage.id)}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      likedImages.has(selectedImage.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedImages.has(selectedImage.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{selectedImage.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
                  {selectedImage.category}
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Heart className="w-4 h-4" />
                  <span>{selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}