import * as PIXI from 'pixi.js';
import { 
  ParticleTracker, 
  RocketParticle, 
  FireTrailParticle, 
  drawFlameShape,
  drawEnergyTrail, 
  drawEnergyBurst,
  drawStarParticle,
  animateParticle,
  RocketSizeSettings
} from './utils/particles';

interface RocketOptions {
  isLowPowerDevice?: boolean;
}

export function createRockets(app: PIXI.Application, count: number, options: RocketOptions = {}) {
  const { width, height } = app.renderer.screen;
  const { isLowPowerDevice = false } = options;

  const rocketContainer = new PIXI.Container();
  rocketContainer.label = 'rockets';
  app.stage.addChild(rocketContainer);

  ParticleTracker.count = 0;
  ParticleTracker.maxParticles = isLowPowerDevice ? 120 : 240;

  // Use the requested count without limiting
  const adjustedCount = count;
  
  for (let i = 0; i < adjustedCount; i++) {
    const rocketType = Math.floor(Math.random() * 4);
    createRocket(app, rocketContainer, width, height, rocketType, { isLowPowerDevice });
  }
}

function createRocket(
  app: PIXI.Application, 
  container: PIXI.Container, 
  width: number, 
  height: number, 
  rocketType: number, 
  options: RocketOptions = {}
) {
  const { isLowPowerDevice = false } = options;
  const rocket = new PIXI.Container();
  
  const sizeSettings = window.innerWidth >= 768 ? 
    RocketSizeSettings.desktop : 
    RocketSizeSettings.mobile;
  
  const speed = 0.8 + Math.random() * (isLowPowerDevice ? 1.5 : 2);
  const size = sizeSettings.minSize + Math.random() * (sizeSettings.maxSize - sizeSettings.minSize);
  const rotation = -Math.PI / 4 + (Math.random() * Math.PI / 2);
  
  const colorSchemes = [
    { 
      body: 0xFFFFFF, 
      head: 0xFF3300, 
      fins: 0xFF6600, 
      particles: [0xFF6600, 0xFFAA00, 0xFF3300, 0xFFDD00],
      glow: 0xFF8844,
      fireColors: [0xFF3300, 0xFF6600, 0xFFAA00, 0xFFFF00]
    },
    { 
      body: 0x33CCFF, 
      head: 0x3366FF, 
      fins: 0x0033CC, 
      particles: [0x33CCFF, 0x66FFFF, 0x00FFFF, 0x00CCFF], 
      glow: 0x66AAFF,
      fireColors: [0x00DDFF, 0x00BBFF, 0x00FFFF, 0x99EEFF] 
    },
    { 
      body: 0xFFD700, 
      head: 0xFF8C00, 
      fins: 0xFFA500, 
      particles: [0xFF8C00, 0xFFD700, 0xFFFF00, 0xFFEE44], 
      glow: 0xFFBB33,
      fireColors: [0xFFDD00, 0xFF8800, 0xFFCC00, 0xFFFF44] 
    },
    { 
      body: 0xAA00FF, 
      head: 0x9900FF, 
      fins: 0xCC00FF, 
      particles: [0x9900FF, 0xFF00FF, 0xEE77FF, 0xCC88FF], 
      glow: 0xCC66FF,
      fireColors: [0xFF00FF, 0xDD00FF, 0xEE77FF, 0xFF99FF] 
    }
  ];
  
  const colors = colorSchemes[rocketType % colorSchemes.length];
  
  const fireTrailContainer = new PIXI.Container();
  rocket.addChild(fireTrailContainer);
  
  const bodyContainer = new PIXI.Container();
  rocket.addChild(bodyContainer);
  
  const bodyGraphics = new PIXI.Graphics();
  bodyContainer.addChild(bodyGraphics);
  
  switch (rocketType) {
    case 0:
      bodyGraphics.fill({ color: colors.body });
      bodyGraphics.rect(-5, -15, 10, 30);
      
      bodyGraphics.fill({ color: 0x999999 });
      bodyGraphics.rect(-4, -5, 8, 3);
      
      bodyGraphics.fill({ color: 0xFFFFFF, alpha: 0.4 });
      bodyGraphics.rect(-4, -10, 3, 12);
      
      bodyGraphics.fill({ color: colors.head });
      bodyGraphics.poly([
        -5, -15,
        5, -15,
        0, -25
      ]);
      
      bodyGraphics.fill({ color: colors.fins });
      bodyGraphics.poly([
        -5, 15,
        -15, 15,
        -5, 0
      ]);
      bodyGraphics.poly([
        5, 15,
        15, 15,
        5, 0
      ]);
      
      if (!isLowPowerDevice) {
        bodyGraphics.fill({ color: colors.body, alpha: 0.5 });
        bodyGraphics.poly([
          -7, 12,
          -12, 13,
          -6, 3
        ]);
        bodyGraphics.poly([
          7, 12,
          12, 13,
          6, 3
        ]);
        
        bodyGraphics.stroke({ color: 0xFFFFFF, width: 1, alpha: 0.7 });
        bodyGraphics.moveTo(-3, -12);
        bodyGraphics.lineTo(3, -12);
        
        bodyGraphics.fill({ color: 0xFFFFFF, alpha: 0.8 });
        bodyGraphics.circle(-2, -18, 1);
      }
      break;
      
    case 1:
      bodyGraphics.fill({ color: colors.body });
      bodyGraphics.rect(-4, -20, 8, 40);
      
      bodyGraphics.fill({ color: 0x999999 });
      bodyGraphics.rect(-4, -10, 8, 2);
      bodyGraphics.rect(-4, 5, 8, 2);
      
      bodyGraphics.fill({ color: colors.head });
      bodyGraphics.poly([
        -4, -20,
        4, -20,
        0, -35
      ]);
      
      bodyGraphics.fill({ color: colors.fins });
      bodyGraphics.poly([
        -4, 20,
        -16, 30,
        -4, 5
      ]);
      bodyGraphics.poly([
        4, 20,
        16, 30,
        4, 5
      ]);
      
      if (!isLowPowerDevice) {
        bodyGraphics.stroke({ color: 0x000000, width: 1, alpha: 0.3 });
        bodyGraphics.moveTo(-4, 15);
        bodyGraphics.lineTo(-10, 20);
        bodyGraphics.moveTo(4, 15);
        bodyGraphics.lineTo(10, 20);
      }
      
      bodyGraphics.fill({ color: 0x88FFFF, alpha: 0.9 });
      bodyGraphics.circle(-2, -5, 1.5);
      bodyGraphics.circle(2, -5, 1.5);
      bodyGraphics.circle(-2, 0, 1.5);
      bodyGraphics.circle(2, 0, 1.5);
      break;
      
    case 2:
      bodyGraphics.fill({ color: colors.body });
      bodyGraphics.rect(-6, -10, 12, 25);
      
      bodyGraphics.fill({ color: 0x88CCFF });
      bodyGraphics.circle(-3, 0, 2);
      bodyGraphics.circle(3, 0, 2);
      
      bodyGraphics.fill({ color: colors.head });
      bodyGraphics.circle(0, -10, 6);
      
      bodyGraphics.fill({ color: colors.fins });
      bodyGraphics.poly([
        -6, 15,
        -12, 20,
        -6, 5
      ]);
      bodyGraphics.poly([
        6, 15,
        12, 20,
        6, 5
      ]);
      
      if (!isLowPowerDevice) {
        bodyGraphics.fill({ color: colors.head, alpha: 0.7 });
        bodyGraphics.rect(-6, 5, 12, 3);
      }
      
      bodyGraphics.fill({ color: 0x88CCFF, alpha: 0.9 });
      bodyGraphics.circle(-3, 0, 2.5);
      bodyGraphics.circle(3, 0, 2.5);
      
      if (!isLowPowerDevice) {
        bodyGraphics.stroke({ color: colors.head, width: 1, alpha: 0.8 });
        bodyGraphics.arc(0, -10, 6, 0, Math.PI);
      }
      break;
      
    case 3:
      bodyGraphics.fill({ color: colors.body });
      bodyGraphics.rect(-5, -15, 10, 30);
      
      bodyGraphics.fill({ color: 0x88FFFF, alpha: 0.7 });
      bodyGraphics.rect(-3, -8, 6, 12);
      
      bodyGraphics.fill({ color: colors.head });
      bodyGraphics.circle(0, -15, 5);
      
      bodyGraphics.fill({ color: colors.fins });
      bodyGraphics.poly([
        -5, 5,
        -20, 0,
        -20, -5,
        -5, -5
      ]);
      bodyGraphics.poly([
        5, 5,
        20, 0,
        20, -5,
        5, -5
      ]);
      
      if (!isLowPowerDevice) {
        bodyGraphics.stroke({ color: colors.head, width: 1, alpha: 0.6 });
        bodyGraphics.moveTo(-5, 0);
        bodyGraphics.lineTo(-15, -2);
        bodyGraphics.moveTo(5, 0);
        bodyGraphics.lineTo(15, -2);
      }
      
      bodyGraphics.fill({ color: 0xAAFFFF, alpha: 0.8 });
      bodyGraphics.rect(-3, -8, 6, 14);
      
      if (!isLowPowerDevice) {
        const wingGlowContainer = new PIXI.Container();
        rocket.addChild(wingGlowContainer);
        
        const wingGlowGraphics = new PIXI.Graphics();
        wingGlowGraphics.fill({ color: colors.fins, alpha: 0.3 });
        wingGlowGraphics.rect(-25, -8, 50, 10);
        wingGlowContainer.addChild(wingGlowGraphics);
        
        const coreGlowContainer = new PIXI.Container();
        rocket.addChild(coreGlowContainer);
        
        const coreGlowGraphics = new PIXI.Graphics();
        coreGlowGraphics.fill({ color: 0xAAFFFF, alpha: 0.5 });
        coreGlowGraphics.circle(0, 0, 10);
        coreGlowContainer.addChild(coreGlowGraphics);
        
        app.ticker.add((ticker) => {
          const time = ticker.lastTime / 400;
          const pulseFactor = 0.7 + Math.sin(time) * 0.4;
          
          if (coreGlowContainer.parent) {
            coreGlowContainer.scale.set(pulseFactor);
          }
        });
      }
      break;
  }
  
  const glowContainer = new PIXI.Container();
  const glowGraphics = new PIXI.Graphics();
  glowContainer.addChild(glowGraphics);
  rocket.addChild(glowContainer);
  
  glowGraphics.fill({ color: colors.glow, alpha: isLowPowerDevice ? 0.2 : 0.4 });
  
  switch(rocketType) {
    case 0:
    case 1:
      glowGraphics.circle(0, 0, isLowPowerDevice ? 15 : 26);
      break;
    case 2:
      glowGraphics.circle(0, -5, isLowPowerDevice ? 15 : 22);
      break;
    case 3:
      if (!isLowPowerDevice) {
        glowGraphics.rect(-25, -25, 50, 50);
      }
      glowGraphics.circle(0, -15, isLowPowerDevice ? 15 : 18);
      break;
  }
  
  const fireTrail = new PIXI.Container();
  fireTrail.position.set(0, 20);
  rocket.addChild(fireTrail);
  
  const trailContainer = new PIXI.Container();
  trailContainer.label = 'trail';
  rocket.addChild(trailContainer);
  
  rocket.scale.set(size);
  rocket.rotation = rotation;
  
  rocket.position.set(
    Math.random() * width,
    height - 100
  );
  
  container.addChild(rocket);
  
  const particleFrequency = isLowPowerDevice ? 0.8 : 0.6;
  const particleBurstFrequency = isLowPowerDevice ? 0.995 : 0.98;
  const fireTrailFrequency = isLowPowerDevice ? 0.9 : 0.75;
  
  const wobbleAmount = isLowPowerDevice ? 0.01 : 0.02;
  const wobbleSpeed = Math.random() * (isLowPowerDevice ? 0.04 : 0.08);
  let wobbleOffset = Math.random() * Math.PI * 2;
  
  app.ticker.add((ticker) => {
    wobbleOffset += wobbleSpeed * ticker.deltaTime;
    const wobbleFactor = Math.sin(wobbleOffset) * wobbleAmount;
    
    const baseRotation = rocket.rotation;
    const currentRotation = baseRotation + wobbleFactor;
    const vx = Math.sin(currentRotation) * speed;
    const vy = -Math.cos(currentRotation) * speed;
    
    rocket.position.x += vx;
    rocket.position.y += vy;
    
    rocket.rotation = baseRotation + wobbleFactor * 0.2;
    
    if (rocket.position.y < -50 || 
        rocket.position.x < -50 || 
        rocket.position.x > width + 50) {
      rocket.position.set(
        Math.random() * width,
        height + 50
      );
      rocket.rotation = -Math.PI / 4 + (Math.random() * Math.PI / 2);
    }
    
    if (Math.random() > particleFrequency && ParticleTracker.count < ParticleTracker.maxParticles) {
      createExhaustParticle(trailContainer, colors.particles, rocketType, { isLowPowerDevice });
    }
    
    if (Math.random() > fireTrailFrequency && ParticleTracker.count < ParticleTracker.maxParticles) {
      createFireTrailParticle(fireTrail, colors.fireColors, rocketType, { isLowPowerDevice });
    }
    
    if (Math.random() > particleBurstFrequency && ParticleTracker.count < ParticleTracker.maxParticles) {
      createParticleBurst(trailContainer, colors.particles, rocketType, { isLowPowerDevice });
    }
    
    const glowPulse = isLowPowerDevice ? 
      0.95 + Math.sin(app.ticker.lastTime / 400) * 0.1 : 
      0.9 + Math.sin(app.ticker.lastTime / 400) * 0.15;
    glowContainer.scale.set(glowPulse);
  });
}

