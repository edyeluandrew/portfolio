// src/components/Navigation.jsx
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-acid-bg/80 backdrop-blur-lg border-b border-golden/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-golden to-acid-green rounded-lg"></div>
            <span className="text-golden font-black text-xl tracking-tight">
              GOLDEN.ACID
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Work', 'About', 'Process', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-golden font-semibold transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button className="bg-golden text-acid-bg px-6 py-2 rounded-lg font-black hover:scale-105 transition-transform duration-300">
              HIRE ME
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-golden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-0.5 bg-golden mb-1.5"></div>
            <div className="w-6 h-0.5 bg-golden mb-1.5"></div>
            <div className="w-6 h-0.5 bg-golden"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-acid-card border border-golden/20 rounded-lg p-4 mt-2">
            {['Work', 'About', 'Process', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-golden py-2 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;