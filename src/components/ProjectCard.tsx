import { useState, useRef, useEffect } from 'react';

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
      { threshold: 0.1, rootMargin: '50px' }
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

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleImageLoad = () => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[currentImageIndex] = true;
      return newState;
    });
  };

  return (
    <div 
      ref={cardRef}
      className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border border-white/10 
              transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-900/20
              opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] w-full"
      style={{ animationDelay: '100ms' }}
    >
      <div className={`relative h-36 min-h-[9rem] sm:h-44 md:h-52 bg-gradient-to-br ${gradientColors}`}>
        {isVisible && images.length > 0 && (
          <>
            <img 
              src={images[currentImageIndex].src} 
              alt={images[currentImageIndex].alt}
              className={`w-full h-full object-cover object-center transition-opacity duration-300 
                      ${imagesLoaded[currentImageIndex] ? 'opacity-80' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              loading="lazy"
              width="400"
              height="225"
            />
            
            {!imagesLoaded[currentImageIndex] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 sm:p-2 touch-manipulation"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 sm:p-2 touch-manipulation"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
            
            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {currentImageIndex + 1}/{images.length}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-white text-base sm:text-lg font-medium mb-1.5">{title}</h3>
        
        <p className="text-blue-200 text-xs sm:text-sm mb-2 flex-1">
          {shortDescription || description.substring(0, 70) + (description.length > 70 ? '...' : '')}
        </p>
        
        <div className="mb-2.5 flex flex-wrap gap-1">
          {technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-1.5 py-0.5 text-xs rounded text-white bg-gray-600/70 hover:bg-gray-600/90 truncate max-w-[120px]">
              {tech.name}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="px-1.5 py-0.5 text-xs rounded text-white bg-gray-600/50">
              +{technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mt-auto">
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-center rounded text-xs sm:text-sm font-medium"
            >
              Demo
            </a>
          )}
          
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white text-center rounded flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline sm:inline">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
