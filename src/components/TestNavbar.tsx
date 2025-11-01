import React, { useState, useEffect } from 'react';
import { User, LogOut, ChevronDown, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TestNavbarProps {
  sectionName: string;
  timeRemaining: number;
}

const TestNavbar = ({ sectionName, timeRemaining }: TestNavbarProps) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? Your test progress will be lost.')) {
      setIsProfileOpen(false);
      logout();
    }
  };

  return (
    <nav className="bg-white shadow-sm w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Section name */}
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-900">{sectionName}</span>
          </div>

          {/* Center - Timer */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="font-mono text-lg font-medium text-gray-900">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Right side - User profile */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="font-medium text-gray-900">{user?.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Exit Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TestNavbar; 