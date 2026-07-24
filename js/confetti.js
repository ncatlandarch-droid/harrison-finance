window.Confetti = {
  particles: [],
  canvas: null,
  ctx: null,
  animationId: null,
  isRaining: false,
  rainInterval: null,
  colors: ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b', '#22c55e', '#ffeb3b', '#ff5722'],

  init() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'confetti-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '9999';
      document.body.appendChild(this.canvas);
      
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  },

  resize() {
    if(this.canvas) {
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      this.ctx.scale(dpr, dpr);
    }
  },

  fire(options = {}) {
    this.init();
    
    const count = options.particleCount || 60;
    const origin = options.origin || { x: 0.5, y: 0.5 };
    const colors = options.colors || this.colors;
    
    for (let i = 0; i < count; i++) {
      const shape = options.shape || this.randomShape();
      this.particles.push(this.createParticle(origin.x * window.innerWidth, origin.y * window.innerHeight, colors, shape, options));
    }

    if (!this.animationId) {
      this.loop();
    }
  },

  createParticle(x, y, colors, shape, options) {
    const angle = options.angle ? options.angle * (Math.PI/180) : Math.random() * Math.PI * 2;
    const spread = options.spread ? options.spread * (Math.PI/180) : Math.PI * 2;
    const velocity = (Math.random() * 15 + 5) * (options.velocityMultiplier || 1);
    
    const randomAngle = angle + (Math.random() * spread - spread/2);
    
    return {
      x: x,
      y: y,
      vx: Math.cos(randomAngle) * velocity,
      vy: Math.sin(randomAngle) * velocity - (options.lift || 0),
      size: Math.random() * 10 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shape,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 20,
      tilt: Math.random() * 360,
      tiltSpeed: (Math.random() - 0.5) * 20,
      wobbleX: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.1 + 0.05,
      opacity: 1,
      decay: options.decay || 0.92,
      gravity: options.gravity || 0.5,
      drift: options.drift || (Math.random() - 0.5) * 1,
      char: options.char || null
    };
  },

  randomShape() {
    const shapes = ['rect', 'circle', 'strip', 'star'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  },
  
  celebrate() {
    this.fire({ origin: { x: 0.5, y: 1 }, angle: 270, spread: 60, velocityMultiplier: 1.5, particleCount: 80, gravity: 0.8 });
    setTimeout(() => this.fire({ origin: { x: 0.2, y: 1 }, angle: 290, spread: 40, velocityMultiplier: 1.2, particleCount: 50, gravity: 0.7 }), 200);
    setTimeout(() => this.fire({ origin: { x: 0.8, y: 1 }, angle: 250, spread: 40, velocityMultiplier: 1.2, particleCount: 50, gravity: 0.7 }), 400);
    setTimeout(() => this.fire({ origin: { x: 0, y: 0.6 }, angle: 330, spread: 30, velocityMultiplier: 1.5, particleCount: 40 }), 600);
    setTimeout(() => this.fire({ origin: { x: 1, y: 0.6 }, angle: 210, spread: 30, velocityMultiplier: 1.5, particleCount: 40 }), 800);
  },

  rain(duration = 3000) {
    this.init();
    this.isRaining = true;
    
    this.rainInterval = setInterval(() => {
      this.fire({
        origin: { x: Math.random(), y: -0.1 },
        angle: 90,
        spread: 30,
        velocityMultiplier: 0.3,
        particleCount: 10,
        decay: 1,
        gravity: 0.1,
        drift: Math.random() * 2 - 1
      });
    }, 100);

    setTimeout(() => {
      clearInterval(this.rainInterval);
      this.isRaining = false;
    }, duration);
  },

  moneyRain(duration = 4000) {
    this.init();
    this.isRaining = true;
    
    this.rainInterval = setInterval(() => {
      this.fire({
        origin: { x: Math.random(), y: -0.1 },
        angle: 90,
        spread: 20,
        velocityMultiplier: 0.2,
        particleCount: 5,
        decay: 1,
        gravity: 0.15,
        drift: Math.random() * 1.5 - 0.75,
        shape: 'char',
        char: '$',
        colors: ['#22c55e', '#16a34a', '#15803d']
      });
    }, 150);

    setTimeout(() => {
      clearInterval(this.rainInterval);
      this.isRaining = false;
    }, duration);
  },

  drawStar(ctx, x, y, radius, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? radius : radius / 2;
      const a = (i * Math.PI) / points;
      ctx.lineTo(x + r * Math.sin(a), y - r * Math.cos(a));
    }
    ctx.closePath();
    ctx.fill();
  },

  loop() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    let active = false;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.opacity <= 0 || p.y > window.innerHeight + 50) continue;
      
      active = true;
      
      p.vx *= p.decay;
      p.vy += p.gravity;
      p.x += p.vx + p.drift + Math.sin(p.wobbleX) * 2;
      p.y += p.vy;
      p.wobbleX += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;
      p.tilt += p.tiltSpeed;
      
      if (p.decay < 1) p.opacity -= 0.005; // Only fade out burst particles
      
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      
      // Pseudo 3D rotation
      this.ctx.scale(1, Math.cos((p.tilt * Math.PI) / 180));
      
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      
      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, 2 * Math.PI);
        this.ctx.fill();
      } else if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size, -p.size/2, p.size*2, p.size);
      } else if (p.shape === 'strip') {
        this.ctx.fillRect(-p.size*1.5, -p.size/4, p.size*3, p.size/2);
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, 0, 0, p.size * 1.2, 5);
      } else if (p.shape === 'char' && p.char) {
        this.ctx.font = `bold ${p.size * 2}px "DM Mono", monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(p.char, 0, 0);
      }
      this.ctx.restore();
    }
    
    if (active || this.isRaining) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      this.particles = [];
      this.animationId = null;
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
};
