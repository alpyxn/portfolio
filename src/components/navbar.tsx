import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  active: boolean;
}

const NavItem = ({ to, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={`
      relative px-1 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm font-medium transition duration-300
      ${active ? 'text-white' : 'text-blue-200 hover:text-white'}
      group whitespace-nowrap
    `}
  >
    <span className={`relative z-10 ${active ? 'text-shadow-glow' : ''}`}>
      {label}
    </span>
    
    <span 
      className={`
        absolute bottom-0 left-0 w-full h-0.5 rounded-full
        transition-all duration-300 transform
        bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
        ${active 
          ? 'opacity-100 scale-x-100' 
          : 'opacity-0 scale-x-0 group-hover:opacity-70 group-hover:scale-x-100'}
      `}
      aria-hidden="true"
    ></span>
  </Link>
);

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);
  
  useEffect(() => {
    let scrollTimeout: number;
    
    const onScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = window.setTimeout(() => {
        handleScroll();
        scrollTimeout = 0;
      }, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full z-50 px-1 py-0.5 sm:py-1
        transition-all duration-300 ease-in-out mt-3
        ${scrolled ? 'backdrop-blur-lg bg-black/30 shadow-lg shadow-blue-900/20' : 'bg-transparent'}
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
      `}
    >
      <div className="max-w-5xl mx-auto flex justify-center">
        <div className="relative flex items-center space-x-1 sm:space-x-2 px-1 sm:px-3 py-0.5 rounded-full navbar-gradient overflow-x-auto hide-scrollbar">
          <NavItem to="/" label="Home" active={location.pathname === '/'} />
          <NavItem to="/techstack" label="Tech Stack" active={location.pathname === '/techstack'} /> 
          
          {isVisible && (
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-full opacity-30">
              <div className="stars-sm"></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
