import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SavedCareersProvider } from './contexts/SavedCareersContext';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PsychometricTest from './pages/PsychometricTest';
import TestResults from './pages/TestResults';
import CareerRecommendations from './pages/CareerRecommendations';
import CareerPathPage from './pages/CareerPathPage';
import CareerSearch from './pages/CareerSearch';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CareerRoadmap from './pages/careerRoadmap';
import About from './pages/About';
import Contact from './pages/Contact';

function App() { 
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <SavedCareersProvider>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/test"
                    element={
                      <PrivateRoute>
                        <PsychometricTest />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/test-results"
                    element={
                      <PrivateRoute>
                        <TestResults />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/recommendations"
                    element={
                      <PrivateRoute>
                        <CareerRecommendations />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/career-search" element={<CareerSearch />} />
                  <Route path="/career-roadmap/:careerPath" element={<CareerRoadmap />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </SavedCareersProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;