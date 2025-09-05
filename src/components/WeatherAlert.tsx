import React from 'react';
import { Cloud, Sun, CloudRain, SunSnow as Snow, Wind, Thermometer, Droplets, Eye } from 'lucide-react';

interface WeatherData {
  quarter: string;
  temperature: { min: number; max: number };
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  visibility: string;
  description: string;
  alert?: string;
}

interface WeatherAlertProps {
  destination: string;
  weatherData: WeatherData[];
}

export default function WeatherAlert({ destination, weatherData }: WeatherAlertProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      case 'snowy': return Snow;
      case 'windy': return Wind;
      default: return Sun;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'text-yellow-500 bg-yellow-50';
      case 'cloudy': return 'text-gray-500 bg-gray-50';
      case 'rainy': return 'text-blue-500 bg-blue-50';
      case 'snowy': return 'text-blue-300 bg-blue-50';
      case 'windy': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50">
      <div className="flex items-center space-x-2 mb-4">
        <Thermometer className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-900">Weather Forecast - {destination}</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherData.map((weather, index) => {
          const WeatherIcon = getWeatherIcon(weather.condition);
          const colorClass = getConditionColor(weather.condition);
          
          return (
            <div key={index} className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{weather.quarter}</span>
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <WeatherIcon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Temperature</span>
                  <span className="font-medium text-gray-900">
                    {weather.temperature.min}° - {weather.temperature.max}°C
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{weather.humidity}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-gray-500" />
                    <span className="text-sm text-gray-600">Visibility</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{weather.visibility}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{weather.description}</p>

              {weather.alert && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                  <p className="text-xs text-orange-700 font-medium">⚠️ {weather.alert}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-2xl">
        <p className="text-sm text-blue-700">
          <strong>Travel Tip:</strong> Pack accordingly for varying weather conditions. Check local weather updates before departure.
        </p>
      </div>
    </div>
  );
}