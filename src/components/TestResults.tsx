import React, { useEffect, useState } from 'react';
import { Brain, Target, Layout, Users, Calculator, BookOpen, Palette, HandHeart, Crown } from 'lucide-react';
import { ScoreCalculator } from '../utils/ScoreCalculator';
import { assessment } from '../data/assessment';
import axios from 'axios';

interface TestResultsProps {
  // answers: any[]; // Removed answers prop
  // sectionId: string; // sectionId might still be useful to know which section the results are for, but the data comes from backend
}

const MAX_SCORE = 100;

const abilities = [
  { id: 'cognition', title: 'Cognition', icon: Brain },
  { id: 'reasoning', title: 'Reasoning', icon: Target },
  { id: 'figuralMemory', title: 'Figural Memory', icon: Layout },
  { id: 'spatialAbility', title: 'Spatial Ability', icon: Layout },
  { id: 'verbalAbility', title: 'Verbal Ability', icon: BookOpen },
  { id: 'socialAbility', title: 'Social Ability', icon: Users },
  { id: 'numericalAbility', title: 'Numerical Ability', icon: Calculator },
  { id: 'numericalMemory', title: 'Numerical Memory', icon: Calculator }
];

const orientations = [
  { id: 'knowledge', title: 'Knowledge', icon: BookOpen },
  { id: 'practical', title: 'Practical', icon: Target },
  { id: 'artistic', title: 'Artistic', icon: Palette },
  { id: 'social', title: 'Social', icon: HandHeart },
  { id: 'powerCopingStyle', title: 'Power/Coping Style', icon: Crown }
];

const TestResults: React.FC<TestResultsProps> = ({ /* sectionId */ }) => {
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Retrieve the token from storage (adjust 'localStorage' and key if needed)
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        console.log('Fetching results - Retrieved token:', token); // Debug log for token

        if (!token) {
          setError('User not authenticated. Please log in.');
          setLoading(false);
          // Optionally redirect to login page
          // navigate('/login');
          return;
        }

        // Include the token in the Authorization header
        const response = await axios.get('/api/tests/results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTestData(response.data); // response.data should contain { ...user.testResults, predictedCareers }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching test results:', err);
        // Check if the error is due to unauthorized (e.g., expired token)
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
          // Optionally clear token and redirect to login page
          // localStorage.removeItem('token');
          // navigate('/login');
        } else {
          setError('Failed to fetch test results.');
        }
        setLoading(false);
      }
    };

    fetchResults();
  }, []); // Empty dependency array means this runs once on mount

  // Debug: Log the fetched testData
  useEffect(() => {
    console.log('Fetched testData:', testData);
  }, [testData]);

  const formatScore = (score: number) => {
    return Math.round(score);
  };

  // Compute max possible orientation scores once
  const maxOrientationScores = ScoreCalculator.computeMaxOrientationScores(assessment);

  // Helper to get raw ability scores for display (now from fetched data)
  const getRawAbilityScores = (scoresData: any) => {
    const rawScores: { [key: string]: number } = {
      cognition: 0,
      reasoning: 0,
      figuralMemory: 0,
      spatialAbility: 0,
      verbalAbility: 0,
      numericalAbility: 0,
      numericalMemory: 0,
      socialAbility: 0,
    };
    // Assuming scoresData is the psychometric.scores object from backend
    if (scoresData?.abilities) {
      Object.entries(scoresData.abilities).forEach(([ability, score]) => {
         rawScores[ability] = (score as number); // Assuming backend sends raw scores here
      });
    }
    return rawScores;
  };

  // Modify render functions to use testData?.psychometric?.scores
  const renderAbilityScores = () => {
    // Use the percentage scores directly from the backend
    const percentageScores = testData?.psychometric?.scores?.abilities || {};
    console.log('Percentage ability scores from backend:', percentageScores); // Log percentage scores

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Ability Assessment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {abilities.map(ability => {
            const score = percentageScores[ability.id as keyof typeof percentageScores] || 0;
            // Raw score is not directly available or needed for this display anymore
            // If needed, you would fetch it separately or modify the backend response
            const raw = 'N/A'; // Placeholder or remove if not displaying raw

            return (
              <div key={ability.id} className="bg-white rounded-lg shadow-md p-3 border border-gray-200 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="mr-3 text-blue-600 p-2 bg-blue-100 rounded-full flex items-center justify-center">
                      {React.createElement(ability.icon, { size: 20 })}
                    </div>
                    <h4 className="text-lg font-medium text-gray-700">
                      {ability.title}
                    </h4>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    {formatScore(score)}%
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Your score: <span className="font-semibold text-gray-700">{score}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderOrientationScores = () => {
    // Use the percentage scores directly from the backend
    const percentageScores = testData?.psychometric?.scores?.orientations || {};
    console.log('Percentage orientation scores from backend:', percentageScores); // Log percentage scores

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Orientation Assessment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orientations.map(orientation => {
            const score = percentageScores[orientation.id as keyof typeof percentageScores] || 0;
            const maxScore = maxOrientationScores[orientation.id as keyof typeof maxOrientationScores] || 0;

            // Apply similar aesthetic styling as abilities
            return (
              <div key={orientation.id} className="bg-white rounded-lg shadow-md p-3 border border-gray-200 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="mr-3 text-green-600 p-2 bg-green-100 rounded-full flex items-center justify-center">
                      {React.createElement(orientation.icon, { size: 20 })}
                    </div>
                    <h4 className="text-lg font-medium text-gray-700">
                      {orientation.title}
                    </h4>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {formatScore(score)}%
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Max possible score for this orientation: <span className="font-semibold text-gray-700">{maxScore}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading test results...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (!testData || !testData.psychometric || !testData.psychometric.scores) {
      return <div className="text-center text-gray-600">No test results found.</div>;
  }

  // Determine which scores to render based on the available data
  // Assuming you might have either or both sections saved
  const hasAbilityScores = testData.psychometric.scores.abilities && Object.keys(testData.psychometric.scores.abilities).length > 0;
  const hasOrientationScores = testData.psychometric.scores.orientations && Object.keys(testData.psychometric.scores.orientations).length > 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Results</h2>
      {hasAbilityScores && renderAbilityScores()}
      {hasOrientationScores && renderOrientationScores()}
    </div>
  );
};

export default TestResults; 