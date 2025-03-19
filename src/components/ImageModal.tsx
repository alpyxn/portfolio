import { useEffect, useState } from 'react';
import { ProjectImage } from './ProjectCard';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProjectImage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add keyboard event listeners for navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          setCurrentIndex((currentIndex + 1) % images.length);
          break;
        case 'ArrowLeft':
          setCurrentIndex((currentIndex - 1 + images.length) % images.length);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, setCurrentIndex, onClose]);
  
  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  if (!isOpen) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={onClose}
          className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 sm:p-4 touch-manipulation z-20 shadow-lg shadow-black/30"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 sm:p-4 touch-manipulation z-20 shadow-lg shadow-black/30"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
        
        <div className="relative h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-3 border-blue-500/60 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain transition-opacity duration-300"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={handleImageLoad}
          />
        </div>
        
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full z-20 shadow-md">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
