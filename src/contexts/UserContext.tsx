import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { users } from '../services/api';

export interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  interests: string[];
  notifications: boolean;
  emailUpdates: boolean;
  savedCareers: string[];
}

interface UserContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  removeSavedCareer: (careerTitle: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await users.getProfile();
        setUserProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setError(null);
      const updatedProfile = await users.updateProfile(updates);
      setUserProfile(updatedProfile);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    }
  };

  const removeSavedCareer = async (careerTitle: string) => {
    try {
      setError(null);
      await users.removeSavedCareer(careerTitle);

      setUserProfile(prevProfile => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          savedCareers: prevProfile.savedCareers.filter(career => career !== careerTitle)
        };
      });
      console.log(`Successfully removed saved career from context: ${careerTitle}`);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove saved career');
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, loading, error, updateProfile, removeSavedCareer }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 