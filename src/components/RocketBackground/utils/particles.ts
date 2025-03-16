import * as PIXI from 'pixi.js';

export const ParticleTracker = {
  count: 0,
  maxParticles: 350
};

export interface ParticleBase extends PIXI.Graphics {
  velocity: PIXI.Point;
  life: number;
  maxLife: number;
  ticker?: PIXI.Ticker;
  rotationSpeed?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RocketParticle extends ParticleBase {}

export interface FireTrailParticle extends ParticleBase {
  size: number;
}

export const RocketSizeSettings = {
  desktop: {
    minSize: 0.7,   
    maxSize: 1.3    
  },
  mobile: {
    minSize: 0.8,   
    maxSize: 1.5    
  }
};


export function drawFlameShape(graphics: PIXI.Graphics, size: number, color: number, alpha: number) {
  graphics.fill({ color: color, alpha: alpha });
  
  const points = [
    0, -size * 1.2,       
    size * 0.6, -size * 0.4,  
    size * 0.4, size * 0.4,   
    0, size * 0.8,        
    -size * 0.4, size * 0.4,  
    -size * 0.6, -size * 0.4, 
  ];
  
  graphics.poly(points);
  
  graphics.fill({ color: 0xFFFFFF, alpha: 0.7 });
  graphics.poly([
    0, -size * 0.8,     
    size * 0.3, -size * 0.2,
    size * 0.2, size * 0.2, 
    0, size * 0.4,      
    -size * 0.2, size * 0.2,
    -size * 0.3, -size * 0.2
  ]);
}

export function drawEnergyTrail(graphics: PIXI.Graphics, size: number, color: number, alpha: number) {
  graphics.fill({ color: color, alpha: alpha * 0.5 });
  graphics.circle(0, 0, size);
  
  graphics.fill({ color: color, alpha: alpha });
  graphics.circle(0, 0, size * 0.7);
  
  graphics.fill({ color: 0xFFFFFF, alpha: alpha });
  graphics.circle(0, 0, size * 0.3);
  
  graphics.stroke({ color: 0xFFFFFF, width: 1, alpha: alpha * 0.8 });
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const x1 = Math.cos(angle) * size * 0.4;
    const y1 = Math.sin(angle) * size * 0.4;
    const x2 = Math.cos(angle) * size * 0.7;
    const y2 = Math.sin(angle) * size * 0.7;
    
    graphics.moveTo(x1, y1);
    graphics.lineTo(x2, y2);
  }
}

export function drawEnergyBurst(graphics: PIXI.Graphics, size: number, color: number, alpha: number) {
  graphics.fill({ color: color, alpha: alpha * 0.7 });
  
  const points = 4;
  const outerRadius = size;
  const innerRadius = size * 0.5;
  
  const starPoints: number[] = [];
  
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i / (points * 2)) * Math.PI * 2;
    
    starPoints.push(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    );
  }
  
  graphics.poly(starPoints);
  
  graphics.fill({ color: 0xFFFFFF, alpha: alpha });
  graphics.circle(0, 0, size * 0.3);
}

export function drawStarParticle(graphics: PIXI.Graphics, x: number, y: number, size: number) {
  const points = 5; 
  const outerRadius = size;
  const innerRadius = size / 2;
  const step = Math.PI / points;
  
  const starPoints: number[] = [];
  
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step;
    
    starPoints.push(
      x + radius * Math.cos(angle - Math.PI/2),
      y + radius * Math.sin(angle - Math.PI/2)
    );
  }
  
  graphics.poly(starPoints);
}

export function animateParticle<T extends ParticleBase>(
  particle: T,
  container: PIXI.Container,
  options: {
    fadeRate?: number,
    scaleWithLife?: boolean,
    growOverLife?: boolean,
    scaleVariance?: boolean
  } = {}
) {
  const {
    fadeRate = 1,
    scaleWithLife = true,
    growOverLife = false,
    scaleVariance = false
  } = options;
  
  const ticker = new PIXI.Ticker();
  particle.ticker = ticker;
  
  let lastTime = Date.now();
  let deltaAccumulator = 0;
  const frameInterval = 1000 / 30; 
  
  ticker.add(() => {
    const currentTime = Date.now();
    const elapsed = currentTime - lastTime;
    lastTime = currentTime;
    
    deltaAccumulator += elapsed;
    
    if (deltaAccumulator < frameInterval) {
      return;
    }
    
    while (deltaAccumulator >= frameInterval) {
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      
      if (particle.rotationSpeed) {
        particle.rotation += particle.rotationSpeed;
      }
      
      particle.life -= fadeRate;
      deltaAccumulator -= frameInterval;
    }
    
    const lifeRatio = particle.life / particle.maxLife;
    
    particle.alpha = lifeRatio * (growOverLife ? 0.8 : 1);
    
    if (scaleWithLife) {
      if (scaleVariance) {
        const variance = 0.6 + Math.sin(particle.life / 5) * 0.4;
        particle.scale.set(lifeRatio * variance);
      } else {
        particle.scale.set(lifeRatio);
      }
    }
    
    if (growOverLife) {
      const growth = 1 + (1 - lifeRatio) * 0.5;
      particle.scale.set(growth);
    }
    
    if (particle.life <= 0) {
      container.removeChild(particle);
      ticker.destroy();
      ParticleTracker.count--; 
    }
  });
  
  ticker.start();
  return ticker;
}
