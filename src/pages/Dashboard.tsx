import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
 
  return (
    <div className="min-h-screen pt-16 pb-6 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Career Pathfinder AI!</h1>
          <p className="mt-4 text-xl text-gray-600">Choose your journey to professional success</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Know Your Skills Card */}
          <div 
            className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => navigate('/test')}
          >
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex-shrink-0 mb-4">
                  <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Brain className="h-12 w-12 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Know Your Skills</h2>
                  <p className="text-gray-600 mb-4">Discover your strengths and potential through our advanced psychometric assessment</p>
                  <div className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-500">
                    Take Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Know Your Career Path Card */}
          <div 
            className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => navigate('/career-search')}
          >
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex-shrink-0 mb-4">
                  <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Career Paths</h2>
                  <p className="text-gray-600 mb-4">Find detailed roadmaps for various careers and plan your professional journey</p>
                  <div className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-500">
                    Explore Careers <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
