import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, type UserProfile } from '../contexts/UserContext';

const Settings = () => {
  const { userProfile, updateProfile } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    joinedDate: '',
    interests: [],
    notifications: false,
    emailUpdates: false
  });

  useEffect(() => {
    if (userProfile) {
    setFormData(userProfile);
    }
  }, [userProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
    updateProfile(formData);
    navigate('/profile');
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev: UserProfile) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i: string) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const availableInterests = [
    'Software Development',
    'Data Science',
    'AI/ML',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
  ];

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
            
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev: UserProfile) => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev: UserProfile) => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Career Interests */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Career Interests</h2>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-3">
                      {availableInterests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestChange(interest)}
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                            formData.interests.includes(interest)
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="notifications"
                        type="checkbox"
                        checked={formData.notifications}
                        onChange={(e) => setFormData((prev: UserProfile) => ({ ...prev, notifications: e.target.checked }))}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications" className="ml-3 text-sm text-gray-700">
                        Enable push notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="emailUpdates"
                        type="checkbox"
                        checked={formData.emailUpdates}
                        onChange={(e) => setFormData((prev: UserProfile) => ({ ...prev, emailUpdates: e.target.checked }))}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="emailUpdates" className="ml-3 text-sm text-gray-700">
                        Receive email updates
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 