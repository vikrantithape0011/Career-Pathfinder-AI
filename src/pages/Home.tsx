import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { Brain, Target, Layout, Users, Calculator, BookOpen, Palette, HandHeart, Crown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Hero />
      <Features />
      
      {/* Workflow Flowchart Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 bg-gradient-to-b from-white to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Assessment Process
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive journey to discover your perfect career path
            </p>
          </motion.div>

          <div className="relative">
            {/* Main Flowchart */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1: Start */}
              <motion.div 
                variants={itemVariants}
                className="relative h-full"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">Start Assessment</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Begin your journey with our comprehensive psychometric assessment
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span className="text-sm">Quick registration</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-indigo-600" />
                </div>
              </motion.div>

              {/* Step 2: Assessment */}
              <motion.div 
                variants={itemVariants}
                className="relative h-full"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">Take Test</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Complete our carefully designed assessment questions
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span className="text-sm">45-60 minutes</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-indigo-600" />
                </div>
              </motion.div>

              {/* Step 3: Analysis */}
              <motion.div 
                variants={itemVariants}
                className="relative h-full"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">Get Results</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Receive detailed analysis of your abilities and orientations
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span className="text-sm">Instant results</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-indigo-600" />
                </div>
              </motion.div>

              {/* Step 4: Recommendations */}
              <motion.div 
                variants={itemVariants}
                className="relative h-full"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      4
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">Career Path</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">
                    Discover personalized career recommendations
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span className="text-sm">Tailored guidance</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Connecting Lines (visible on larger screens) */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 -z-10 origin-left"
            ></motion.div>

            {/* Call to Action */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <button
                onClick={handleStartJourney}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
              >
                {user ? 'Go to Dashboard' : 'Start Your Journey'}
                <ArrowRight className="ml-2 h-6 w-6" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;