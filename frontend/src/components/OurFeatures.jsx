import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaChartBar, FaRobot, FaGamepad, FaBook, FaClipboardCheck, FaCode, FaComments } from 'react-icons/fa';

const features = [
  { icon: <FaVideo />, title: 'Image & Video Chat', description: 'Engage in interactive visual conversations' },
  { icon: <FaChartBar />, title: 'Visualization Laboratory', description: 'Explore data through immersive visualizations' },
  { icon: <FaRobot />, title: 'Motivational AI Assistant', description: 'Get personalized motivation and support' },
  { icon: <FaGamepad />, title: 'Gamified Learning', description: 'Learn through fun and engaging game-like experiences' },
  { icon: <FaBook />, title: 'Resources Suggestion', description: 'Discover tailored learning materials' },
  { icon: <FaClipboardCheck />, title: 'Self Evaluation Tool', description: 'Assess your progress and identify areas for improvement' },
  { icon: <FaCode />, title: 'Code Editor', description: 'Write and test code in a powerful integrated environment' },
  { icon: <FaComments />, title: 'AI Socratic Chat Assistant', description: 'Engage in thought-provoking discussions' },
];

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center h-full"
  >
    <div className="text-5xl text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

const OurFeatures = () => {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-blue-100 to-blue-300 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-12">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
