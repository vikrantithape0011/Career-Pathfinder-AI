import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SavedCareer {
  title: string;
  matchPercentage: number;
  dateAdded: string;
  path: string;
}

interface SavedCareersContextType {
  savedCareers: SavedCareer[];
  addCareer: (career: SavedCareer) => void;
  removeCareer: (path: string) => void;
  isSaved: (path: string) => boolean;
}

const SavedCareersContext = createContext<SavedCareersContextType | undefined>(undefined);

export const SavedCareersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedCareers, setSavedCareers] = useState<SavedCareer[]>([]);

  const addCareer = (career: SavedCareer) => {
    if (!isSaved(career.path)) {
      setSavedCareers([...savedCareers, career]);
    }
  };

  const removeCareer = (path: string) => {
    setSavedCareers(savedCareers.filter(career => career.path !== path));
  };

  const isSaved = (path: string) => {
    return savedCareers.some(career => career.path === path);
  };

  return (
    <SavedCareersContext.Provider value={{ savedCareers, addCareer, removeCareer, isSaved }}>
      {children}
    </SavedCareersContext.Provider>
  );
};

export const useSavedCareers = () => {
  const context = useContext(SavedCareersContext);
  if (context === undefined) {
    throw new Error('useSavedCareers must be used within a SavedCareersProvider');
  }
  return context;
}; 