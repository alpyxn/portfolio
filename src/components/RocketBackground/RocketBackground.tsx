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
  const resizeTimerRef = useRef<number | null>(null);

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
        
        const width = window.innerWidth;
        const height = window.innerHeight * 1.2;
        
        await app.init({
          background: 0x050A30,
          width,
          height,
          antialias: !isSmallDevice,
          resolution: Math.min(isSmallDevice ? 0.9 : (isMobile ? 1 : 1.1), window.devicePixelRatio || 1),
          autoDensity: true,
          powerPreference: "low-power",
        });
        
        if (!app.canvas || !containerRef.current || !isMounted) return;
        
        containerRef.current.appendChild(app.canvas);
        appRef.current = app;

        createRockets(app, determineRocketCount(), { isLowPowerDevice });
        
        app.ticker.maxFPS = isSmallDevice ? 30 : (isMobile ? 30 : 30);
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
      }
    }
    
    setupPixi();

    const handleResize = () => {
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
      
      resizeTimerRef.current = window.setTimeout(() => {
        if (!appRef.current || !containerRef.current || !isMounted) return;
        
        const width = window.innerWidth;
        const height = window.innerHeight * 1.2;
        
        appRef.current.renderer.resize(width, height);
        
        appRef.current.stage.removeChildren();
        createRockets(appRef.current, determineRocketCount(), { isLowPowerDevice });
        
        resizeTimerRef.current = null;
      }, 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [isMounted]);

  const determineRocketCount = () => {
    const width = window.innerWidth;
    
    if (width < 480) return 6;
    if (width < 768) return 8; 
    if (width < 1200) return 10;
    return 15;
  };

  return (
    <div className="relative w-full min-h-screen">
      <div 
        ref={containerRef} 
        className={`fixed inset-0 -z-10 ${className}`}
        style={{ 
          height: '120vh', 
          width: '100vw',
          overflow: 'hidden',
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      />
      {children}
    </div>
  );
}
