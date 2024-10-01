import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaRocket, FaRobot, FaCode, FaChartBar } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const FeatureCard = ({ icon, title, description, link }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="h-full">
    <Link to={link} className="block h-full">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="text-4xl text-blue-500 mb-4">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

function Home() {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      navigate(`/resources?topic=${encodeURIComponent(topic)}`);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#3b82f6",
            },
            links: {
              color: "#3b82f6",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="relative z-10">
        {/* Welcome Section */}
        <motion.section
          className="text-center mb-16 py-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
            Socratic Learning
          </h1>
          <TypeAnimation
            sequence={[
              'Master Algorithms',
              2000,
              'Visualize Concepts',
              2000,
              'Engage with AI',
              2000,
            ]}
            wrapper="h2"
            repeat={Infinity}
            className="text-4xl font-bold text-gray-700 mb-8"
          />
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the power of innovative education in Computer Science and beyond
          </p>
          <div className="space-x-4">
            <Link to="/code-editor">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">Try Our Code Editor</Button>
            </Link>
            <Link to="/algorithms">
              <Button size="lg" variant="outline">Explore Algorithms</Button>
            </Link>
          </div>
        </motion.section>

        {/* Cards Section */}
        <motion.section
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
        >
          <FeatureCard
            icon={<FaRocket />}
            title="Interactive Lessons"
            description="Visualize the sorting process and understand the mechanics behind each algorithm."
            link="/visualizer/bubble-sort"
          />
          <FeatureCard
            icon={<FaRobot />}
            title="AI Assistant"
            description="Get help with your coding questions from our Socratic AI Assistant."
            link="/chat"
          />
          <FeatureCard
            icon={<FaChartBar />}
            title="Self-Evaluation"
            description="Generate custom multiple-choice questions to test your knowledge."
            link="/mcq-generator"
          />
          <FeatureCard
            icon={<FaCode />}
            title="Multimodal Learning"
            description="Experience seamless communication with text, images, audio, and video."
            link="/multimodal-chat"
          />
        </motion.section>

        {/* Search Section */}
        <motion.section
          className="mt-16 text-center bg-blue-50 py-16 rounded-lg border border-blue-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Want to learn something new?</h2>
          <form onSubmit={handleTopicSubmit} className="flex justify-center items-center space-x-2 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Enter a topic you want to learn"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Search Resources</Button>
          </form>
        </motion.section>
      </div>
    </>
  );
}

export default Home;