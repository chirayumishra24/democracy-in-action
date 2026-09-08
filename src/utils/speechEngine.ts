// Web Speech Synthesis Engine for Smart Board & Classroom Accessibility

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(text: string, lang: 'en' | 'hi' = 'en', onEnd?: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  // Strip emoji and asterisks for smooth TTS pronunciation
  const cleanText = text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[*_#]/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v =>
    lang === 'hi' ? v.lang.startsWith('hi') : (v.lang === 'en-IN' || v.lang.startsWith('en'))
  );
  if (matchedVoice) utterance.voice = matchedVoice;

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };
  utterance.onerror = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking(): boolean {
  return typeof window !== 'undefined' && Boolean(window.speechSynthesis?.speaking && currentUtterance);
}
