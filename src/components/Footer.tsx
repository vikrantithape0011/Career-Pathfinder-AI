import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Career Pathfinder AI</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Empowering careers through AI-driven guidance and psychometric analysis.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/features" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Features</Link></li>
              <li><Link to="/pricing" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Pricing</Link></li>
              <li><Link to="/resources" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">About</Link></li>
              <li><Link to="/blog" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Blog</Link></li>
              <li><Link to="/careers" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/help" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Help Center</Link></li>
              <li><Link to="/contact" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Contact</Link></li>
              <li><Link to="/privacy" className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-200">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © 2025 Career Pathfinder AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;