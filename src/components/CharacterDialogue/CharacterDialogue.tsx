import React from 'react';
import './CharacterDialogue.css';

interface CharacterDialogueProps {
  name: string;
  role: string;
  emoji: string;
  speech: string;
  locationName?: string;
}

export default function CharacterDialogue({ name, role, emoji, speech, locationName }: CharacterDialogueProps) {
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
        <span className="speech-bubble-tail" aria-hidden="true" />
      </div>
    </div>
  );
}
