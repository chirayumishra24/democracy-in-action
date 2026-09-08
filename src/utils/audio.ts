const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)() : null;

type SoundType = 'click' | 'start' | 'correct' | 'incorrect' | 'decision' | 'reward' | 'celebration' | 'hint' | 'tick';

const soundConfigs: Record<SoundType, { freq: number; duration: number; type: OscillatorType; gain: number }> = {
  click: { freq: 600, duration: 0.08, type: 'sine', gain: 0.15 },
  start: { freq: 440, duration: 0.2, type: 'triangle', gain: 0.2 },
  correct: { freq: 800, duration: 0.15, type: 'sine', gain: 0.2 },
  incorrect: { freq: 300, duration: 0.2, type: 'square', gain: 0.1 },
  decision: { freq: 523, duration: 0.25, type: 'triangle', gain: 0.2 },
  reward: { freq: 700, duration: 0.3, type: 'sine', gain: 0.2 },
  celebration: { freq: 880, duration: 0.4, type: 'sine', gain: 0.25 },
  hint: { freq: 500, duration: 0.12, type: 'sine', gain: 0.12 },
  tick: { freq: 1000, duration: 0.05, type: 'sine', gain: 0.08 },
};

export function playSound(sound: SoundType, enabled: boolean) {
  if (!enabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const cfg = soundConfigs[sound];
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = cfg.type;
    osc.frequency.setValueAtTime(cfg.freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(cfg.gain, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + cfg.duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + cfg.duration);

    if (sound === 'correct' || sound === 'celebration' || sound === 'reward') {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = cfg.type;
      osc2.frequency.setValueAtTime(cfg.freq * 1.25, audioCtx.currentTime + cfg.duration * 0.3);
      gain2.gain.setValueAtTime(cfg.gain * 0.8, audioCtx.currentTime + cfg.duration * 0.3);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + cfg.duration * 1.5);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(audioCtx.currentTime + cfg.duration * 0.3);
      osc2.stop(audioCtx.currentTime + cfg.duration * 1.5);
    }
  } catch { /* ignore audio errors */ }
}
