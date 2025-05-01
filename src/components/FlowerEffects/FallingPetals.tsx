import { useEffect, useRef } from 'react';

interface FallingPetalsProps {
  isDayMode: boolean;
}

const FallingPetals: React.FC<FallingPetalsProps> = ({ isDayMode }) => {
  const petalsContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!petalsContainerRef.current) return;
    
    const container = petalsContainerRef.current;
    
    // Clear existing petals
    container.innerHTML = '';
    
    // Create petals that will fall randomly
    const petalCount = window.innerWidth < 768 ? 8 : 15; 
    const petals = [];
    
    const petalTypes = ['✿', '❀', '❁', '✽', '✾', '❋', '🌸'];
    const petalColors = isDayMode ? 
      ['rgb(249, 168, 212)', 'rgb(244, 114, 182)', 'rgb(236, 72, 153)', 'rgb(251, 207, 232)'] : 
      ['rgb(192, 132, 252)', 'rgb(168, 85, 247)', 'rgb(147, 51, 234)', 'rgb(233, 213, 255)'];
    
    for (let i = 0; i < petalCount; i++) {
      // Create petal element
      const petal = document.createElement('div');
      petal.className = 'petal-fall absolute';
      
      // Set content
      const petalType = petalTypes[Math.floor(Math.random() * petalTypes.length)];
      petal.textContent = petalType;
      
      // Random size (smaller than regular flower)
      const size = 10 + Math.floor(Math.random() * 16);
      petal.style.fontSize = `${size}px`;
      
      // Random position
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = `-${20 + Math.random() * 10}px`;
      
      // Random color
      const color = petalColors[Math.floor(Math.random() * petalColors.length)];
      petal.style.color = color;
      
      // Set fall duration (CSS custom property)
      const fallDuration = 8 + Math.random() * 15;
      petal.style.setProperty('--fall-duration', `${fallDuration}s`);
      
      // Add small random rotation and horizontal drift
      petal.style.transform = `rotate(${Math.random() * 180}deg)`;
      
      // Add to container with delay
      setTimeout(() => {
        if (petalsContainerRef.current) {
          petalsContainerRef.current.appendChild(petal);
          
          // Remove petal after animation and create a new one
          setTimeout(() => {
            if (petalsContainerRef.current && petalsContainerRef.current.contains(petal)) {
              petalsContainerRef.current.removeChild(petal);
              // Create new petal
              setTimeout(() => createPetal(), Math.random() * 2000);
            }
          }, fallDuration * 1000);
        }
      }, i * 1000 * (Math.random() * 2)); // Stagger the creation
      
      petals.push(petal);
    }
    
    // Function to create a new petal
    const createPetal = () => {
      if (!petalsContainerRef.current) return;
      
      // Create petal element
      const petal = document.createElement('div');
      petal.className = 'petal-fall absolute';
      
      // Set content
      const petalType = petalTypes[Math.floor(Math.random() * petalTypes.length)];
      petal.textContent = petalType;
      
      // Random size
      const size = 10 + Math.floor(Math.random() * 16);
      petal.style.fontSize = `${size}px`;
      
      // Random position
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = `-${20 + Math.random() * 10}px`;
      
      // Random color
      const color = petalColors[Math.floor(Math.random() * petalColors.length)];
      petal.style.color = color;
      
      // Set fall duration
      const fallDuration = 8 + Math.random() * 15;
      petal.style.setProperty('--fall-duration', `${fallDuration}s`);
      
      // Add small random rotation
      petal.style.transform = `rotate(${Math.random() * 180}deg)`;
      
      // Add to container
      petalsContainerRef.current.appendChild(petal);
      
      // Remove petal after animation and create a new one
      setTimeout(() => {
        if (petalsContainerRef.current && petalsContainerRef.current.contains(petal)) {
          petalsContainerRef.current.removeChild(petal);
          // Create new petal with some delay
          setTimeout(() => createPetal(), Math.random() * 2000);
        }
      }, fallDuration * 1000);
    };
    
    // Cleanup
    return () => {
      const highestTimeoutId = setTimeout(() => {}, 0);
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
    };
  }, [isDayMode]);
  
  return (
    <div 
      ref={petalsContainerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
    />
  );
};

export default FallingPetals;