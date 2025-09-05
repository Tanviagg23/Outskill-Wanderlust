import React, { useState } from 'react';
import { X, Package, Plus, Check, Shirt, Plane, Camera, Pill, Zap } from 'lucide-react';

interface PackingItem {
  id: string;
  name: string;
  category: string;
  packed: boolean;
  essential: boolean;
}

interface PackingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  duration: number;
  season: string;
}

export default function PackingListModal({ isOpen, onClose, destination, duration, season }: PackingListModalProps) {
  const [customItem, setCustomItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('clothing');

  const generatePackingList = (): PackingItem[] => {
    const baseItems: PackingItem[] = [
      // Clothing
      { id: '1', name: 'T-shirts', category: 'clothing', packed: false, essential: true },
      { id: '2', name: 'Pants/Jeans', category: 'clothing', packed: false, essential: true },
      { id: '3', name: 'Underwear', category: 'clothing', packed: false, essential: true },
      { id: '4', name: 'Socks', category: 'clothing', packed: false, essential: true },
      { id: '5', name: 'Pajamas', category: 'clothing', packed: false, essential: false },
      
      // Documents
      { id: '6', name: 'Passport', category: 'documents', packed: false, essential: true },
      { id: '7', name: 'Flight tickets', category: 'documents', packed: false, essential: true },
      { id: '8', name: 'Hotel confirmations', category: 'documents', packed: false, essential: true },
      { id: '9', name: 'Travel insurance', category: 'documents', packed: false, essential: true },
      
      // Electronics
      { id: '10', name: 'Phone charger', category: 'electronics', packed: false, essential: true },
      { id: '11', name: 'Camera', category: 'electronics', packed: false, essential: false },
      { id: '12', name: 'Power bank', category: 'electronics', packed: false, essential: false },
      { id: '13', name: 'Adapter/Converter', category: 'electronics', packed: false, essential: true },
      
      // Health & Beauty
      { id: '14', name: 'Toothbrush', category: 'health', packed: false, essential: true },
      { id: '15', name: 'Toothpaste', category: 'health', packed: false, essential: true },
      { id: '16', name: 'Medications', category: 'health', packed: false, essential: true },
      { id: '17', name: 'Sunscreen', category: 'health', packed: false, essential: false },
    ];

    // Add season-specific items
    if (season === 'winter') {
      baseItems.push(
        { id: '18', name: 'Winter jacket', category: 'clothing', packed: false, essential: true },
        { id: '19', name: 'Gloves', category: 'clothing', packed: false, essential: false },
        { id: '20', name: 'Warm hat', category: 'clothing', packed: false, essential: false }
      );
    } else if (season === 'summer') {
      baseItems.push(
        { id: '21', name: 'Swimwear', category: 'clothing', packed: false, essential: false },
        { id: '22', name: 'Sandals', category: 'clothing', packed: false, essential: false },
        { id: '23', name: 'Sun hat', category: 'clothing', packed: false, essential: false }
      );
    }

    // Add destination-specific items
    if (destination.toLowerCase().includes('beach') || destination.toLowerCase().includes('maldives')) {
      baseItems.push(
        { id: '24', name: 'Beach towel', category: 'misc', packed: false, essential: false },
        { id: '25', name: 'Snorkel gear', category: 'misc', packed: false, essential: false }
      );
    }

    return baseItems;
  };

  const [packingItems, setPackingItems] = useState<PackingItem[]>(generatePackingList());

  if (!isOpen) return null;

  const togglePacked = (id: string) => {
    setPackingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const addCustomItem = () => {
    if (!customItem.trim()) return;

    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: customItem,
      category: selectedCategory,
      packed: false,
      essential: false
    };

    setPackingItems([...packingItems, newItem]);
    setCustomItem('');
  };

  const removeItem = (id: string) => {
    setPackingItems(items => items.filter(item => item.id !== id));
  };

  const categories = [
    { id: 'clothing', name: 'Clothing', icon: Shirt, color: 'bg-blue-100 text-blue-600' },
    { id: 'documents', name: 'Documents', icon: Plane, color: 'bg-green-100 text-green-600' },
    { id: 'electronics', name: 'Electronics', icon: Zap, color: 'bg-purple-100 text-purple-600' },
    { id: 'health', name: 'Health & Beauty', icon: Pill, color: 'bg-pink-100 text-pink-600' },
    { id: 'misc', name: 'Miscellaneous', icon: Package, color: 'bg-gray-100 text-gray-600' }
  ];

  const getItemsByCategory = (category: string) => {
    return packingItems.filter(item => item.category === category);
  };

  const packedCount = packingItems.filter(item => item.packed).length;
  const totalCount = packingItems.length;
  const progressPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Packing List</h3>
              <p className="text-gray-600">{destination} • {duration} days • {season}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{packedCount}/{totalCount} items packed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-200px)]">
          {/* Categories Sidebar */}
          <div className="w-64 bg-gray-50 p-4 overflow-y-auto">
            <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => {
                const itemCount = getItemsByCategory(category.id).length;
                const packedInCategory = getItemsByCategory(category.id).filter(item => item.packed).length;
                const CategoryIcon = category.icon;
                
                return (
                  <div key={category.id} className="p-3 bg-white rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{packedInCategory}/{itemCount} packed</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-green-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: itemCount > 0 ? `${(packedInCategory / itemCount) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Item */}
            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900">Add Custom Item</h4>
              <input
                type="text"
                placeholder="Item name"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                onClick={addCustomItem}
                disabled={!customItem.trim()}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryItems = getItemsByCategory(category.id);
                if (categoryItems.length === 0) return null;

                const CategoryIcon = category.icon;
                
                return (
                  <div key={category.id}>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                            item.packed
                              ? 'bg-green-50 border-green-200'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => togglePacked(item.id)}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                item.packed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {item.packed && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <div>
                              <span className={`font-medium ${item.packed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                                {item.name}
                              </span>
                              {item.essential && (
                                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                                  Essential
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {!item.essential && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}