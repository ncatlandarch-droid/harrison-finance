window.Confetti = {
  particles: [],
  canvas: null,
  ctx: null,
  animationId: null,

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
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  },

  fire(options = {}) {
    this.init();
    
    const count = options.particleCount || 50;
    const origin = options.origin || { x: 0.5, y: 0.5 };
    const colors = options.colors || ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b', '#22c55e'];
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: origin.x * this.canvas.width,
        y: origin.y * this.canvas.height,
        vx: (Math.random() - 0.5) * (options.spread || 20),
        vy: (Math.random() - 0.7) * (options.spread || 20),
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
        opacity: 1,
        decay: options.decay || 0.95,
        gravity: options.gravity || 1
      });
    }

    if (!this.animationId) {
      this.loop();
    }
  },
  
  celebrate() {
    this.fire({ origin: { x: 0.2, y: 0.8 } });
    setTimeout(() => this.fire({ origin: { x: 0.5, y: 0.8 } }), 200);
    setTimeout(() => this.fire({ origin: { x: 0.8, y: 0.8 } }), 400);
  },

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    let active = false;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.opacity <= 0) continue;
      
      active = true;
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.decay;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.01;
      
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      
      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      this.ctx.restore();
    }
    
    if (active) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      this.particles = [];
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
};
