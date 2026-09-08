import React, { useState, useEffect } from 'react';
import './CharacterDialogue.css';

interface CharacterDialogueProps {
  name: string;
  role: string;
  emoji: string;
  speech: string;
  locationName?: string;
}

export default function CharacterDialogue({ name, role, emoji, speech, locationName }: CharacterDialogueProps) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(`${name} says: ${speech}`);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="character-dialogue">
      <div className="character-dialogue__avatar-col">
        <div className="character-dialogue__avatar">
          <span className="character-avatar__emoji">{emoji}</span>
          <span className="character-avatar__ring" />
        </div>
        <div className="character-dialogue__identity">
          <strong className="character-name">{name}</strong>
          <span className="character-role">{role}</span>
          {locationName && <span className="character-location">📍 {locationName}</span>}
        </div>
      </div>

      <div className="character-dialogue__bubble">
        <span className="speech-quote-icon">“</span>
        <p className="speech-text">{speech}</p>
        <button
          type="button"
          className={`speech-read-btn ${speaking ? 'speech-read-btn--speaking' : ''}`}
          onClick={handleSpeak}
          title={speaking ? 'Stop narration' : 'Listen to voice narration'}
          aria-label="Listen to voice narration"
        >
          {speaking ? '⏹️' : '🔊'}
        </button>
        <span className="speech-bubble-tail" aria-hidden="true" />
      </div>
    </div>
  );
}
