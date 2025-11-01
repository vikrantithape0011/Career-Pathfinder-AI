import React from 'react';
import { Brain, Target, Users, Lightbulb, Award, Heart, Code, Database, TestTube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const About = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const teamMembers = [
    {
      name: 'Jayesh Suresh Kadam',
      role: 'Lead Data Scientist',
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      description: 'Leading our AI and machine learning initiatives to provide accurate career predictions and insights.'
    },
    {
      name: 'Dhruv Hemant Kelkar',
      role: 'Frontend Developer',
      icon: <Code className="h-6 w-6 text-indigo-600" />,
      description: 'Creating beautiful and intuitive user interfaces that make career exploration engaging and accessible.'
    },
    {
      name: 'Sagar Vilas Aher',
      role: 'Backend Developer',
      icon: <Database className="h-6 w-6 text-indigo-600" />,
      description: 'Building robust and scalable backend systems to power our career guidance platform.'
    },
    {
      name: 'Vikrant Ramdas Ithape',
      role: 'Testing and Validation',
      icon: <TestTube className="h-6 w-6 text-indigo-600" />,
      description: 'Ensuring the quality and reliability of our platform through comprehensive testing and validation.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Empowering Careers</span>
                  <span className="block text-indigo-600">Through AI Innovation</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We're revolutionizing career guidance by combining cutting-edge AI technology with deep understanding of human potential.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To create a world where every individual can discover and pursue their ideal career path with confidence, 
                supported by intelligent technology that understands their unique potential.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To empower individuals with AI-driven career insights, personalized guidance, and comprehensive roadmaps 
                that help them navigate their professional journey with clarity and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600">
              The talented people behind Career Pathfinder AI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {member.icon}
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{member.name}</h3>
                </div>
                <div className="text-indigo-600 font-medium mb-2">{member.role}</div>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
              </div>
              <p className="text-gray-600">
                Continuously pushing boundaries in AI technology to provide cutting-edge career guidance solutions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">User-Centric</h3>
              </div>
              <p className="text-gray-600">
                Putting our users first, understanding their needs, and delivering personalized experiences.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
              </div>
              <p className="text-gray-600">
                Committed to delivering the highest quality service and maintaining professional standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-lg">Users Empowered</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg">Career Paths</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-lg">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of users who have discovered their ideal career path with us.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300"
          >
            {user ? 'Go to Dashboard' : 'Get Started Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About; 