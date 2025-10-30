import React, { useState } from 'react';
import { Github, ExternalLink, Code, Zap } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0
      }}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
        <img 
          src={project.image || 'https://via.placeholder.com/400x300/1e293b/d4af37?text=Project+Image'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4 flex gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-slate-800/80 backdrop-blur-sm border border-amber-500/30 text-amber-400 py-2 px-4 rounded-lg font-semibold hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 py-2 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            )}
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-slate-700/50 text-amber-400 px-3 py-1 rounded-lg text-xs font-medium border border-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.stats && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            {project.stats.map((stat, statIndex) => (
              <div key={statIndex} className="text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Numba Cafe",
      description: "A full-stack cafe management application with menu management, and real time booking and reservation of rooms. Features admin dashboard for inventory and order tracking.",
      // category: "Full-Stack Application",
      image: "./images/numba logo.png",
      technologies: ["React", "Django", "postgresql", "RESTfulAPI",],
      githubLink: "https://github.com/edyeluandrew/numba-cafe",
      liveLink: "https://numba-hotel.vercel.app/",
      stats: [
        { value: "Full-Stack", label: "Application" },
        { value: "Real-time", label: "Reservation of rooms" }
      ]
    },
    {
      title: "Beta Tech Labs",
      description: "A modern research hub website for blockchain and AI innovation, featuring cutting-edge research, team profiles, and technology showcases.",
      // category: "Web Development",
      image: "./images/beta.jpg", 
      technologies: ["React", "Tailwind CSS", "JavaScript", "Framer Motion"],
      githubLink: "https://github.com/edyeluandrew/beta-tech-labs", 
      liveLink: "https://research-eta-eosin.vercel.app/",
      stats: [
        { value: "Modern", label: "Design" },
        { value: "Research", label: "Focus" }
      ]
    },
    {
      title: "Novak Hospitality",
      description: "Professional website for Novak Hospitality company showcasing their luxury services, amenities, and booking capabilities for premium hospitality experiences.",
      // category: "Web Development",
      image: "./images/novak.jpg",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      githubLink: "https://github.com/edyeluandrew/novak-hospitality", 
      liveLink: "http://novak-site.vercel.app", 
      stats: [
        { value: "Luxury", label: "Branding" },
        { value: "Hospitality", label: "Services" }
      ]
    }
  ];

  return (
    <section id="work" className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 backdrop-blur-sm mb-6">
            <Code className="w-4 h-4 text-amber-400 mr-2" />
            <span className="text-amber-300 text-sm font-medium tracking-wide">Featured Work</span>
            <Zap className="w-4 h-4 text-amber-400 ml-2" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">My Recent </span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of professional applications spanning{' '}
            <span className="text-amber-400 font-semibold">full-stack solutions</span>,{' '}
            <span className="text-amber-400 font-semibold">research hubs</span>, and{' '}
            <span className="text-amber-400 font-semibold">modern web platforms</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://github.com/edyeluandrew"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;