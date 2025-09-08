import React, { useState } from 'react';
import { X, DollarSign, Plus, Minus, Calculator, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  name: string;
  amount: number;
  type: 'expense' | 'income';
}

interface BudgetPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BudgetPlannerModal({ isOpen, onClose }: BudgetPlannerModalProps) {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Transportation', name: 'Flight tickets', amount: 800, type: 'expense' },
    { id: '2', category: 'Accommodation', name: 'Hotel (7 nights)', amount: 1200, type: 'expense' },
    { id: '3', category: 'Food', name: 'Meals & dining', amount: 500, type: 'expense' },
    { id: '4', category: 'Activities', name: 'Tours & experiences', amount: 400, type: 'expense' },
    { id: '5', category: 'Shopping', name: 'Souvenirs', amount: 200, type: 'expense' },
    { id: '6', category: 'Miscellaneous', name: 'Emergency fund', amount: 300, type: 'expense' }
  ]);

  const [newItem, setNewItem] = useState({
    category: 'Transportation',
    name: '',
    amount: 0
  });

  const [totalBudget, setTotalBudget] = useState(4000);

  if (!isOpen) return null;

  const categories = [
    'Transportation',
    'Accommodation', 
    'Food',
    'Activities',
    'Shopping',
    'Miscellaneous'
  ];

  const addBudgetItem = () => {
    if (!newItem.name || newItem.amount <= 0) return;

    const item: BudgetItem = {
      id: Date.now().toString(),
      category: newItem.category,
      name: newItem.name,
      amount: newItem.amount,
      type: 'expense'
    };

    setBudgetItems([...budgetItems, item]);
    setNewItem({ category: 'Transportation', name: '', amount: 0 });
  };

  const removeBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const updateItemAmount = (id: string, amount: number) => {
    setBudgetItems(budgetItems.map(item => 
      item.id === id ? { ...item, amount: Math.max(0, amount) } : item
    ));
  };

  const totalExpenses = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const budgetUtilization = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  const getCategoryTotal = (category: string) => {
    return budgetItems
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Transportation': 'bg-blue-100 text-blue-600',
      'Accommodation': 'bg-green-100 text-green-600',
      'Food': 'bg-orange-100 text-orange-600',
      'Activities': 'bg-purple-100 text-purple-600',
      'Shopping': 'bg-pink-100 text-pink-600',
      'Miscellaneous': 'bg-gray-100 text-gray-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Budget Planner</h3>
              <p className="text-gray-600">Plan and track your travel expenses</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Budget Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Total Budget</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">${totalBudget}</span>
                <button
                  onClick={() => setTotalBudget(totalBudget + 100)}
                  className="p-1 bg-blue-200 rounded-full hover:bg-blue-300 transition-colors duration-200"
                >
                  <Plus className="w-3 h-3 text-blue-600" />
                </button>
                <button
                  onClick={() => setTotalBudget(Math.max(0, totalBudget - 100))}
                  className="p-1 bg-blue-200 rounded-full hover:bg-blue-300 transition-colors duration-200"
                >
                  <Minus className="w-3 h-3 text-blue-600" />
                </button>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-900">Total Expenses</span>
              </div>
              <span className="text-2xl font-bold text-red-600">${totalExpenses}</span>
            </div>

            <div className={`rounded-2xl p-4 ${remainingBudget >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Remaining</span>
              </div>
              <span className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${remainingBudget}
              </span>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Budget Utilization</span>
              <span className="font-medium text-gray-900">{budgetUtilization.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  budgetUtilization > 100 ? 'bg-red-500' : budgetUtilization > 80 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              />
            </div>
            {budgetUtilization > 100 && (
              <div className="flex items-center space-x-2 mt-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Budget exceeded by ${totalExpenses - totalBudget}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-300px)]">
          {/* Categories Sidebar */}
          <div className="w-80 bg-gray-50 p-4 overflow-y-auto">
            <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
            
            <div className="space-y-3 mb-6">
              {categories.map((category) => {
                const total = getCategoryTotal(category);
                const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
                
                return (
                  <div key={category} className="bg-white rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{category}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                        ${total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total</div>
                  </div>
                );
              })}
            </div>

            {/* Add New Item */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-3">Add Expense</h5>
              <div className="space-y-3">
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                
                <input
                  type="text"
                  placeholder="Expense name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                
                <input
                  type="number"
                  placeholder="Amount"
                  value={newItem.amount || ''}
                  onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                
                <button
                  onClick={addBudgetItem}
                  disabled={!newItem.name || newItem.amount <= 0}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Expense</span>
                </button>
              </div>
            </div>
          </div>

          {/* Expenses List */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryItems = budgetItems.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category}>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}>
                        {category}
                      </span>
                      <span className="text-sm text-gray-500">
                        ${getCategoryTotal(category)} total
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{item.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateItemAmount(item.id, item.amount - 10)}
                              className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            
                            <span className="font-bold text-gray-900 min-w-[80px] text-center">
                              ${item.amount}
                            </span>
                            
                            <button
                              onClick={() => updateItemAmount(item.id, item.amount + 10)}
                              className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                            
                            <button
                              onClick={() => removeBudgetItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
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