window.Charts = {
  
  donut(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Support DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * (options.innerRadius || 0.6);
    
    let total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) total = 1; // avoid division by zero
    
    let currentAngle = -0.5 * Math.PI;
    
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    let animationProgress = options.animate ? 0 : 1;
    
    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      let angle = -0.5 * Math.PI;
      
      data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI * animationProgress;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, angle + sliceAngle, angle, true);
        ctx.closePath();
        
        ctx.fillStyle = item.color || '#ccc';
        ctx.fill();
        
        angle += sliceAngle;
      });
      
      if (options.centerValue) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary');
        ctx.font = '600 24px "DM Mono", monospace';
        ctx.fillText(options.centerValue, centerX, centerY - 10);
        
        if (options.centerLabel) {
          ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
          ctx.font = '14px "Outfit", sans-serif';
          ctx.fillText(options.centerLabel, centerX, centerY + 15);
        }
      }
      
      if (animationProgress < 1) {
        animationProgress += 0.05;
        requestAnimationFrame(draw);
      }
    };
    
    draw();
  },
  
  bar(canvasId, data, options = {}) {
    // Stub for bar chart
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
    ctx.font = '14px sans-serif';
    ctx.fillText('Bar Chart (WIP)', 10, 20);
  },
  
  line(canvasId, data, options = {}) {
    // Stub for line chart
  },
  
  progressRing(canvasId, percent, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - (options.lineWidth || 10);
    
    let progress = options.animate ? 0 : percent;
    
    const color = getComputedStyle(document.body).getPropertyValue(options.color || '--primary');
    const bgColor = getComputedStyle(document.body).getPropertyValue(options.bgColor || '--bg-tertiary');
    
    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
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
        ctx.font = '600 24px "DM Mono", monospace';
        ctx.fillText(`${Math.round(progress)}%`, centerX, centerY);
      }
      
      if (progress < percent) {
        progress += (percent - progress) * 0.1;
        if(percent - progress < 0.1) progress = percent;
        requestAnimationFrame(draw);
      }
    };
    
    draw();
  },
  
  horizontalBar(canvasId, data, options = {}) {
    // Stub
  },
  
  timeline(canvasId, data, options = {}) {
    // Stub
  }
};
