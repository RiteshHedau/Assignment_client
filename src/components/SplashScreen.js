import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaReact,
  FaNode,
  FaPython,
  FaJava,
  FaDatabase,
  FaCode,
  FaGithub,
  FaBrain,
} from "react-icons/fa";

const SplashScreen = () => {
  const [particles, setParticles] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [codeSnippets] = useState([
    "<Hello World/>",
    "function code() {}",
    "class Learning {}",
    "import future",
    "npm start",
  ]);

  useEffect(() => {
    // Enhanced particle generation with more properties
    const particleCount = 150;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 1,
      color: `hsl(${Math.random() * 360}, 80%, ${60 + Math.random() * 20}%)`,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 2,
      blur: Math.random() > 0.8,
    }));
    setParticles(newParticles);

    // Add shooting stars
    const starCount = 10;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      delay: i * 2,
      duration: 1 + Math.random() * 2,
      top: Math.random() * 50,
      left: Math.random() * 100,
    }));
    setShootingStars(newStars);
  }, []);

  const techIcons = [
    FaReact,
    FaNode,
    FaPython,
    FaJava,
    FaDatabase,
    FaCode,
    FaGithub,
    FaBrain,
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden perspective-1000"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* DNA Helix Animation */}
      <div className="absolute w-full h-full overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`dna-${i}`}
            className="absolute left-1/2 w-2 h-2 rounded-full bg-blue-400"
            animate={{
              y: [0, window.innerHeight],
              x: [
                -50 + Math.sin(i / 2) * 30,
                -50 + Math.sin((i + Math.PI) / 2) * 30,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute h-px w-20 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ top: `${star.top}%`, left: `${star.left}%` }}
          animate={{
            x: [-100, window.innerWidth + 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* 3D Rotating Cube Background */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-blue-400/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Particles with Glow Effect */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.blur ? "blur-sm" : ""}`}
          style={{
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
            y: [`${particle.y}%`, `${particle.y + (Math.random() * 20 - 10)}%`],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Pulsing Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-blue-400/30"
          initial={{ width: 50, height: 50, opacity: 0 }}
          animate={{
            width: [50, 400],
            height: [50, 400],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 1.3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Enhanced Tech Icons with Trails */}
      {techIcons.map((Icon, index) => (
        <motion.div key={index} className="absolute">
          <motion.div
            className="relative text-blue-400/30 text-4xl"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Icon />
            <motion.div
              className="absolute inset-0 blur-md"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-300/20 text-sm font-mono whitespace-nowrap"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            scale: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            delay: index * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {snippet}
        </motion.div>
      ))}

      {/* Main Content with Enhanced Effects - Added mt-20 for moving down */}
      <motion.div className="text-center z-10 perspective-1000 mt-20">
        {/* 3D Logo Container */}
        <motion.div
          className="relative mb-8"
          animate={{
            rotateX: [0, 10, 0],
            rotateY: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Ripple Effects */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-blue-500/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 2],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Enhanced Tech Symbol with Glow */}
          <motion.div
            className="text-8xl font-bold mb-4 relative"
            animate={{
              rotateX: [0, 360],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 text-blue-400 blur-lg"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {"</>"}
            </motion.div>
            <span className="text-white relative">{"</>"}</span>
          </motion.div>
        </motion.div>

        {/* Enhanced TechLearn Text with 3D Effect */}
        <motion.div
          className="relative transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [0, 5, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.h1
            className="text-8xl font-bold mb-4 relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-gradient filter hover:brightness-150 transition-all duration-300">
              TechLearn
            </motion.span>
          </motion.h1>

          {/* Tagline with typing effect */}
          <motion.div
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.span
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.2 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              Your Gateway to Programming Excellence
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="h-1 bg-blue-500/20 rounded-full mt-8 w-48 mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
