import { useEffect, useRef, ReactNode, useState } from 'react';
import * as PIXI from 'pixi.js';
import { createRockets } from './rockets';

interface RocketBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function RocketBackground({ children, className = '' }: RocketBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    if (appRef.current) {
      appRef.current.destroy();
      appRef.current = null;
    }

    const isMobile = window.innerWidth < 768;
    const isSmallDevice = window.innerWidth < 480;
    const isLowPowerDevice = isMobile && navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true;
    
    async function setupPixi() {
      try {
        const app = new PIXI.Application();
        
        const width = containerRef.current?.clientWidth || window.innerWidth;
        const height = Math.min(
          containerRef.current?.clientHeight || window.innerHeight,
          window.innerHeight
        );
        
        await app.init({
          background: 0x050A30,
          width,
          height,
          antialias: !isMobile,
          resolution: Math.min(isSmallDevice ? 0.75 : (isMobile ? 0.9 : 1.1), window.devicePixelRatio || 1),
          autoDensity: true,
          powerPreference: "low-power",
        });
        
        if (!app.canvas || !containerRef.current || !isMounted) return;
        
        containerRef.current.appendChild(app.canvas);
        appRef.current = app;

        createRockets(app, determineRocketCount(), { isLowPowerDevice });
        
        app.ticker.maxFPS = isSmallDevice ? 20 : (isMobile ? 24 : 30);
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
      }
    }
    
    setupPixi();

    let resizeTimeout: number;
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        if (!appRef.current || !containerRef.current || !isMounted) return;
        
        const width = containerRef.current.clientWidth;
        const height = Math.min(containerRef.current.clientHeight, window.innerHeight);
        
        appRef.current.renderer.resize(width, height);
        
        appRef.current.stage.removeChildren();
        createRockets(appRef.current, determineRocketCount(), { isLowPowerDevice: true });
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [isMounted]);

  const determineRocketCount = () => {
    const width = window.innerWidth;
    
    if (width < 480) return 4;
    if (width < 768) return 4; 
    if (width < 1200) return 8;
    return 15;
  };

  return (
    <div className="relative w-full min-h-screen">
      <div 
        ref={containerRef} 
        className={`fixed inset-0 -z-10 ${className}`}
        style={{ 
          height: '100vh', 
          width: '100vw',
          maxHeight: '100vh', 
          overflow: 'hidden',
          pointerEvents: 'none' 
        }}
      />
      {children}
    </div>
  );
}
