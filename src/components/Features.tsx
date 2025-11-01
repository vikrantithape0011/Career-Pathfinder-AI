import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Layout, Users, Calculator, BookOpen, Palette, HandHeart, Crown } from 'lucide-react';

const features = [
  {
    name: 'Comprehensive Assessment',
    description: 'Our advanced psychometric test evaluates multiple aspects of your personality and abilities.',
    icon: Brain,
  },
  {
    name: 'AI-Powered Analysis',
    description: 'State-of-the-art AI algorithms analyze your responses to provide accurate career matches.',
    icon: Target,
  },
  {
    name: 'Personalized Results',
    description: 'Get detailed insights and recommendations tailored to your unique profile.',
    icon: Layout,
  },
  {
    name: 'Expert Guidance',
    description: 'Access career counseling and guidance from industry professionals.',
    icon: Users,
  },
  {
    name: 'Skill Evaluation',
    description: 'Assessment of your technical and soft skills to match with suitable career paths.',
    icon: Calculator,
  },
  {
    name: 'Learning Resources',
    description: 'Access to curated learning materials and courses for your chosen career path.',
    icon: BookOpen,
  },
  {
    name: 'Creative Assessment',
    description: 'Evaluation of your creative abilities and potential in artistic fields.',
    icon: Palette,
  },
  {
    name: 'Career Support',
    description: 'Ongoing support and resources to help you succeed in your chosen career.',
    icon: HandHeart,
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
          >
            Features
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            Everything you need to find your perfect career
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
          >
            Our comprehensive platform provides all the tools and resources you need to discover and pursue your ideal career path.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-10"
        >
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <motion.div 
                key={feature.name}
                variants={itemVariants}
                className="relative"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;