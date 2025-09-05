import React, { useState } from 'react';
import { X, Users, Mail, Plus, UserPlus, Send } from 'lucide-react';

interface CollaborateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
}

interface Collaborator {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'pending' | 'accepted';
}

export default function CollaborateModal({ isOpen, onClose, tripTitle }: CollaborateModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'editor' | 'viewer'>('editor');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'owner',
      status: 'accepted'
    },
    {
      id: '2',
      email: 'sarah.smith@example.com',
      name: 'Sarah Smith',
      role: 'editor',
      status: 'accepted'
    },
    {
      id: '3',
      email: 'mike.wilson@example.com',
      name: 'Mike Wilson',
      role: 'viewer',
      status: 'pending'
    }
  ]);

  if (!isOpen) return null;

  const handleInvite = () => {
    if (!email) return;

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role,
      status: 'pending'
    };

    setCollaborators([...collaborators, newCollaborator]);
    setEmail('');
  };

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-600';
      case 'editor': return 'bg-blue-100 text-blue-600';
      case 'viewer': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Collaborate on Trip</h3>
            <p className="text-sm text-gray-600">{tripTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invite Section */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Invite Collaborators</span>
          </div>
          
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            
            <div className="flex items-center space-x-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'editor' | 'viewer')}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="editor">Editor - Can edit trip details</option>
                <option value="viewer">Viewer - Can only view trip</option>
              </select>
              
              <button
                onClick={handleInvite}
                disabled={!email}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Invite</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collaborators List */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Collaborators ({collaborators.length})</span>
          </div>

          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {collaborator.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{collaborator.name}</div>
                  <div className="text-sm text-gray-500">{collaborator.email}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(collaborator.role)}`}>
                  {collaborator.role}
                </span>
                
                {collaborator.status === 'pending' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">
                    Pending
                  </span>
                )}
                
                {collaborator.role !== 'owner' && (
                  <button
                    onClick={() => removeCollaborator(collaborator.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Share Link */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-blue-900">Share Link</div>
              <div className="text-sm text-blue-600">Anyone with this link can view the trip</div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 text-sm font-medium">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}