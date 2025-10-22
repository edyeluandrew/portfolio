import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Rocket, 
  Star, 
  Sparkles, 
  MapPin,
  Send,
  User,
  MessageSquare,
  Globe,
  CheckCircle,
  XCircle
} from 'lucide-react';

const FloatingContactElement = ({ icon: Icon, position, delay }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elementRef.current,
        {
          y: -100,
          rotationY: -180,
          opacity: 0,
        },
        {
          y: 0,
          rotationY: 0,
          opacity: 1,
          duration: 1.5,
          delay: delay,
          ease: "elastic.out(1, 0.5)",
        }
      );

      gsap.to(elementRef.current, {
        y: -20,
        rotationY: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <motion.div
      ref={elementRef}
      className="absolute text-golden/20"
      style={{
        left: position.x,
        top: position.y,
      }}
      whileHover={{
        scale: 1.5,
        opacity: 0.8,
        rotateY: 180,
        transition: { duration: 0.5 }
      }}
    >
      <Icon size={32} />
    </motion.div>
  );
};

const ContactField = ({ label, type, name, value, onChange, required, icon: Icon }) => {
  const fieldRef = useRef(null);
  const isInView = useInView(fieldRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && fieldRef.current) {
      gsap.fromTo(fieldRef.current,
        {
          x: -100,
          opacity: 0,
          rotationY: -90,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isInView]);

  return (
    <motion.div ref={fieldRef} className="relative">
      <label className="block text-golden font-bold mb-3 text-lg flex items-center gap-2">
        <Icon size={20} />
        {label}
      </label>
      {type === 'textarea' ? (
        <motion.textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="6"
          className="w-full bg-acid-bg/80 backdrop-blur-lg border-2 border-golden/40 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-golden focus:shadow-2xl focus:shadow-golden/30 transition-all duration-500 resize-none"
          required={required}
          whileFocus={{
            scale: 1.02,
            borderColor: "#FFD700",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
          }}
        />
      ) : (
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-acid-bg/80 backdrop-blur-lg border-2 border-golden/40 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-golden focus:shadow-2xl focus:shadow-golden/30 transition-all duration-500"
          required={required}
          whileFocus={{
            scale: 1.02,
            borderColor: "#FFD700",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
          }}
        />
      )}
      
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
        initial={false}
        whileHover={{
          borderColor: "rgba(255, 215, 0, 0.3)",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"
        }}
      />
    </motion.div>
  );
};

const ContactCard = ({ icon: Icon, title, value, link, delay }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          y: 100,
          rotationX: -90,
          opacity: 0,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.2,
          delay: delay,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isInView, delay]);

  const handleClick = () => {
    if (link) {
      if (link.startsWith('mailto:')) {
        window.location.href = link;
      } else if (link.startsWith('https://')) {
        window.open(link, '_blank');
      } else if (link.startsWith('tel:')) {
        window.location.href = link;
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-acid-card/60 backdrop-blur-lg rounded-2xl p-8 border-2 border-golden/20 text-center cursor-pointer group relative overflow-hidden"
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        borderColor: "rgba(255, 215, 0, 0.5)",
        boxShadow: "0 20px 40px rgba(255, 215, 0, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-golden/10 to-acid-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        className="flex justify-center mb-4 relative z-10"
        whileHover={{ 
          scale: 1.2,
          rotateY: 180,
          transition: { duration: 0.5 }
        }}
      >
        <Icon size={40} className="text-golden" />
      </motion.div>
      
      <h3 className="text-golden font-bold text-lg mb-2 relative z-10">{title}</h3>
      <p className="text-gray-200 relative z-10 text-sm">{value}</p>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-golden rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: '10%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const floatingElements = [
    { icon: Mail, position: { x: '10%', y: '20%' }, delay: 0.2 },
    { icon: Phone, position: { x: '85%', y: '30%' }, delay: 0.4 },
    { icon: MessageCircle, position: { x: '15%', y: '70%' }, delay: 0.6 },
    { icon: Rocket, position: { x: '80%', y: '80%' }, delay: 0.8 },
    { icon: Star, position: { x: '50%', y: '15%' }, delay: 1.0 },
    { icon: Sparkles, position: { x: '45%', y: '85%' }, delay: 1.2 },
  ];

  const contactInfo = [
    { 
      icon: Mail, 
      title: 'Email', 
      value: 'edyeluandrew1@gmail.com',
      link: 'mailto:edyeluandrew1@gmail.com'
    },
    { 
      icon: Phone, 
      title: 'WhatsApp', 
      value: '+256 764 331334',
      link: 'https://wa.me/256764331334'
    },
    { 
      icon: Globe, 
      title: 'Location', 
      value: 'Remote • Global',
      link: null
    }
  ];

  const formFields = [
    {
      label: "Your Name",
      type: "text",
      name: "name",
      icon: User
    },
    {
      label: "Your Email", 
      type: "email",
      name: "email",
      icon: Mail
    },
    {
      label: "Your Message",
      type: "textarea", 
      name: "message",
      icon: MessageSquare
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (isInView && formRef.current) {
      gsap.fromTo(formRef.current,
        {
          y: 50,
          opacity: 0,
          rotationX: -15,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    }
  }, [isInView]);

  return (
    <section id="contact" className="min-h-screen py-20 bg-acid-bg relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-golden/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-acid-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255, 215, 0, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 215, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <FloatingContactElement key={index} {...element} />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-4 mb-6 px-8 py-4 rounded-2xl bg-acid-card/50 backdrop-blur-lg border border-golden/30"
              initial={{ scale: 0, rotateY: -180 }}
              whileInView={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="w-3 h-3 bg-golden rounded-full animate-pulse"></div>
              <span className="text-acid-green font-mono text-lg uppercase tracking-widest font-bold">
                Let's Build Something Amazing
              </span>
              <div className="w-3 h-3 bg-golden rounded-full animate-pulse"></div>
            </motion.div>

            <motion.h2
              className="text-6xl lg:text-8xl font-black text-white mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-transparent bg-gradient-to-r from-golden via-acid-green to-electric-pink bg-clip-text">
                LET'S
              </span>
              <br />
              <span className="text-white">CONNECT</span>
            </motion.h2>

            <motion.p
              className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Ready to bring your vision to life? Let's create something extraordinary together. 
              <span className="text-golden font-bold"> Your next project starts here.</span>
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              ref={formRef}
              className="relative"
            >
              <div className="bg-acid-card/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-golden/30 shadow-2xl shadow-golden/20">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {formFields.map((field, index) => (
                    <ContactField
                      key={field.name}
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      icon={field.icon}
                    />
                  ))}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-golden to-acid-green text-acid-bg py-6 rounded-2xl font-black text-xl uppercase tracking-widest relative overflow-hidden group flex items-center justify-center gap-3"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={24} className="relative z-10" />
                    <span className="relative z-10">
                      {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    </span>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-acid-green to-golden"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </form>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-6 p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-3 ${
                        submitStatus === 'success' 
                          ? 'bg-acid-green/20 text-acid-green border border-acid-green/30' 
                          : 'bg-electric-pink/20 text-electric-pink border border-electric-pink/30'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <>
                          <CheckCircle size={24} />
                          <span>Message sent successfully! I'll get back to you soon.</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={24} />
                          <span>Failed to send message. Please try again.</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <ContactCard
                    key={index}
                    {...info}
                    delay={0.8 + index * 0.2}
                  />
                ))}
              </div>

              <motion.div
                className="bg-acid-card/40 backdrop-blur-lg rounded-2xl p-8 border border-golden/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <h3 className="text-golden font-bold text-xl mb-4 flex items-center gap-3">
                  <MessageCircle size={24} />
                  Quick Response Guaranteed
                </h3>
                <p className="text-gray-300 mb-4">
                  I typically respond within a few hours. For urgent matters, 
                  <span className="text-acid-green font-semibold"> WhatsApp is the fastest way</span> to reach me.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-acid-green rounded-full animate-pulse"></div>
                  <span>Available for new projects</span>
                  <div className="w-2 h-2 bg-golden rounded-full animate-pulse"></div>
                  <span>Open to full-time roles</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;