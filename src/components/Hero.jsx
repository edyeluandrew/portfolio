import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const AnimatedTechSphere = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.8}>
      <MeshDistortMaterial
        color="#d4af37"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const roles = ['Full Stack Developer', 'Software Engineer', 'Tech Enthusiast'];
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const imageRef = useRef(null);

  // Typing effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentText.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRole]);

  // Mouse parallax effect for image
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      image.style.transform = `
        perspective(1000px) 
        rotateY(${x * 8}deg) 
        rotateX(${-y * 8}deg) 
        scale3d(1.05, 1.05, 1.05)
      `;
    };

    const handleMouseLeave = () => {
      image.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1.02, 1.02, 1.02)';
    };

    image.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);

    // Set initial transform
    image.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1.02, 1.02, 1.02)';

    return () => {
      image.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Background mouse effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleViewWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactUs = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-16 flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div 
        className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          animationDelay: '1s' 
        }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          animationDelay: '2s' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-center lg:text-left space-y-8">
            <motion.div 
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-amber-300 text-sm font-medium tracking-wide">Am a Computer Science major available for Collaboration and Open to work</span>
            </motion.div>

            {/* Main Heading with Gradient */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white block mb-2">Hi, I'm</span>
                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent block mb-2">
                  Edyelu Andrew
                </span>
              </h1>
              
              {/* Animated Role */}
              <div className="h-12 flex items-center justify-center lg:justify-start">
                <span className="text-2xl md:text-3xl text-gray-300 font-light">
                  {typedText}
                  <span className="inline-block w-0.5 h-8 bg-amber-500 ml-1 animate-pulse"></span>
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              I build websites ,webapps,cross platform mobile apps while integrating<span className="text-amber-400 font-semibold"> Artificial Intelligence</span> and{' '}
              <span className="text-amber-400 font-semibold">Blockchain technology</span>. 
              Based in <span className="text-amber-400 font-semibold">Uganda</span>, 
              and currently working with beta tech labs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <button 
                onClick={handleViewWork}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  View My Work
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={handleContactUs}
                className="group px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-amber-400 font-semibold rounded-xl border-2 border-amber-500/30 hover:border-amber-500 hover:bg-slate-800 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <div className="flex items-center justify-center relative z-10">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get In Touch
                </div>
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>

            <motion.div 
              className="flex gap-4 justify-center lg:justify-start pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <a href="https://github.com/edyeluandrew" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl flex items-center justify-center hover:border-amber-500 hover:bg-slate-800 transition-all duration-300 hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/yourusername" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl flex items-center justify-center hover:border-amber-500 hover:bg-slate-800 transition-all duration-300 hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/yourusername" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl flex items-center justify-center hover:border-amber-500 hover:bg-slate-800 transition-all duration-300 hover:scale-110 group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative mx-auto lg:mx-0 w-80 h-80 lg:w-96 lg:h-96 group">
              <motion.div
                className="absolute inset-0"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
                
                <div className="absolute -inset-4 rounded-3xl border-2 border-amber-400/40 opacity-70 transition-all duration-1000 animate-spin-slow"></div>
                <div className="absolute -inset-6 rounded-3xl border-2 border-yellow-400/30 opacity-50 transition-all duration-1000 animate-spin-slow" style={{ animationDelay: '2s', animationDirection: 'reverse' }}></div>
                <div className="absolute -inset-8 rounded-3xl border-2 border-amber-300/20 opacity-30 transition-all duration-1000 animate-spin-slow" style={{ animationDelay: '4s' }}></div>
                
                <div 
                  ref={imageRef}
                  className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-amber-500/40 bg-slate-800/50 backdrop-blur-sm transition-all duration-500 ease-out cursor-pointer shadow-2xl shadow-amber-500/20"
                  style={{
                    transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1.02, 1.02, 1.02)'
                  }}
                >
                  <img 
                    src="./images/edyelu-andrew.jpg" 
                    alt="Edyelu Andrew"
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/60 opacity-70"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent opacity-30 animate-scan"></div>

                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, transparent 79px, #d4af37 79px, #d4af37 81px, transparent 81px),
                        linear-gradient(transparent 79px, #d4af37 79px, #d4af37 81px, transparent 81px)
                      `,
                      backgroundSize: '80px 80px'
                    }}
                  ></div>
                </div>

                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-60"
                    style={{
                      left: `${15 + (i * 7)}%`,
                      top: `${8 + (i * 4)}%`,
                    }}
                    animate={{
                      y: [0, -25, 0],
                      x: [0, Math.sin(i) * 10, 0],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.4,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                ))}
              </motion.div>

              <div className="absolute -top-6 -right-6 w-28 h-28 bg-amber-500/30 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-yellow-500/30 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500/20 rounded-full blur-xl opacity-40"></div>
            </div>

            <div className="absolute -bottom-12 -right-12 w-56 h-56 hidden lg:block opacity-80">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4af37" />
                <pointLight position={[-10, -10, -10]} intensity={0.4} color="#fbbf24" />
                <AnimatedTechSphere />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={3}
                  enablePan={false}
                />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex justify-center p-2 group cursor-pointer">
          <motion.div 
            className="w-1 h-3 bg-amber-500 rounded-full"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;