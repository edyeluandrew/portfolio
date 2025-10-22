import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  SquareCode
} from 'lucide-react';

const SkillOrb = ({ name, level, color, index, total, icon: Icon }) => {
  const orbRef = useRef(null);
  const isInView = useInView(orbRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && orbRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(orbRef.current, 
        { scale: 0, rotationY: -180 },
        { 
          scale: 1, 
          rotationY: 0, 
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
      whileHover={{ scale: 1.15, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 3D Orb */}
      <div className="relative w-28 h-28 mx-auto">
        {/* Main Orb */}
        <div 
          className="absolute inset-0 rounded-full transform-gpu transition-all duration-700 group-hover:rotate-180 group-hover:scale-110"
          style={{
            background: getGradient(color),
            boxShadow: `
              0 0 40px ${color.replace('text-', '')}40,
              inset 0 6px 24px rgba(255, 255, 255, 0.3),
              inset -6px -6px 24px rgba(0, 0, 0, 0.5)
            `,
            transform: 'perspective(1000px) rotateY(var(--rotate-y, 0deg)) rotateX(var(--rotate-x, 0deg))'
          }}
        />
        
        {/* Skill Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ 
              scale: 1.2,
              rotateY: 180,
              transition: { duration: 0.5 }
            }}
          >
            <Icon size={32} className="text-white drop-shadow-lg" />
          </motion.div>
        </div>
        
        {/* Holographic Ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            borderImage: getGradient(color),
            borderImageSlice: 1,
            animation: 'hologramSpin 3s linear infinite',
            boxShadow: '0 0 30px currentColor'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 90) * 40],
              y: [0, Math.sin(i * 90) * 40],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      {/* Skill Info */}
      <div className="text-center mt-4">
        <motion.h3 
          className="text-white font-bold text-sm mb-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {name}
        </motion.h3>
        
        <motion.div 
          className="relative bg-acid-card rounded-full h-2 overflow-hidden mx-auto max-w-[80px]"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
        >
          <motion.div
            className={`h-full rounded-full`}
            style={{
              background: getGradient(color),
              width: `${level}%`
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ delay: index * 0.1 + 1, duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Animated Scan Line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-white blur-sm"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{ 
              delay: index * 0.1 + 1.2, 
              duration: 1, 
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        </motion.div>
        
        <motion.span 
          className={`text-xs font-bold mt-1 inline-block ${color}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 1.5 }}
        >
          {level}%
        </motion.span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const skillsGridRef = useRef(null);

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

  useEffect(() => {
    if (isInView && skillsGridRef.current) {
      const orbs = skillsGridRef.current.querySelectorAll('.skill-orb');
      
      gsap.fromTo(orbs, 
        {
          y: 100,
          opacity: 0,
          rotationY: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isInView]);

  return (
    <section id="skills" className="min-h-screen bg-acid-bg relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-golden/30"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
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
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-golden rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-acid-card/50 backdrop-blur-sm border border-acid-green/20"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
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
            whileInView={{ opacity: 1, y: 0 }}
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
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Full-stack development expertise from modern frontend to scalable backend systems, 
            with specialized knowledge in <span className="text-golden font-bold">Web3</span> and 
            <span className="text-acid-green font-bold"> mobile technologies</span>.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-acid-card/30 backdrop-blur-sm border border-acid-green/20 rounded-xl p-6"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className={`text-xl font-bold mb-4 ${category.color} flex items-center gap-2`}>
                <category.icon size={20} />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-acid-card/50 rounded-full text-white text-sm border border-acid-green/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div 
          ref={skillsGridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8 mb-16"
        >
          {skills.map((skill, index) => (
            <div key={skill.name} className="skill-orb">
              <SkillOrb {...skill} index={index} total={skills.length} />
            </div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h4 className="text-white text-lg font-semibold mb-6 flex items-center justify-center gap-2">
            <Zap size={20} className="text-golden" />
            Technologies & Tools
          </h4>
          <div className="inline-flex flex-wrap gap-3 justify-center max-w-4xl">
            {[
              'React.js', 'Express.js', 'React Native', 'GraphQL', 'Redis', 
              'Docker', 'Heroku', 'Git', 'Figma', 'Web3.js', 'Ethers.js', 
              'Rust', 'Firebase', 'Jest', 'Webpack', 'Vite' , 'Kotlin'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-acid-card/50 backdrop-blur-sm border border-golden/20 rounded-full text-golden text-sm font-mono"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: index * 0.05 + 1.2 
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  borderColor: "rgba(255, 215, 0, 0.5)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes hologramSpin {
          0% { transform: rotate(0deg) scale(1.1); opacity: 0.7; }
          50% { transform: rotate(180deg) scale(1.15); opacity: 1; }
          100% { transform: rotate(360deg) scale(1.1); opacity: 0.7; }
        }
        
        .hologram-effect {
          background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%);
          animation: hologramMove 6s ease-in-out infinite;
        }
        
        @keyframes hologramMove {
          0%, 100% { transform: translateX(-100px) rotate(0deg); }
          50% { transform: translateX(100px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Skills;