import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FlowerParticles, FallingPetals } from '../components/FlowerEffects';

interface EnhancedFlowerProps {
  isDayMode: boolean;
}

const ShimmerEffect = () => (
  <div className="absolute inset-0 z-[-1] overflow-hidden">
    <div className="shimmer w-[200%] h-[200%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
  </div>
);

const EnhancedFlower: React.FC<EnhancedFlowerProps> = ({ isDayMode }) => {
  const controls = useAnimation();
  const flowerColor = isDayMode ? 
    ["text-pink-600", "text-pink-500", "text-pink-400"] : 
    ["text-purple-500", "text-purple-400", "text-purple-300"];
  
  const flowerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const growSequence = async () => {
      await controls.start("stemGrow");
      await controls.start("leaves");
      await controls.start("bloom");
      controls.start("sway");
      
      if (flowerRef.current) {
        const glowEffect = document.createElement('div');
        glowEffect.className = isDayMode 
          ? 'absolute inset-0 rounded-full bg-pink-300 opacity-0 blur-xl z-[-1]' 
          : 'absolute inset-0 rounded-full bg-purple-400 opacity-0 blur-xl z-[-1]';
        flowerRef.current.appendChild(glowEffect);
        
        setTimeout(() => {
          glowEffect.style.transition = 'opacity 2s ease-in-out, transform 2s ease-in-out';
          glowEffect.style.opacity = '0.3';
          
          setInterval(() => {
            glowEffect.style.transform = 'scale(1.1)';
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
  }, [controls, isDayMode]);

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
            scale: [0.8, 1.1, 1], 
            transition: { 
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1] 
            } 
          },
          sway: {
            rotate: [0, 2, 0, -2, 0],
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
          whileHover={{ scale: 1.05 }}
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
              duration: 1,
              ease: "backOut"
            }
          },
          sway: {
            rotate: [0, 3, 0, -3, 0],
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
              duration: 1,
              ease: "backOut"
            }
          },
          sway: {
            rotate: [0, -2, 0, 2, 0],
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
              duration: 1.5, 
              ease: "easeOut" 
            }
          },
          sway: {
            rotate: [0, 1, 0, -1, 0],
            transition: { 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }
          }
        }}
      >
        <div className="h-24 w-2 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-sm" />
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
              duration: 0.8,
              ease: "backOut"
            }
          },
          sway: {
            rotate: [0, 3, 0, -3, 0],
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
            className="absolute left-5 text-green-600 text-3xl transform -rotate-45 filter drop-shadow-md"
            whileHover={{ scale: 1.1, rotate: -50 }}
          >
            🍃
          </motion.div>
          <motion.div 
            className="absolute right-5 text-green-600 text-3xl transform rotate-45 filter drop-shadow-md"
            whileHover={{ scale: 1.1, rotate: 50 }}
          >
            🍃
          </motion.div>
        </div>
      </motion.div>
      
      {/* Dew drops on leaves */}
      <motion.div
        className="absolute mt-10 ml-16"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.7, 0.5, 0.7],
          scale: [0, 1, 0.9, 1]
        }}
        transition={{ 
          delay: 2.5, 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 5
        }}
      >
        <div className="w-2 h-2 bg-blue-200 rounded-full shadow-sm opacity-80 backdrop-blur-sm" />
      </motion.div>
      
      <motion.div
        className="absolute mt-10 mr-16"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.7, 0.5, 0.7],
          scale: [0, 1, 0.9, 1]
        }}
        transition={{ 
          delay: 3.2, 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 6
        }}
      >
        <div className="w-2 h-2 bg-blue-200 rounded-full shadow-sm opacity-80 backdrop-blur-sm" />
      </motion.div>
    </div>
  );
};

const FlowerBlossom: React.FC = () => {
  const [isDayMode, setIsDayMode] = useState(true);
  const flowerRef = useRef<HTMLDivElement>(null);

  const colorScheme = {
    background: isDayMode 
      ? 'from-blue-200 via-pink-50 to-pink-100' 
      : 'from-indigo-900 via-purple-800 to-purple-900',
    text: isDayMode ? 'text-pink-800' : 'text-pink-200',
  };
  
  return (
    <div 
      className={`min-h-screen w-full bg-gradient-to-b ${colorScheme.background} transition-colors duration-1000 flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Particle effects */}
      <FlowerParticles isDayMode={isDayMode} />
      
      {/* Falling petals effect */}
      <FallingPetals isDayMode={isDayMode} />
      

      <motion.div 
        className="fixed top-6 right-6 z-20 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDayMode(!isDayMode)}
      >
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full p-2 shadow-lg flex items-center justify-center transition-all hover:bg-white/30">
          <AnimatePresence mode="wait">
            {isDayMode ? (
              <motion.span 
                key="sun"
                className="text-3xl" 
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                ☀️
              </motion.span>
            ) : (
              <motion.span 
                key="moon"
                className="text-3xl"
                initial={{ rotate: 30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                🌙
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
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
        <EnhancedFlower isDayMode={isDayMode} />
        <ShimmerEffect />
      </motion.div>

      {/* Message Text */}
      <motion.div
        className={`mt-8 text-center ${colorScheme.text} z-10 backdrop-blur-sm bg-white/5 p-6 rounded-2xl shadow-lg`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
            Bu sayfa JavaScript’siz çalışmaz
        </motion.h2>
        <motion.p 
          className="mt-2 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
        tıpkı kalbimin sensiz çalışmadığı gibi
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FlowerBlossom;