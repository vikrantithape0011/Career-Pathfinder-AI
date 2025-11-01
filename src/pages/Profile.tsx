import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, Briefcase, Star, ChevronRight, Edit, Trash2, Plus, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Profile = () => {
  const { userProfile, loading, error, updateProfile, removeSavedCareer } = useUser();
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [editError, setEditError] = useState<string | null>(null);

  const handleAddInterest = async () => {
    if (!newInterest.trim()) return;
    
    try {
      setEditError(null);
      await updateProfile({
        interests: [...(userProfile?.interests || []), newInterest.trim()]
      });
      setNewInterest('');
    } catch (err: any) {
      setEditError(err.message || 'Failed to add interest');
    }
  };

  const handleRemoveInterest = async (interestToRemove: string) => {
    try {
      setEditError(null);
      await updateProfile({
        interests: userProfile?.interests.filter(interest => interest !== interestToRemove) || []
      });
    } catch (err: any) {
      setEditError(err.message || 'Failed to remove interest');
    }
  };

  const handleRemoveSavedCareer = async (careerTitle: string) => {
    try {
      await removeSavedCareer(careerTitle);
    } catch (err: any) {
      console.error('Error removing saved career:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 pb-12 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen pt-16 pb-12 flex items-center justify-center">
        <div className="text-gray-600">No profile data available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">{userProfile.name}</h1>
                <div className="mt-2 flex items-center text-indigo-100">
                  <Mail className="h-5 w-5 mr-2" />
                  {userProfile.email}
                </div>
                <div className="mt-1 flex items-center text-indigo-100">
                  <Calendar className="h-5 w-5 mr-2" />
                  Joined {userProfile.joinedDate}
                </div>
              </div>
              <Link
                to="/settings"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Career Interests */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Career Interests</h2>
              <button
                onClick={() => setIsEditingInterests(!isEditingInterests)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isEditingInterests ? 'Done' : 'Edit Interests'}
              </button>
            </div>

            {editError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
                <span className="block sm:inline">{editError}</span>
              </div>
            )}

            {isEditingInterests ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add new interest"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    onClick={handleAddInterest}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1 text-indigo-600 hover:text-indigo-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Saved Careers */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Saved Careers</h2>
            {userProfile.savedCareers.length === 0 ? (
              <p className="text-gray-500">No saved careers yet.</p>
            ) : (
              <div className="space-y-4">
                {userProfile.savedCareers.map((careerTitle) => (
                  <div
                    key={careerTitle}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{careerTitle}</h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/career-details/${encodeURIComponent(careerTitle)}`}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleRemoveSavedCareer(careerTitle)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 