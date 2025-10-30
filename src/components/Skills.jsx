import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Code2, 
  Type, 
  Palette, 
  Server, 
  Database, 
  Layout, 
  Cpu,
  Globe,
  Smartphone,
  Zap,
  Sparkles,
  SquareCode,
  Eye,
  ChevronDown,
  Star,
  Atom,
  Rocket
} from 'lucide-react';

const SkillOrb = ({ name, level, color, index, total, icon: Icon }) => {
  const orbRef = useRef(null);
  const isInView = useInView(orbRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && orbRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(orbRef.current, 
        { scale: 0, rotationY: -180, opacity: 0 },
        { 
          scale: 1, 
          rotationY: 0, 
          opacity: 1,
          duration: 1.2, 
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.1
        }
      );
    }
  }, [isInView, index]);

  const getGradient = (colorType) => {
    switch(colorType) {
      case 'text-golden':
        return 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B00 100%)';
      case 'text-acid-green':
        return 'linear-gradient(135deg, #39FF14 0%, #00FF88 50%, #00D4FF 100%)';
      case 'text-lava-orange':
        return 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 50%, #FF2E00 100%)';
      case 'text-electric-blue':
        return 'linear-gradient(135deg, #0066FF 0%, #00D4FF 50%, #00FF88 100%)';
      case 'text-purple-neon':
        return 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 50%, #F0ABFC 100%)';
      default:
        return 'linear-gradient(135deg, #FF0080 0%, #FF2E00 50%, #FF6B00 100%)';
    }
  };

  return (
    <motion.div
      ref={orbRef}
      className="relative group cursor-pointer skill-orb"
      whileHover={{ 
        scale: 1.15, 
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        delay: index * 0.1
      }}
    >
      {/* 3D Orb */}
      <div className="relative w-28 h-28 mx-auto">
        {/* Main Orb */}
        <motion.div 
          className="absolute inset-0 rounded-full transform-gpu transition-all duration-700 group-hover:rotate-180 group-hover:scale-110"
          style={{
            background: getGradient(color),
            boxShadow: `
              0 0 40px ${color.replace('text-', '')}40,
              inset 0 6px 24px rgba(255, 255, 255, 0.3),
              inset -6px -6px 24px rgba(0, 0, 0, 0.5)
            `,
          }}
          whileHover={{
            rotateY: 180,
            transition: { duration: 0.8 }
          }}
        />
        
        {/* Skill Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ 
              scale: 1.3,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >
            <Icon size={32} className="text-white drop-shadow-lg" />
          </motion.div>
        </div>
        
        {/* Holographic Ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100"
          style={{
            borderImage: getGradient(color),
            borderImageSlice: 1,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 60) * 50],
              y: [0, Math.sin(i * 60) * 50],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: color.replace('text-', ''),
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </div>

      {/* Skill Info */}
      <div className="text-center mt-4">
        <motion.h3 
          className="text-white font-bold text-sm mb-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {name}
        </motion.h3>
        
        <motion.div 
          className="relative bg-acid-card rounded-full h-3 overflow-hidden mx-auto max-w-[100px] border border-acid-green/20"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
        >
          <motion.div
            className={`h-full rounded-full relative overflow-hidden`}
            style={{
              background: getGradient(color),
            }}
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ delay: index * 0.1 + 0.7, duration: 1.5, ease: "easeOut" }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                delay: index * 0.1 + 0.9
              }}
            />
          </motion.div>
        </motion.div>
        
        <motion.span 
          className={`text-xs font-bold mt-2 inline-block ${color} bg-black/20 px-2 py-1 rounded-full border border-current/20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 1.2, type: "spring" }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 -z-10"
        style={{
          background: getGradient(color),
          filter: 'blur(20px)',
        }}
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const FloatingTechTag = ({ tech, index }) => (
  <motion.span
    className="px-4 py-3 bg-gradient-to-r from-acid-green/10 to-electric-blue/10 backdrop-blur-sm border border-acid-green/30 rounded-2xl text-acid-green text-sm font-mono relative overflow-hidden group cursor-pointer"
    initial={{ 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    }}
    animate={{ 
      scale: 1, 
      rotate: 0,
      opacity: 1 
    }}
    whileHover={{
      scale: 1.15,
      y: -5,
      backgroundColor: "rgba(57, 255, 20, 0.15)",
      borderColor: "rgba(57, 255, 20, 0.6)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }}
    transition={{ 
      type: "spring", 
      stiffness: 200, 
      delay: index * 0.05 + 0.8 
    }}
  >
    {/* Background Shine */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-acid-green/10 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6 }}
    />
    
    {/* Floating Icon */}
    <motion.div
      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100"
      initial={{ scale: 0, rotate: 0 }}
      whileHover={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.4 }}
    >
      <Star size={12} className="text-golden" fill="currentColor" />
    </motion.div>
    
    <span className="relative z-10">{tech}</span>
    
    {/* Particle burst on hover */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-acid-green rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
          x: Math.cos(i * 120) * 20,
          y: Math.sin(i * 120) * 20,
        }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
      />
    ))}
  </motion.span>
);

const AnimatedCategoryCard = ({ category, index }) => (
  <motion.div
    className="relative bg-gradient-to-br from-acid-card/40 to-acid-card/10 backdrop-blur-xl border border-acid-green/20 rounded-2xl p-6 overflow-hidden group cursor-pointer"
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ 
      y: -8,
      scale: 1.02,
      borderColor: "rgba(57, 255, 20, 0.4)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.2,
      type: "spring",
      stiffness: 300
    }}
  >
    {/* Animated Background */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-acid-green/5 via-transparent to-electric-blue/5"
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
    
    {/* Border Glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-acid-green/20 to-electric-blue/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
    
    <h3 className={`text-xl font-bold mb-4 ${category.color} flex items-center gap-3 relative z-10`}>
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <category.icon size={24} />
      </motion.div>
      {category.title}
    </h3>
    
    <div className="flex flex-wrap gap-2 relative z-10">
      {category.skills.map((skill, skillIndex) => (
        <motion.span
          key={skill}
          className="px-3 py-2 bg-acid-card/50 backdrop-blur-sm rounded-xl text-white text-sm border border-acid-green/20 hover:border-acid-green/50 transition-all duration-300 group/item"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.1,
            y: -2,
            backgroundColor: "rgba(57, 255, 20, 0.1)",
          }}
          transition={{ 
            delay: index * 0.2 + skillIndex * 0.1 + 0.3,
            type: "spring",
            stiffness: 500
          }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {skill}
          </motion.span>
        </motion.span>
      ))}
    </div>

    {/* Floating elements */}
    {[...Array(2)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-acid-green rounded-full opacity-60"
        style={{
          left: `${20 + i * 60}%`,
          top: '10%',
        }}
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2,
          delay: i * 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </motion.div>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const skills = [
    { name: 'React JS', level: 82, color: 'text-electric-blue', icon: Code2 },
    { name: 'TypeScript', level: 76, color: 'text-electric-blue', icon: Type },
    { name: 'JavaScript', level: 95, color: 'text-golden', icon: SquareCode },
    { name: 'Tailwind CSS', level: 96, color: 'text-acid-green', icon: Palette },
    { name: 'Node.js', level: 85, color: 'text-acid-green', icon: Server },
    { name: 'MongoDB', level: 82, color: 'text-acid-green', icon: Database },
    { name: 'PostgreSQL', level: 80, color: 'text-electric-blue', icon: Database },
    { name: 'UI/UX Design', level: 87, color: 'text-purple-neon', icon: Layout },
    { name: 'Rust', level: 75, color: 'text-lava-orange', icon: Cpu },
    { name: 'Web3', level: 78, color: 'text-purple-neon', icon: Globe },
    { name: 'Mobile App Dev', level: 83, color: 'text-golden', icon: Smartphone },
  ];

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React JS", "TypeScript", "JavaScript", "Tailwind CSS"],
      color: "text-electric-blue",
      icon: Layout
    },
    {
      title: "Backend", 
      skills: ["Node.js", "MongoDB", "PostgreSQL"],
      color: "text-acid-green",
      icon: Server
    },
    {
      title: "Specialized",
      skills: ["UI/UX Design", "Rust", "Web3", "Mobile App Dev"],
      color: "text-golden",
      icon: Zap
    }
  ];

  const revealSkills = () => {
    if (containerRef.current) {
      // Create particle explosion
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-acid-green rounded-full';
        particle.style.left = '50%';
        particle.style.top = '50%';
        containerRef.current.appendChild(particle);
        particles.push(particle);
      }

      // Animate particles
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          x: Math.cos(i * 18) * 200,
          y: Math.sin(i * 18) * 200,
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: i * 0.02
        });
      });

      // Animate container disappearance
      gsap.to(containerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.3,
        onComplete: () => {
          particles.forEach(particle => particle.remove());
          // Set revealed state AFTER animation completes
          setIsRevealed(true);
        }
      });
    } else {
      // Fallback if container ref fails
      setIsRevealed(true);
    }
  };

  return (
    <section id="skills" className="min-h-screen bg-acid-bg relative overflow-hidden" ref={sectionRef}>
      {/* Background Animations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-golden/30"
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-16 h-16 border-2 border-acid-green/30 rounded-full"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-golden rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header - Always visible */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-acid-card/50 backdrop-blur-sm border border-acid-green/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Sparkles size={16} className="text-acid-green" />
            <span className="text-acid-green font-mono text-sm uppercase tracking-widest">
              Technical Arsenal
            </span>
            <Sparkles size={16} className="text-acid-green" />
          </motion.div>

          <motion.h2
            className="text-5xl lg:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-gradient-to-r from-golden via-acid-green to-electric-blue bg-clip-text">
              TECH
            </span>
            <br />
            <span className="text-white">STACK</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Full-stack development expertise from modern frontend to scalable backend systems, 
            with specialized knowledge in <span className="text-golden font-bold">Web3</span> and 
            <span className="text-acid-green font-bold"> mobile technologies</span>.
          </motion.p>
        </motion.div>

        {/* Interactive Container OR Skills Content */}
        {!isRevealed ? (
          <motion.div
            ref={containerRef}
            className="relative bg-acid-card/80 backdrop-blur-xl border-2 border-acid-green/30 rounded-3xl p-12 mx-auto max-w-4xl mb-16 cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={revealSkills}
          >
            {/* Eyes */}
            <div className="flex justify-center gap-16 mb-8">
              {[1, 2].map((eye) => (
                <motion.div
                  key={eye}
                  className="relative w-20 h-20 bg-gradient-to-br from-acid-green to-electric-blue rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: eye * 0.3
                  }}
                >
                  <div className="absolute inset-4 bg-white rounded-full">
                    <motion.div
                      className="absolute w-6 h-6 bg-black rounded-full"
                      animate={{
                        x: [-10, 10, -10],
                        y: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
                  </div>
                  
                  <motion.div
                    className="absolute -top-2 left-0 right-0 h-4 bg-acid-card/80 rounded-t-full"
                    animate={{
                      scaleY: [0.1, 0.8, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: eye * 0.5
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Click Me Button */}
            <motion.div
              className="text-center"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-acid-green to-electric-blue text-white font-bold rounded-2xl text-lg shadow-2xl hover:shadow-acid-green/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={24} />
                Click to Reveal My Skills
                <ChevronDown size={24} />
              </motion.button>
              
              <p className="text-acid-green/80 text-sm mt-4 font-mono">
                * Discover my technical capabilities *
              </p>
            </motion.div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-acid-green rounded-full"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: i % 2 === 0 ? '10%' : '90%',
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        ) : (
          /* SKILLS CONTENT - This shows after clicking */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Categories */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {skillCategories.map((category, index) => (
                <AnimatedCategoryCard key={category.title} category={category} index={index} />
              ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {skills.map((skill, index) => (
                <SkillOrb key={skill.name} {...skill} index={index} total={skills.length} />
              ))}
            </motion.div>

            {/* Technologies Section */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.h4 
                className="text-white text-xl font-semibold mb-8 flex items-center justify-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Atom size={24} className="text-golden" />
                </motion.div>
                Technologies & Tools
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket size={24} className="text-electric-blue" />
                </motion.div>
              </motion.h4>
              
              <motion.div 
                className="inline-flex flex-wrap gap-4 justify-center max-w-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {[
                  'React.js', 'Express.js', 'React Native', 'GraphQL', 'Redis', 
                  'Docker', 'Heroku', 'Git', 'Figma', 'Web3.js', 'Ethers.js', 
                  'Rust', 'Firebase', 'Jest', 'Webpack', 'Vite', 'Kotlin'
                ].map((tech, index) => (
                  <FloatingTechTag key={tech} tech={tech} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;