function createFireTrailParticle(
  container: PIXI.Container, 
  fireColors: number[], 
  rocketType: number, 
  options: RocketOptions = {}
) {
  const { isLowPowerDevice = false } = options;
  
  ParticleTracker.count++;
  if (ParticleTracker.count > ParticleTracker.maxParticles) return;
  
  const particle = new PIXI.Container() as FireTrailParticle;
  const particleGraphics = new PIXI.Graphics();
  
  const size = isLowPowerDevice ? 
    2 + Math.random() * 3 : 
    3 + Math.random() * 5;
    
  particle.size = size;
  const color = fireColors[Math.floor(Math.random() * fireColors.length)];
  
  switch(rocketType) {
    case 0:
      drawFlameShape(particleGraphics, size, color, 0.8);
      break;
    case 1:
      drawEnergyTrail(particleGraphics, size, color, 0.8);
      break;
    case 2:
      particleGraphics.fill({ color, alpha: 0.8 });
      particleGraphics.circle(0, 0, size);
      
      if (!isLowPowerDevice) {
        particleGraphics.fill({ color: 0xFFFFFF, alpha: 0.5 });
        particleGraphics.circle(0, 0, size * 0.4);
      }
      break;
    case 3:
      drawEnergyBurst(particleGraphics, size, color, 0.8);
      break;
  }
  
  particle.addChild(particleGraphics);
  
  particle.position.set(
    (Math.random() - 0.5) * 10,
    Math.random() * 5 + 20
  );
  
  particle.rotationSpeed = (Math.random() - 0.5) * 0.2;
  particle.velocity = new PIXI.Point(
    (Math.random() - 0.5) * 0.8,
    Math.random() * 1.5 + 1.5
  );
  particle.maxLife = isLowPowerDevice ? 
    15 + Math.random() * 15 : 
    20 + Math.random() * 25;
  particle.life = particle.maxLife;
  
  container.addChild(particle);
  
  animateParticle(particle, container, { 
    growOverLife: true,
    fadeRate: isLowPowerDevice ? 1.2 : 1
  });
}

