let audioCtx;

export function playNote(freq) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;

  // ---- Noise burst (the "tick" of a key being pressed) ----
  const noiseDur = 0.018;
  const bufferSize = Math.max(1, Math.floor(audioCtx.sampleRate * noiseDur));
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 3500;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.12, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseDur);
  noise.connect(noiseFilter).connect(noiseGain).connect(audioCtx.destination);

  // ---- Main tone ----
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // ---- Octave-up harmonic ----
  const osc2 = audioCtx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // ---- Gain envelopes ----
  const gain1 = audioCtx.createGain();
  gain1.gain.setValueAtTime(0.0001, now);
  gain1.gain.exponentialRampToValueAtTime(0.3, now + 0.006);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  const gain2 = audioCtx.createGain();
  gain2.gain.setValueAtTime(0.0001, now);
  gain2.gain.exponentialRampToValueAtTime(0.09, now + 0.006);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  // ---- Wire and start ----
  osc1.connect(gain1).connect(audioCtx.destination);
  osc2.connect(gain2).connect(audioCtx.destination);

  noise.start(now);
  noise.stop(now + noiseDur);
  osc1.start(now);
  osc1.stop(now + 0.24);
  osc2.start(now);
  osc2.stop(now + 0.16);
}