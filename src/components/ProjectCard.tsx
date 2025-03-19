import { useState, useRef, useEffect } from 'react';
import ImageModal from './ImageModal';

export interface Technology {
  name: string;
  color?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  images: ProjectImage[];
  technologies: Technology[];
  demoUrl?: string;
  githubUrl?: string;
  gradientColors: string;
}

export const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  shortDescription,
  images,
  technologies,
  demoUrl,
  githubUrl,
  gradientColors
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      }, 
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    
    const nextIndex = (currentImageIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex].src;
    
    img.onload = () => {
      setImagesLoaded(prev => {
        const newState = [...prev];
        newState[nextIndex] = true;
        return newState;
      });
    };
  }, [currentImageIndex, images, isVisible]);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleImageLoad = () => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[currentImageIndex] = true;
      return newState;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="flex flex-col bg-gray-900/90 rounded-lg overflow-hidden border border-white/10
                transition-all duration-500 hover:bg-gray-800/90 hover:shadow-lg hover:shadow-blue-900/20
                opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] w-full
                transform hover:-translate-y-1 group"
        style={{ animationDelay: '100ms' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`relative h-40 min-h-[10rem] sm:h-48 md:h-56 overflow-hidden bg-gradient-to-br ${gradientColors} cursor-pointer`}
          onClick={openModal}
        >
          <div className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10`}></div>
          
          {isVisible && images.length > 0 && (
            <>
              <img 
                src={images[currentImageIndex].src} 
                alt={images[currentImageIndex].alt}
                className={`w-full h-full object-contain md:object-cover object-center transition-all duration-700
                        ${imagesLoaded[currentImageIndex] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                        ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
                onLoad={handleImageLoad}
                loading="lazy"
                width="1200"
                height="800"
              />
              
              {!imagesLoaded[currentImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-1.5 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 touch-manipulation z-20
                             sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:shadow-md shadow-black/20"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 touch-manipulation z-20
                             sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:shadow-md shadow-black/20"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              
              {images.length > 1 && (
                <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full z-20 shadow-sm shadow-black/20">
                  {currentImageIndex + 1}/{images.length}
                </div>
              )}

              <div className="absolute bottom-2 left-2 z-20">
                <h3 className="text-white text-sm sm:text-base font-bold text-shadow-lg px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                  {title}
                </h3>
              </div>
              
              {/* Image click indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="p-3 sm:p-4 flex-1 flex flex-col">        
          <p className="text-blue-100 text-xs sm:text-sm mb-2 flex-1 leading-relaxed">
            {shortDescription || description}
          </p>
          
          <div className="mb-3 flex flex-wrap gap-1">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-1.5 py-0.5 text-xs rounded-full text-white bg-gray-700/80 hover:bg-gray-700 truncate max-w-[100px] transition-colors"
                style={{ backgroundColor: tech.color || undefined }}
              >
                {tech.name}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2 mt-auto">
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-center rounded text-xs font-medium
                         transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Live Demo
                </span>
              </a>
            )}
            
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-2 py-1.5 bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white text-center rounded text-xs font-medium
                           flex items-center justify-center gap-1 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </>
  );
}