function createExhaustParticle(
  container: PIXI.Container, 
  particleColors: number[], 
  rocketType: number,
  options: RocketOptions = {}
) {
  const { isLowPowerDevice = false } = options;
  
  ParticleTracker.count++;
  if (ParticleTracker.count > ParticleTracker.maxParticles) return;
  
  const particle = new PIXI.Container() as RocketParticle;
  const particleGraphics = new PIXI.Graphics();
  
  const size = isLowPowerDevice ? 
    1 + Math.random() * 1.5 : 
    1.5 + Math.random() * 2.5;
  const color = particleColors[Math.floor(Math.random() * particleColors.length)];
  
  switch(rocketType) {
    case 0:
      particleGraphics.fill({ color, alpha: 0.9 });
      particleGraphics.circle(0, 0, size);
      break;
    case 1:
      particleGraphics.fill({ color, alpha: 0.9 });
      particleGraphics.rect(-size/2, -size/2, size, size);
      break;
    case 2:
      particleGraphics.fill({ color, alpha: 0.9 });
      particleGraphics.poly([
        0, -size,
        size, size,
        -size, size
      ]);
      break;
    case 3:
      particleGraphics.fill({ color, alpha: 0.9 });
      drawStarParticle(particleGraphics, 0, 0, size);
      break;
  }
  
  particle.addChild(particleGraphics);
  
  particle.position.set(
    (Math.random() - 0.5) * 8,
    15
  );
  
  particle.rotationSpeed = (Math.random() - 0.5) * 0.3;
  particle.velocity = new PIXI.Point(
    (Math.random() - 0.5) * 1.6,
    Math.random() * 1.5 + 1.2
  );
  particle.maxLife = isLowPowerDevice ? 
    15 + Math.random() * 15 : 
    20 + Math.random() * 30;
  particle.life = particle.maxLife;
  
  container.addChild(particle);
  
  if (!isLowPowerDevice && Math.random() > 0.7) {
    const glowContainer = new PIXI.Container();
    const glowGraphics = new PIXI.Graphics();
    glowGraphics.fill({ color, alpha: 0.3 });
    glowGraphics.circle(0, 0, size * 1.8);
    glowContainer.addChild(glowGraphics);
    particle.addChild(glowContainer);
  }
  
  animateParticle(particle, container, { 
    scaleVariance: true,
    fadeRate: isLowPowerDevice ? 1.2 : 1
  });
}

