window.Charts = {
  
  _setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    
    // Support DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    // Default size if client rect is 0
    const w = rect.width || 300;
    const h = rect.height || 150;
    
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    
    return { ctx, width: w, height: h, dpr, canvas };
  },

  donut(canvasId, data, options = {}) {
    const setup = this._setupCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height, canvas } = setup;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.85;
    const innerRadius = radius * (options.innerRadius || 0.65);
    
    let total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) total = 1;
    
    let animationProgress = options.animate === false ? 1 : 0;
    
    // Interactive state
    let hoveredIndex = -1;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      let angle = -0.5 * Math.PI;
      
      data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI * animationProgress;
        const isHovered = index === hoveredIndex;
        
        ctx.beginPath();
        const r = isHovered ? radius + 5 : radius;
        ctx.arc(centerX, centerY, r, angle, angle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, angle + sliceAngle, angle, true);
        ctx.closePath();
        
        ctx.fillStyle = item.color || '#ccc';
        
        if (isHovered) {
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        angle += sliceAngle;
      });
      
      if (options.centerValue) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary');
        ctx.font = '700 28px "DM Mono", monospace';
        ctx.fillText(options.centerValue, centerX, centerY - 10);
        
        if (options.centerLabel) {
          ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
          ctx.font = '500 14px "Outfit", sans-serif';
          ctx.fillText(options.centerLabel, centerX, centerY + 20);
        }
      }
      
      // Tooltip drawing
      if (hoveredIndex !== -1 && animationProgress === 1) {
        const item = data[hoveredIndex];
        const percent = Math.round((item.value / total) * 100);
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.beginPath();
        ctx.roundRect(10, 10, 150, 60, 8);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '600 14px "Outfit", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.label}`, 20, 30);
        ctx.fillStyle = item.color;
        ctx.font = '700 16px "DM Mono", monospace';
        ctx.fillText(`${item.value} (${percent}%)`, 20, 50);
      }
      
      if (animationProgress < 1) {
        animationProgress += 0.04;
        if(animationProgress > 1) animationProgress = 1;
        requestAnimationFrame(draw);
      }
    };
    
    // Interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist >= innerRadius && dist <= radius + 5) {
        let theta = Math.atan2(dy, dx);
        if (theta < -0.5 * Math.PI) theta += 2 * Math.PI;
        
        let angle = -0.5 * Math.PI;
        let found = -1;
        for(let i=0; i<data.length; i++) {
          const sliceAngle = (data[i].value / total) * 2 * Math.PI;
          if (theta >= angle && theta <= angle + sliceAngle) {
            found = i;
            break;
          }
          angle += sliceAngle;
        }
        
        if (hoveredIndex !== found) {
          hoveredIndex = found;
          draw();
        }
      } else {
        if (hoveredIndex !== -1) {
          hoveredIndex = -1;
          draw();
        }
      }
    });
    
    draw();
  },
  
  bar(canvasId, data, options = {}) {
    const setup = this._setupCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;
    
    let maxVal = Math.max(...data.map(d => d.value));
    if(maxVal === 0) maxVal = 1;
    
    const padding = 40;
    const availableW = width - padding * 2;
    const availableH = height - padding * 2;
    const barWidth = Math.min(40, availableW / data.length * 0.6);
    const spacing = (availableW - (barWidth * data.length)) / (data.length + 1);
    
    let animationProgress = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      data.forEach((item, i) => {
        const x = padding + spacing + i * (barWidth + spacing);
        const barHeight = (item.value / maxVal) * availableH * animationProgress;
        const y = height - padding - barHeight;
        
        // Gradient
        const grad = ctx.createLinearGradient(x, y, x, height - padding);
        const baseColor = item.color || getComputedStyle(document.body).getPropertyValue('--primary').trim();
        grad.addColorStop(0, baseColor);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();
        
        // Value label
        if (animationProgress > 0.8) {
          ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary');
          ctx.font = '600 12px "DM Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(item.value, x + barWidth/2, y - 5);
        }
        
        // X label
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
        ctx.font = '12px "Outfit", sans-serif';
        ctx.fillText(item.label, x + barWidth/2, height - padding + 20);
      });
      
      if (animationProgress < 1) {
        animationProgress += 0.05;
        if(animationProgress > 1) animationProgress = 1;
        requestAnimationFrame(draw);
      }
    };
    draw();
  },
  
  line(canvasId, data, options = {}) {
    const setup = this._setupCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;
    
    let maxVal = Math.max(...data.map(d => d.value));
    if(maxVal === 0) maxVal = 1;
    
    const padding = 40;
    const availableW = width - padding * 2;
    const availableH = height - padding * 2;
    const stepX = availableW / Math.max(1, data.length - 1);
    
    let animationProgress = 0;
    
    const primary = getComputedStyle(document.body).getPropertyValue('--primary').trim();
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      if (data.length === 0) return;
      
      const drawPoints = Math.max(1, Math.floor(data.length * animationProgress));
      
      ctx.beginPath();
      
      let firstX = padding;
      let firstY = height - padding - (data[0].value / maxVal) * availableH;
      ctx.moveTo(firstX, firstY);
      
      // Bezier curves
      for(let i=0; i<drawPoints - 1; i++) {
        const x1 = padding + i * stepX;
        const y1 = height - padding - (data[i].value / maxVal) * availableH;
        const x2 = padding + (i+1) * stepX;
        const y2 = height - padding - (data[i+1].value / maxVal) * availableH;
        
        const cp1x = x1 + (x2 - x1) / 2;
        const cp1y = y1;
        const cp2x = x1 + (x2 - x1) / 2;
        const cp2y = y2;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
      }
      
      ctx.strokeStyle = primary;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Fill under
      if (drawPoints > 1) {
        ctx.lineTo(padding + (drawPoints - 1) * stepX, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.closePath();
        
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, 'rgba(100, 100, 255, 0.3)');
        grad.addColorStop(1, 'rgba(100, 100, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
      
      // Points
      data.slice(0, drawPoints).forEach((item, i) => {
        const x = padding + i * stepX;
        const y = height - padding - (item.value / maxVal) * availableH;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI*2);
        ctx.fillStyle = primary;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (options.showLabels) {
          ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
          ctx.font = '11px "Outfit"';
          ctx.textAlign = 'center';
          ctx.fillText(item.label, x, height - padding + 15);
        }
      });
      
      if (animationProgress < 1) {
        animationProgress += 0.03;
        if(animationProgress > 1) animationProgress = 1;
        requestAnimationFrame(draw);
      }
    };
    draw();
  },
  
  progressRing(canvasId, percent, options = {}) {
    const setup = this._setupCanvas(canvasId);
    if (!setup) return;
    const { ctx, width, height } = setup;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - (options.lineWidth || 10);
    
    let progress = options.animate === false ? percent : 0;
    
    const bgColor = getComputedStyle(document.body).getPropertyValue(options.bgColor || '--bg-tertiary');
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Dynamic color logic
      let dynamicColor = 'var(--success)';
      if (percent > 60) dynamicColor = 'var(--warning)';
      if (percent > 85) dynamicColor = 'var(--danger)';
      
      const color = getComputedStyle(document.body).getPropertyValue(options.color || dynamicColor).trim();
      
      // Background ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.lineWidth = options.lineWidth || 10;
      ctx.strokeStyle = bgColor;
      ctx.stroke();
      
      // Progress ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, (-0.5 * Math.PI) + (progress / 100) * 2 * Math.PI);
      ctx.lineWidth = options.lineWidth || 10;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      if (options.showPercent) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary');
        ctx.font = '700 26px "DM Mono", monospace';
        ctx.fillText(`${Math.round(progress)}%`, centerX, centerY);
      }
      
      if (progress < percent) {
        progress += (percent - progress) * 0.08 + 0.5;
        if(progress > percent) progress = percent;
        requestAnimationFrame(draw);
      }
    };
    
    draw();
  }
};
