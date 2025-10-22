import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sparkles, Rocket, Briefcase, Zap, Mail, Home } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Projects', href: '#work', icon: Briefcase },
    { name: 'Skills', href: '#skills', icon: Zap },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { 
      x: -30, 
      opacity: 0,
      scale: 0.9
    },
    open: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.03), transparent 40%)`
        }}
      />

      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled 
            ? 'bg-acid-bg/98 backdrop-blur-2xl border-b-2 border-golden/40 shadow-2xl shadow-golden/20' 
            : 'bg-acid-bg/85 backdrop-blur-xl border-b-2 border-golden/25'
        }`}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-golden via-acid-green to-golden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <motion.div 
              className="flex items-center gap-4 cursor-pointer group relative"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => handleNavClick('#home')}
            >
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-golden/20 to-acid-green/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              
              <motion.div 
                className="relative w-14 h-14 bg-gradient-to-br from-golden via-acid-green to-golden rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-golden/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <Code2 className="w-7 h-7 text-acid-bg z-10 drop-shadow-lg" strokeWidth={2.5} />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-acid-green via-golden to-acid-green opacity-0 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <div className="flex flex-col relative">
                <motion.span 
                  className="text-golden font-black text-2xl tracking-tight leading-none drop-shadow-lg"
                  whileHover={{ letterSpacing: "0.05em" }}
                  transition={{ duration: 0.3 }}
                >
                   EDYELU ANDREW
                </motion.span>
                <div className="flex items-center gap-2">
                  <span className="text-acid-green text-sm font-mono tracking-[0.3em] font-bold">
                    FULLSTACK DEV
                  </span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Rocket className="w-3 h-3 text-acid-green" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`relative flex items-center gap-3 px-6 py-3.5 font-bold text-base transition-all duration-500 group rounded-2xl border-2 overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-golden/25 to-acid-green/25 text-golden border-golden/60 shadow-xl shadow-golden/30' 
                          : 'text-gray-300 hover:text-golden border-golden/20 hover:border-golden/50 hover:bg-acid-card/40'
                      }`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        boxShadow: isActive 
                          ? "0 20px 40px rgba(212, 175, 55, 0.4)" 
                          : "0 15px 30px rgba(212, 175, 55, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-golden/0 via-golden/20 to-golden/0"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />

                      <motion.div
                        animate={isActive ? { 
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-acid-green' : ''}`} />
                      </motion.div>

                      <span className="font-black tracking-wide relative z-10">
                        {item.name}
                      </span>
                      
                      {isActive && (
                        <>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-golden/10 via-acid-green/10 to-golden/10 rounded-2xl blur-lg"
                            animate={{
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)'
                            }}
                            animate={{
                              rotate: [0, 360]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </>
                      )}
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl -translate-x-full group-hover:translate-x-full"
                        transition={{ duration: 0.8 }}
                      />
                      
                      {isActive && (
                        <motion.div 
                          className="absolute -top-1 -right-1 w-3 h-3 bg-acid-green rounded-full z-20"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [1, 0.6, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-acid-green rounded-full"
                            animate={{ 
                              scale: [1, 2.5, 2.5],
                              opacity: [0.6, 0, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                          />
                        </motion.div>
                      )}

                      <motion.div
                        className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-acid-green/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.div>
                );
              })}
            </div>

            <motion.button 
              className="lg:hidden relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-acid-card/70 to-acid-card/50 rounded-2xl border-2 border-golden/30 group overflow-hidden"
              whileHover={{ scale: 1.1, borderColor: 'rgba(212, 175, 55, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-golden/20 to-acid-green/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <X className="w-6 h-6 text-golden relative z-10" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Menu className="w-6 h-6 text-golden relative z-10" strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-2xl"
                style={{
                  borderImage: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent) 1'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="lg:hidden absolute top-full left-0 right-0 bg-acid-card/98 backdrop-blur-2xl border-b-2 border-golden/30 rounded-b-3xl shadow-2xl shadow-golden/20 overflow-hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-golden/5 to-transparent pointer-events-none" />
                
                <div className="relative p-6 space-y-3">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    const Icon = item.icon;
                    
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        variants={itemVariants}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`relative block px-6 py-4 rounded-2xl font-bold transition-all duration-300 group border-2 overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-golden/25 to-acid-green/25 text-golden border-golden/60 shadow-xl shadow-golden/20'
                            : 'text-gray-300 hover:text-golden hover:bg-acid-card/60 border-golden/20 hover:border-golden/40'
                        }`}
                        whileTap={{ scale: 0.97 }}
                      >
                        {/* Background animation */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-golden/10 to-transparent"
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />

                        <span className="relative z-10 flex items-center gap-4">
                          <motion.div
                            animate={isActive ? { 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            } : {}}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className={`w-6 h-6 ${isActive ? 'text-acid-green' : ''}`} />
                          </motion.div>
                          
                          <span className="font-black tracking-wide text-lg flex-1">
                            {item.name}
                          </span>
                          
                          {isActive && (
                            <motion.div 
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 500, 
                                damping: 15 
                              }}
                            >
                              <Sparkles className="w-5 h-5 text-acid-green" />
                            </motion.div>
                          )}
                        </span>
                        
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-golden to-acid-green rounded-r-full"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl -translate-x-full group-hover:translate-x-full"
                          transition={{ duration: 0.8 }}
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-golden to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.nav>
    </>
  );
};

export default Navigation;