import { useState, useEffect } from 'react';
import { useGame } from '../../state/gameStore';
import { playSound } from '../../utils/audio';
import InstructionsModal from '../../components/InstructionsModal/InstructionsModal';
import './IntroScreen.css';

export default function IntroScreen() {
  const { dispatch, state } = useGame();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lang = state.settings.language || 'en';
  const isHindi = lang === 'hi';

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleStart = () => {
    playSound('start', state.settings.soundEnabled);
    dispatch({ type: 'SET_PHASE', phase: 'setup' });
  };

  return (
    <div className="intro-screen">
      {/* Full-bleed Illustrated Village Background */}
      <div className="intro-screen__hero-bg">
        <img src="/images/village-hero.jpg" alt="Sunderpur Village" className="intro-screen__hero-img" />
        <div className="intro-screen__hero-overlay" />
      </div>

      {/* Top Right Controls (Fullscreen & Language) */}
      <div className="intro-screen__top-controls">
        <button
          className="intro-screen__lang-btn"
          onClick={() => dispatch({ type: 'SET_LANGUAGE', language: isHindi ? 'en' : 'hi' })}
          title={isHindi ? 'Switch to English' : 'Switch to Hindi'}
        >
          {isHindi ? 'EN' : 'हिन्दी'}
        </button>
        <button
          className="intro-screen__fullscreen-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? '✕' : '⛶'}
        </button>
      </div>

      {/* Central Hero Quest Content */}
      <div className="intro-screen__content">
        {/* Chapter Capsule Badge */}
        <div className="intro-screen__chapter-badge">
          {isHindi ? 'अध्याय 10-12 · जमीनी स्तर पर लोकतंत्र' : 'CHAPTER 10-12 · GRASSROOTS DEMOCRACY'}
        </div>

        {/* 3D Embossed Hero Title */}
        <div className="intro-screen__title-wrap">
          <span className="intro-screen__title-the">{isHindi ? 'संसदीय एवं स्थानीय' : 'THE'}</span>
          <h1 className="intro-screen__title">
            {isHindi ? 'लोकतंत्र चक्र' : 'DEMOCRACY QUEST'}
          </h1>
        </div>

        {/* Subtitle & Tagline */}
        <p className="intro-screen__subtitle">
          {isHindi ? 'ग्राम पंचायत एवं सामुदायिक निर्णय' : 'Panchayati Raj & Local Governance'}
        </p>

        <p className="intro-screen__quote">
          "{isHindi ? 'हर आवाज़ गांव को बदलती है। हर निर्णय का प्रभाव होता है।' : 'Every choice shapes the village. Every voice matters.'}"
        </p>

        {/* Action Buttons Row */}
        <div className="intro-screen__actions">
          <button className="intro-screen__btn-start" onClick={handleStart}>
            <span>🚀</span>
            <span>{isHindi ? 'अभियान शुरू करें' : 'START THE QUEST'}</span>
          </button>

          <button className="intro-screen__btn-guide" onClick={() => setShowInstructions(true)}>
            <span>📖</span>
            <span>{isHindi ? 'खेल नियम एवं गाइड' : 'How to Play / Guide'}</span>
          </button>
        </div>

        {/* 3 Core Pillars in a Row */}
        <div className="intro-screen__pillars">
          <div className="intro-pillar-chip">
            <span>🤝</span>
            <span>{isHindi ? 'सहयोग एवं संवाद' : 'Work Together'}</span>
          </div>
          <div className="intro-pillar-chip">
            <span>🗳️</span>
            <span>{isHindi ? 'निर्णय प्रक्रिया' : 'Make Choices'}</span>
          </div>
          <div className="intro-pillar-chip">
            <span>🏛️</span>
            <span>{isHindi ? 'ग्राम सशक्तिकरण' : 'Build Community'}</span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="intro-screen__footer">
        Skillizee · Grade 6 Social Science
      </footer>

      {/* Instructions Modal */}
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
    </div>
  );
}
