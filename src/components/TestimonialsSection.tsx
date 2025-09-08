import React, { useState } from 'react';
import { Play, Pause, Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  destination: string;
  rating: number;
  date: string;
  type: 'video' | 'text';
  content: string;
  videoUrl?: string;
  videoThumbnail?: string;
  avatar: string;
  tripType: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Brad Young',
    location: 'San Francisco, CA',
    destination: 'Bali, Indonesia',
    rating: 5,
    date: '2024-01-15',
    type: 'video',
    content: 'This platform made planning my Bali trip absolutely seamless. The AI recommendations were spot-on, and I discovered hidden gems I never would have found otherwise. The itinerary planning feature saved me hours of research!',
    videoUrl: 'https://player.vimeo.com/video/1116381494?badge=0&autopause=0&player_id=0&app_id=58479',
    videoThumbnail: 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    tripType: 'Adventure & Culture'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    location: 'London, UK',
    destination: 'Santorini, Greece',
    rating: 5,
    date: '2024-02-20',
    type: 'text',
    content: 'The weather alerts and packing suggestions were incredibly helpful. I felt so prepared for my trip to Santorini. The local recommendations led us to the most amazing sunset spots and authentic restaurants.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    tripType: 'Romantic Getaway'
  },
  {
    id: '3',
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    destination: 'Tokyo, Japan',
    rating: 5,
    date: '2024-03-10',
    type: 'video',
    content: 'As someone who travels frequently for business, this platform has become my go-to for planning personal trips. The collaboration features made it easy to plan with my family, and the budget tracking kept us on target.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    videoThumbnail: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    tripType: 'Cultural Exploration'
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    location: 'Madrid, Spain',
    destination: 'Machu Picchu, Peru',
    rating: 5,
    date: '2024-02-28',
    type: 'text',
    content: 'The adventure planning tools were fantastic! From altitude preparation tips to gear recommendations, everything was perfectly organized. The local guide connections made our Machu Picchu trek unforgettable.',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    tripType: 'Adventure Trek'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleVideo = (testimonialId: string) => {
    setPlayingVideo(playingVideo === testimonialId ? null : testimonialId);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real travelers who've used our platform to create unforgettable journeys
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Video/Image Side */}
            <div className="relative h-96 lg:h-auto">
              {currentTestimonial.type === 'video' ? (
                <div className="relative h-full">
                  {playingVideo === currentTestimonial.id ? (
                    <iframe
                      src={currentTestimonial.videoUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={`${currentTestimonial.name} testimonial video`}
                    />
                  ) : (
                    <>
                      <img
                        src={currentTestimonial.videoThumbnail}
                        alt={`${currentTestimonial.name} testimonial`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button
                          onClick={() => toggleVideo(currentTestimonial.id)}
                          className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-2xl"
                        >
                          <Play className="w-8 h-8 text-blue-600 ml-1" />
                        </button>
                      </div>
                    </>
                  )}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Video Testimonial
                  </div>
                </div>
              ) : (
                <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Quote className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-2xl font-light">"{currentTestimonial.content.substring(0, 100)}..."</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{currentTestimonial.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({currentTestimonial.rating}/5)</span>
              </div>

              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(currentTestimonial.date).toLocaleDateString()}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                    {currentTestimonial.tripType}
                  </span>
                </div>
                <span className="font-medium">Trip to {currentTestimonial.destination}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600">Countries Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
}