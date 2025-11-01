import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import debounce from 'lodash/debounce';

interface Career {
  title: string;
  Description: string;
  category?: string;
  Skills?: string[];
}

const CareerSearch = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Memoize categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    const uniqueCategories = new Set(careers.map(career => career.category as string));
    return ['All', ...Array.from(uniqueCategories)];
  }, [careers]);

  // Memoize filtered careers to prevent unnecessary recalculations
  const filteredCareers = useMemo(() => {
    return careers.filter(career => {
      const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
      return matchesCategory;
    });
  }, [careers, selectedCategory]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const response = await axios.get<Career[]>(
          `/api/careers/search?query=${encodeURIComponent(query)}`,
          config
        );
        setCareers(response.data);
      } catch (err) {
        console.error("Error fetching careers:", err);
        setError("Failed to load careers. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 300),
    [user]
  );

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set a new timeout
    const timeout = setTimeout(() => {
      debouncedSearch(value);
    }, 300);
    
    setSearchTimeout(timeout);
  };

  // Initial load
  useEffect(() => {
    if (user) {
      debouncedSearch('');
    } else {
      setLoading(false);
      setCareers([]);
    }

    // Cleanup
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      debouncedSearch.cancel();
    };
  }, [user, debouncedSearch]);

  const handleCareerClick = (careerTitle: string) => {
    const urlPath = careerTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/career-roadmap/${urlPath}`);
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Explore Career Paths</h1>
          <p className="mt-3 text-xl text-gray-500">
            Search and discover detailed roadmaps for various career paths
          </p>
        </div>

        <div className="mt-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a career..."
                className="ml-2 flex-1 border-none focus:ring-0 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
        
        {error && <p className="text-center mt-8 text-red-500">{error}</p>}

        {!user && !loading && (
          <p className="text-center mt-8 text-gray-500">Please log in to explore career paths.</p>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <div
                  key={career.title}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleCareerClick(career.title)}
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-indigo-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900">{career.title}</h2>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{career.Description}</p>
                        {career.category && (
                          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {career.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No careers found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerSearch; 