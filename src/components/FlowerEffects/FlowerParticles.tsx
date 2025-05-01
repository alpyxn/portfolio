import { useEffect, useRef } from 'react';

interface FlowerParticleProps {
  isDayMode: boolean;
}

const FlowerParticles: React.FC<FlowerParticleProps> = ({ isDayMode }) => {
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const container = particlesRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Remove any existing particles
    container.innerHTML = '';
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 15 : 30; // Fewer particles on mobile
    const particles = [];
    
    const particleTypes = ['✿', '❀', '❁', '✽', '✾', '❋', '🌸', '🌷', '🌹'];
    const particleColors = isDayMode ? 
      ['rgb(236, 72, 153)', 'rgb(219, 39, 119)', 'rgb(244, 114, 182)', 'rgb(251, 207, 232)'] : 
      ['rgb(147, 51, 234)', 'rgb(168, 85, 247)', 'rgb(192, 132, 252)', 'rgb(216, 180, 254)'];
    
    for (let i = 0; i < particleCount; i++) {
      // Create particle
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none transition-opacity duration-1000 opacity-0';
      
      // Set particle content
      const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.textContent = particleType;
      
      // Set random size
      const size = 12 + Math.floor(Math.random() * 20);
      particle.style.fontSize = `${size}px`;
      
      // Set random initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = '-20px';
      
      // Set random color
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.color = color;
      
      // Append to container
      container.appendChild(particle);
      particles.push(particle);
      
      // Set animation properties
      const duration = 5 + Math.random() * 10;
      const horizontalMovement = -20 + Math.random() * 40;
      const delay = Math.random() * 15;
      
      // Set animation
      setTimeout(() => {
        particle.style.opacity = (0.3 + Math.random() * 0.7).toString();
        particle.style.transform = `translateX(${horizontalMovement}px)`;
        particle.style.top = `${containerRect.height + 20}px`;
        particle.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out, opacity 1s`;
        
        // Remove and recreate particle after animation
        setTimeout(() => {
          if (container.contains(particle)) {
            container.removeChild(particle);
            // Create a new particle to replace this one
            setTimeout(() => {
              if (particlesRef.current) {
                createNewParticle();
              }
            }, Math.random() * 1000);
          }
        }, duration * 1000);
      }, delay * 1000);
    }
    
    const createNewParticle = () => {
      // Create particle
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none opacity-0';
      
      // Set particle content
      const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.textContent = particleType;
      
      // Set random size
      const size = 12 + Math.floor(Math.random() * 20);
      particle.style.fontSize = `${size}px`;
      
      // Set initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = '-20px';
      
      // Set random color
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.color = color;
      
      // Append to container
      if (particlesRef.current) {
        particlesRef.current.appendChild(particle);
        
        // Set animation properties
        const duration = 5 + Math.random() * 10;
        const horizontalMovement = -20 + Math.random() * 40;
        
        // Set animation
        setTimeout(() => {
          particle.style.opacity = (0.3 + Math.random() * 0.7).toString();
          particle.style.transform = `translateX(${horizontalMovement}px)`;
          particle.style.top = `${containerRect.height + 20}px`;
          particle.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out, opacity 1s`;
          
          // Remove and recreate particle after animation
          setTimeout(() => {
            if (particlesRef.current && particlesRef.current.contains(particle)) {
              particlesRef.current.removeChild(particle);
              // Create a new particle to replace this one
              setTimeout(() => {
                if (particlesRef.current) {
                  createNewParticle();
                }
              }, Math.random() * 1000);
            }
          }, duration * 1000);
        }, 100);
      }
    };
    
    // Cleanup function
    return () => {
      // Clear all timeouts (not perfect but helps reduce memory leaks)
      const highestTimeoutId = setTimeout(() => {}, 0);
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
    };
  }, [isDayMode]);
  
  return (
    <div 
      ref={particlesRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ contain: 'strict' }} // Optimize performance
    />
  );
};

export default FlowerParticles;