function createParticleBurst(
  container: PIXI.Container, 
  particleColors: number[], 
  rocketType: number,
  options: RocketOptions = {}
) {
  const { isLowPowerDevice = false } = options;
  const burstCount = isLowPowerDevice ? 
    2 + Math.floor(Math.random() * 2) : 
    4 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < burstCount; i++) {
    ParticleTracker.count++;
    if (ParticleTracker.count > ParticleTracker.maxParticles) return;
    
    const particle = new PIXI.Container() as RocketParticle;
    const particleGraphics = new PIXI.Graphics();
    
    const size = isLowPowerDevice ? 
      0.7 + Math.random() * 1 : 
      1 + Math.random() * 1.5;
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    
    particleGraphics.fill({ color, alpha: 0.9 });
    
    switch(rocketType) {
      case 0:
        particleGraphics.circle(0, 0, size);
        break;
      case 1:
        particleGraphics.rect(-size/2, -size/2, size, size);
        break;
      case 2:
        particleGraphics.poly([
          0, -size,
          size, size,
          -size, size
        ]);
        break;
      case 3:
        drawStarParticle(particleGraphics, 0, 0, size);
        break;
    }
    
    particle.addChild(particleGraphics);
    
    particle.position.set(
      (Math.random() - 0.5) * 12,
      15
    );
    
    particle.velocity = new PIXI.Point(
      (Math.random() - 0.5) * 3,
      Math.random() * 3 + 2
    );
    particle.maxLife = isLowPowerDevice ? 
      5 + Math.random() * 5 : 
      10 + Math.random() * 10;
    particle.life = particle.maxLife;
    particle.rotationSpeed = (Math.random() - 0.5) * 0.3;
    
    container.addChild(particle);
    
    animateParticle(particle, container, { 
      fadeRate: isLowPowerDevice ? 2 : 1.5 
    });
  }
}
