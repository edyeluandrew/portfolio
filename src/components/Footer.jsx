import React from 'react';
import { Github, Twitter, Linkedin, Heart, Zap } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      platform: 'GitHub',
      icon: Github,
      url: 'https://github.com/edyeluandrew',
      color: 'hover:text-white'
    },
    {
      platform: 'Twitter', 
      icon: Twitter,
      url: 'https://twitter.com/ed_an',
      color: 'hover:text-blue-400'
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin, 
      url: 'https://linkedin.com/in/edyeluandrew',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <footer className="bg-acid-card/80 backdrop-blur-lg border-t border-golden/20 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-golden/5 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-golden to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-golden to-acid-green rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-acid-bg" fill="currentColor" />
              </div>
              <div className="text-left">
                <span className="text-golden font-black text-2xl tracking-tight block">
                   EDYELU ANDREW
                </span>
                <span className="text-acid-green text-sm font-mono tracking-widest">
                  FULL-STACK DEVELOPER
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-2">
            <p className="text-gray-400 flex items-center gap-2">
              Crafted with 
              <Heart className="w-4 h-4 text-electric-pink animate-pulse" fill="currentColor" />
              and
              <Zap className="w-4 h-4 text-golden" />
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Andrew Edyelu. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map(({ platform, icon: Icon, url, color }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 bg-acid-bg/50 rounded-xl border border-golden/20 text-gray-400 transition-all duration-300 hover:scale-110 hover:border-golden/40 hover:shadow-lg hover:shadow-golden/20 ${color}`}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-acid-card text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {platform}
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-golden/10 to-acid-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-golden/10 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-acid-green rounded-full animate-pulse"></div>
              Available for new projects
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-golden rounded-full animate-pulse"></div>
              Open to full-time opportunities
            </span>
            <span className="hidden sm:block">•</span>
            <span>Based in Uganda 🌍</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;