import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Users, Calculator, BookOpen, Layout } from 'lucide-react';
import { tests } from '../services/api';

interface TestResults {
  personality: string[];
  interests: string[];
  skills: string[];
  date: string;
}

const TestResults = () => {
  const [results, setResults] = useState<TestResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await tests.getResults();
        setResults(data.psychometric);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch test results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">No test results found. Please take the test first.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Test Results</h1>
          
          <div className="space-y-6">
            {/* Personality Traits */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Brain className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Personality Traits</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.personality.map((trait, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Target className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Users className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Test Date */}
            <div className="text-sm text-gray-500">
              Test completed on: {new Date(results.date).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate('/career-recommendations')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Career Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults; 