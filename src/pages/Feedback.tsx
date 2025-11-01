import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Star } from 'lucide-react';

const Feedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: 5,
    recommendationQuality: '',
    improvements: '',
    additionalComments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', formData);
    // Show success message and redirect
    alert('Thank you for your feedback!');
    navigate('/dashboard');
  };  

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-8">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Share Your Feedback</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate the career recommendations?
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className={`p-2 rounded-full focus:outline-none ${
                        formData.rating >= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendation Quality */}
              <div>
                <label htmlFor="recommendationQuality" className="block text-sm font-medium text-gray-700 mb-2">
                  How accurate were the career recommendations for your skills and interests?
                </label>
                <select
                  id="recommendationQuality"
                  value={formData.recommendationQuality}
                  onChange={(e) => setFormData({ ...formData, recommendationQuality: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                >
                  <option value="">Select an option</option>
                  <option value="very-accurate">Very Accurate</option>
                  <option value="somewhat-accurate">Somewhat Accurate</option>
                  <option value="neutral">Neutral</option>
                  <option value="somewhat-inaccurate">Somewhat Inaccurate</option>
                  <option value="very-inaccurate">Very Inaccurate</option>
                </select>
              </div>

              {/* Improvements */}
              <div>
                <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
                  What could we improve?
                </label>
                <textarea
                  id="improvements"
                  rows={3}
                  value={formData.improvements}
                  onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Share your suggestions for improvement..."
                />
              </div>

              {/* Additional Comments */}
              <div>
                <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  id="additionalComments"
                  rows={3}
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Any other thoughts you'd like to share..."
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 