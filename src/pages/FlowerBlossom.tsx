import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FlowerParticles, FallingPetals } from '../components/FlowerEffects';

const ShimmerEffect = () => (
  <div className="absolute inset-0 z-[-1] overflow-hidden">
    <div className="shimmer w-[200%] h-[200%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent"></div>
  </div>
);

const EnhancedFlower = () => {
  const controls = useAnimation();
  const flowerColor = ["text-pink-300", "text-pink-200", "text-pink-100"];
  
  const flowerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const growSequence = async () => {
      await controls.start("stemGrow");
      await controls.start("leaves");
      await controls.start("bloom");
      controls.start("sway");
      
      if (flowerRef.current) {
        const glowEffect = document.createElement('div');
        glowEffect.className = 'absolute inset-0 rounded-full bg-pink-200 opacity-0 blur-xl z-[-1]';
        flowerRef.current.appendChild(glowEffect);
        
        setTimeout(() => {
          glowEffect.style.transition = 'opacity 2s ease-in-out, transform 2s ease-in-out';
          glowEffect.style.opacity = '0.5';
          
          setInterval(() => {
            glowEffect.style.transform = 'scale(1.3)';
            setTimeout(() => {
              glowEffect.style.transform = 'scale(1)';
            }, 1500);
          }, 3000);
        }, 100);
      }
    };
    
    growSequence();
    
    return () => {
      const highestIntervalId = setInterval(() => {}, 0);
      for (let i = 0; i < highestIntervalId; i++) {
        clearInterval(i);
      }
    };
  }, [controls]);

  return (
    <div ref={flowerRef} className="flex flex-col items-center justify-center h-full relative">
      {/* Main flower head */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          bloom: { 
            opacity: 1, 
            scale: [0.8, 1.4, 1], 
            transition: { 
              duration: 3,
              ease: [0.34, 1.56, 0.64, 1] 
            } 
          },
          sway: {
            rotate: [0, 5, 0, -5, 0],
            transition: { 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }
          }
        }}
      >
        <motion.div 
          className={`${flowerColor[0]} text-8xl mb-2 transform origin-bottom filter drop-shadow-lg`}
          whileHover={{ scale: 1.2, rotate: 10 }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, 0, -2, 0],
            transition: {
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        >
          ❀
        </motion.div>
      </motion.div>
      
      {/* Secondary flower parts */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          bloom: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.3, 
              duration: 2,
              ease: "backOut"
            }
          },
          sway: {
            rotate: [0, 6, 0, -6, 0],
            transition: { 
              repeat: Infinity, 
              duration: 3.5, 
              ease: "easeInOut", 
              delay: 0.2 
            }
          }
        }}
      >
        <div className={`${flowerColor[1]} text-6xl filter drop-shadow-md`}>✿</div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          bloom: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.5, 
              duration: 2,
              ease: "backOut"
            }
          },
          sway: {
            rotate: [0, -5, 0, 5, 0],
            transition: { 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut", 
              delay: 0.4 
            }
          }
        }}
      >
        <div className={`${flowerColor[2]} text-5xl mt-2 filter drop-shadow-sm`}>✿</div>
      </motion.div>
      
      {/* Stem with improved appearance */}
      <motion.div 
        className="flex flex-col items-center relative"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { scaleY: 0, originY: 0 },
          stemGrow: { 
            scaleY: 1, 
            transition: { 
              duration: 3, 
              ease: "easeOut" 
            }
          },
          sway: {
            rotate: [0, 4, 0, -4, 0],
            transition: { 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }
          }
        }}
      >
        <div className="h-24 w-2 bg-gradient-to-b from-pink-200 to-pink-400 rounded-full shadow-lg" />
      </motion.div>
      
      <motion.div
        className="absolute mt-12"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          leaves: { 
            opacity: 1,
            scale: 1, 
            transition: { 
              duration: 1.5,
              ease: "backOut"
            }
          },
          sway: {
            rotate: [0, 6, 0, -6, 0],
            transition: { 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut", 
              delay: 0.2 
            }
          }
        }}
      >
        <div className="relative w-40 h-10">
          <motion.div 
            className="absolute left-5 text-pink-200 text-3xl transform -rotate-45 filter drop-shadow-md"
            whileHover={{ scale: 1.4, rotate: -60 }}
            animate={{
              rotate: [-45, -55, -45],
              scale: [1, 1.1, 1],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🍃
          </motion.div>
          <motion.div 
            className="absolute right-5 text-pink-200 text-3xl transform rotate-45 filter drop-shadow-md"
            whileHover={{ scale: 1.4, rotate: 60 }}
            animate={{
              rotate: [45, 55, 45],
              scale: [1, 1.1, 1],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🍃
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced dew drops on leaves */}
      <motion.div
        className="absolute mt-10 ml-16"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0.8, 1],
          scale: [0, 1.3, 1, 1.3]
        }}
        transition={{ 
          delay: 2.5, 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 5
        }}
      >
        <div className="w-2 h-2 bg-pink-100 rounded-full shadow-lg opacity-95 backdrop-blur-sm" />
      </motion.div>
      
      <motion.div
        className="absolute mt-10 mr-16"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0.8, 1],
          scale: [0, 1.3, 1, 1.3]
        }}
        transition={{ 
          delay: 3.2, 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 6
        }}
      >
        <div className="w-2 h-2 bg-pink-100 rounded-full shadow-lg opacity-95 backdrop-blur-sm" />
      </motion.div>
    </div>
  );
};

const FlowerBlossom: React.FC = () => {
  const flowerRef = useRef<HTMLDivElement>(null);
  const isDayMode = false; // Always dark mode

  const colorScheme = {
    background: 'from-indigo-900 via-purple-800 to-purple-900',
    text: 'text-pink-200',
  };
  
  return (
    <div 
      className={`min-h-screen w-full bg-gradient-to-b ${colorScheme.background} transition-colors duration-1000 flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Particle effects */}
      <FlowerParticles isDayMode={isDayMode} />
      
      {/* Falling petals effect */}
      <FallingPetals isDayMode={isDayMode} />
      
      {/* Main Content */}
      <motion.div
        ref={flowerRef}
        className="w-4/5 max-w-2xl aspect-square relative z-10 flex flex-col items-center justify-center"
        initial={{ scale: 0.3, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          duration: 2, 
          ease: [0.22, 1, 0.36, 1], 
        }}
      >
        <EnhancedFlower />
        <ShimmerEffect />
      </motion.div>
    </div>
  );
};

export default FlowerBlossom;