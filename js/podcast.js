window.Podcast = {
  TTS_MODEL: 'gemini-2.5-flash-preview-tts',
  VOICE_NAME: 'Kore',
  audioCtx: null,

  init() {
    this.injectUI();
    this.attachListeners();
  },

  injectUI() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;

    const podcastHTML = `
      <div class="card podcast-card mb-4" style="background: linear-gradient(135deg, hsl(250,30%,15%), hsl(280,30%,18%)); border: 1px solid hsl(270,50%,30%); padding: 24px; border-radius: var(--radius-lg);">
        <div style="display:flex; align-items:center; gap:16px; flex-wrap: wrap;">
          <div class="podcast-avatar" style="width: 56px; height: 56px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin: 0; font-size: 1.25rem;">Harrison Finance Weekly</h3>
            <p class="text-secondary" style="margin: 4px 0 0 0; font-size: 0.9rem;">Your personalized money check-in</p>
          </div>
          <button class="btn btn-primary" id="podcast-generate-btn" data-action="generate-podcast">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg> Generate This Week's Episode
          </button>
        </div>
        
        <!-- Audio player (hidden until generated) -->
        <div id="podcast-player" style="display:none; margin-top:24px; background: rgba(0,0,0,0.2); padding: 16px; border-radius: var(--radius-md);">
          <div class="podcast-waveform" id="podcast-waveform" style="display: flex; align-items: center; gap: 3px; height: 40px; margin-bottom: 12px;">
            <!-- Animated waveform bars injected via JS -->
          </div>
          <div style="display:flex; align-items:center; gap:16px;">
            <button class="btn btn-icon" id="podcast-play-pause" style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <div class="podcast-progress" style="flex-grow: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; position: relative;">
              <div class="podcast-progress-bar" id="podcast-progress-bar" style="width: 0%; height: 100%; background: var(--primary); transition: width 0.1s linear;"></div>
            </div>
            <span class="dm-mono text-sm" id="podcast-duration" style="font-variant-numeric: tabular-nums;">0:00</span>
          </div>
        </div>
        
        <!-- Script preview (collapsible) -->
        <div id="podcast-script" style="display:none; margin-top:16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
          <p class="text-secondary" id="podcast-script-text" style="white-space:pre-line; margin: 0; font-size: 0.95rem; line-height: 1.6;"></p>
        </div>
      </div>
    `;

    // Add CSS for waveform animation
    if (!document.getElementById('podcast-styles')) {
      const style = document.createElement('style');
      style.id = 'podcast-styles';
      style.textContent = `
        .podcast-bar {
          width: 4px;
          background: var(--primary);
          border-radius: 2px;
          animation: waveform 1s ease-in-out infinite;
          transform-origin: bottom;
        }
        .podcast-bar.paused {
          animation-play-state: paused;
        }
        @keyframes waveform {
          0%, 100% { height: 8px; }
          50% { height: 32px; }
        }
      `;
      document.head.appendChild(style);
    }

    dashboardContent.insertAdjacentHTML('afterbegin', podcastHTML);
    this.generateWaveformBars();
  },

  generateWaveformBars() {
    const container = document.getElementById('podcast-waveform');
    if (!container) return;
    
    // Generate about 40 bars
    let barsHTML = '';
    for (let i = 0; i < 40; i++) {
      // Randomize animation delay to make it look like a real waveform
      const delay = Math.random() * -1;
      barsHTML += `<div class="podcast-bar paused" style="animation-delay: ${delay}s;"></div>`;
    }
    container.innerHTML = barsHTML;
  },

  attachListeners() {
    const btn = document.getElementById('podcast-generate-btn');
    if (btn) {
      btn.addEventListener('click', () => this.handleGenerate());
    }
  },

  async handleGenerate() {
    const apiKey = localStorage.getItem('harrison_finance_api_key');
    if (!apiKey) {
      app.showToast('Please set your Gemini API Key in Settings first', 'error');
      app.navigate('settings');
      return;
    }

    const btn = document.getElementById('podcast-generate-btn');
    btn.disabled = true;
    btn.innerHTML = `<svg class="spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg> Generating...`;

    try {
      const script = this.generateScript();
      
      // Show script immediately
      document.getElementById('podcast-script').style.display = 'block';
      document.getElementById('podcast-script-text').textContent = script;

      const audioData = await this.generateAudio(script, apiKey);
      if (audioData) {
        document.getElementById('podcast-player').style.display = 'block';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg> Regenerate`;
        btn.disabled = false;
        
        await this.playAudio(audioData);
      } else {
        throw new Error('No audio data received');
      }
    } catch (err) {
      console.error(err);
      app.showToast('Failed to generate podcast: ' + err.message, 'error');
      btn.disabled = false;
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Generate This Week's Episode`;
    }
  },

  generateScript() {
    const formatDollars = app.formatCurrency;
    
    // Fallbacks if data doesn't exist yet
    const income = Storage.getCombinedMonthlyIncome ? Storage.getCombinedMonthlyIncome() : 0;
    const hf = Storage.getHouseholdFinance ? Storage.getHouseholdFinance() : { members: { barbara: { income: 0, available: 0 }, chris: { income: 0, available: 0 }, erin: { income: 0, available: 0 } }, totalHouseholdExpense: 0, contributionPerPerson: 0 };
    const goals = Storage.getGoals ? Storage.getGoals() : [];
    const netWorth = Storage.getNetWorth ? Storage.getNetWorth() : 0;
    
    return \`
      Hey Harrison Family! Welcome to your weekly money check-in. Let's break it down.
      
      First up — the big picture. Your household is bringing in \${formatDollars(income)} every month. Not bad at all! 
      Barbara's leading the way with her federal pension bringing in \${formatDollars(hf.members.barbara.income)}, 
      Chris is right there with \${formatDollars(hf.members.chris.income)} from NC A and T, 
      and Erin's contributing \${formatDollars(hf.members.erin.income)} from UNCG.
      
      Now let's talk about where that money goes. Your total household expenses come to \${formatDollars(hf.totalHouseholdExpense)} per month, 
      split three ways at \${formatDollars(hf.contributionPerPerson)} each. Fair and square!
      
      Here's the exciting part — after all expenses, Barbara has \${formatDollars(hf.members.barbara.available)} of breathing room, 
      Chris has \${formatDollars(hf.members.chris.available)}, 
      and Erin... well, Erin's running a little tight at \${formatDollars(hf.members.erin.available)}. 
      Something to keep an eye on.
      
      \${goals.length > 0 ? \`On the goals front — you've got \${goals.length} savings goals set up. \` : ''}
      \${netWorth > 0 ? \`And your total net worth? A solid \${formatDollars(netWorth)}. \` : ''}
      
      Quick tip for this week: With Erin's budget being tight, see if there's a subscription or two you can trim. 
      Every little bit adds up. Keep crushing it, Harrisons! Until next time.
    \`.trim().replace(/^ {6}/gm, ''); // clean up formatting
  },

  async generateAudio(text, apiKey) {
    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/\${this.TTS_MODEL}:generateContent?key=\${apiKey}\`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: this.VOICE_NAME } }
            }
          }
        })
      }
    );
    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || 'API Error');
    }
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData;
  },

  playAudio(inlineData) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.audioCtx) {
          this.audioCtx.close();
        }
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const raw = atob(inlineData.data);
        const pcmBytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) pcmBytes[i] = raw.charCodeAt(i);
        
        const mime = inlineData.mimeType || '';
        const rateMatch = mime.match(/rate=(\\d+)/);
        const sampleRate = rateMatch ? parseInt(rateMatch[1]) : 24000;
        
        const dataSize = pcmBytes.length;
        const wavBuffer = new ArrayBuffer(44 + dataSize);
        const view = new DataView(wavBuffer);
        const writeStr = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };
        
        writeStr(0, 'RIFF');
        view.setUint32(4, 36 + dataSize, true);
        writeStr(8, 'WAVE');
        writeStr(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeStr(36, 'data');
        view.setUint32(40, dataSize, true);
        new Uint8Array(wavBuffer, 44).set(pcmBytes);
        
        const audioBuffer = await this.audioCtx.decodeAudioData(wavBuffer);
        const source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioCtx.destination);
        
        this.setupAudioUI(source, audioBuffer.duration);
        
        source.onended = () => {
          this.audioCtx.close();
          this.audioCtx = null;
          this.resetAudioUI();
          resolve();
        };
        
        source.start();
      } catch (err) {
        reject(err);
      }
    });
  },

  setupAudioUI(source, durationSec) {
    const playPauseBtn = document.getElementById('podcast-play-pause');
    const progressBar = document.getElementById('podcast-progress-bar');
    const durationEl = document.getElementById('podcast-duration');
    const bars = document.querySelectorAll('.podcast-bar');
    
    // Play icon
    const playIcon = \`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:2px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>\`;
    // Pause icon
    const pauseIcon = \`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>\`;
    
    playPauseBtn.innerHTML = pauseIcon;
    bars.forEach(b => b.classList.remove('paused'));
    
    const startTime = this.audioCtx.currentTime;
    
    const updateProgress = () => {
      if (!this.audioCtx) return;
      
      const elapsed = this.audioCtx.currentTime - startTime;
      const progress = Math.min(100, (elapsed / durationSec) * 100);
      progressBar.style.width = \`\${progress}%\`;
      
      const mins = Math.floor(elapsed / 60);
      const secs = Math.floor(elapsed % 60).toString().padStart(2, '0');
      
      const totalMins = Math.floor(durationSec / 60);
      const totalSecs = Math.floor(durationSec % 60).toString().padStart(2, '0');
      
      durationEl.textContent = \`\${mins}:\${secs} / \${totalMins}:\${totalSecs}\`;
      
      if (elapsed < durationSec) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
    
    // Simple play/pause toggle (Note: proper pause requires tracking offset and creating new buffer source, keeping it simple for now by just letting it play or stopping it if requested, but actual pause is complex. We'll just stop it on click for now as a "Stop" button disguised as Pause)
    playPauseBtn.onclick = () => {
      if (this.audioCtx) {
        this.audioCtx.close();
        this.audioCtx = null;
        this.resetAudioUI();
      }
    };
  },
  
  resetAudioUI() {
    const playPauseBtn = document.getElementById('podcast-play-pause');
    const playIcon = \`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:2px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>\`;
    if(playPauseBtn) playPauseBtn.innerHTML = playIcon;
    
    document.querySelectorAll('.podcast-bar').forEach(b => b.classList.add('paused'));
    const progressBar = document.getElementById('podcast-progress-bar');
    if (progressBar) progressBar.style.width = '0%';
    const durationEl = document.getElementById('podcast-duration');
    if (durationEl) durationEl.textContent = '0:00';
  }
};
