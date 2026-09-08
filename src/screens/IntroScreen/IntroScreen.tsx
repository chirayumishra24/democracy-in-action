import { useGame } from '../../state/gameStore';
import { playSound } from '../../utils/audio';
import './IntroScreen.css';

export default function IntroScreen() {
  const { dispatch, state } = useGame();

  const handleStart = () => {
    playSound('start', state.settings.soundEnabled);
    dispatch({ type: 'SET_PHASE', phase: 'setup' });
  };

  return (
    <div className="intro-screen">
      {/* Background image */}
      <div className="intro-screen__hero-bg">
        <img src="/images/village-hero.jpg" alt="" className="intro-screen__hero-img" />
        <div className="intro-screen__hero-overlay" />
      </div>

      {/* Floating particles */}
      <div className="intro-screen__particles">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`intro-particle intro-particle--${i % 4 === 0 ? 'large' : i % 3 === 0 ? 'medium' : 'small'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 5}s`,
            }} />
        ))}
      </div>

      {/* Decorative SVG elements */}
      <svg className="intro-screen__deco-top" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,0 L0,0 Z" fill="rgba(255,255,255,0.06)" />
      </svg>
      <svg className="intro-screen__deco-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
      </svg>

      {/* Content */}
      <div className="intro-screen__content">
        <div className="intro-screen__badge">
          <span className="intro-badge__dot" />
          Grade 6 · Social Science · Summative Assessment
        </div>

        <div className="intro-screen__icon-group">
          <span className="intro-screen__icon-float intro-screen__icon-float--1">👥</span>
          <span className="intro-screen__icon">🏛️</span>
          <span className="intro-screen__icon-float intro-screen__icon-float--2">🗳️</span>
        </div>

        <h1 className="intro-screen__title">
          <span className="intro-screen__title-line1">Democracy</span>
          <span className="intro-screen__title-line2">in Action</span>
        </h1>

        <p className="intro-screen__subtitle">
          People · Decisions · Real Change
        </p>

        <div className="intro-screen__tagline">
          <span className="intro-tagline__quote">"</span>
          Listen. Discuss. Decide. Act. Review.
          <span className="intro-tagline__quote">"</span>
        </div>

        {/* Middle row: Village preview card & Chapters */}
        <div className="intro-screen__middle-row">
          <div className="intro-screen__village-card">
            <img src="/images/village-hero.jpg" alt="Sunderpur Village" className="intro-village__img" />
            <div className="intro-village__info">
              <span className="intro-village__label">Your Community</span>
              <span className="intro-village__name">🏘️ Sunderpur Village</span>
            </div>
          </div>

          <div className="intro-screen__chapters">
            <div className="intro-chapter">
              <span className="intro-chapter__num">10</span>
              <span>Grassroots Democracy — Part 1</span>
            </div>
            <div className="intro-chapter">
              <span className="intro-chapter__num">11</span>
              <span>Grassroots Democracy — Part 2</span>
            </div>
            <div className="intro-chapter">
              <span className="intro-chapter__num">12</span>
              <span>Grassroots Democracy — Part 3</span>
            </div>
          </div>
        </div>

        {/* Flow steps */}
        <div className="intro-screen__flow">
          {[
            { emoji: '🔍', label: 'Explore' },
            { emoji: '👥', label: 'Listen' },
            { emoji: '🗣️', label: 'Discuss' },
            { emoji: '✅', label: 'Decide' },
            { emoji: '🔧', label: 'Act' },
            { emoji: '📋', label: 'Review' },
          ].map((step, i) => (
            <div key={step.label} className="flow-step" style={{ animationDelay: `${0.8 + i * 0.12}s` }}>
              <span className="flow-step__emoji">{step.emoji}</span>
              <span className="flow-step__label">{step.label}</span>
            </div>
          ))}
        </div>

        <button className="intro-screen__start" onClick={handleStart}>
          <span className="intro-start__icon">🚀</span>
          <span className="intro-start__text">Begin the Journey</span>
          <span className="intro-start__arrow">→</span>
        </button>

        <p className="intro-screen__note">
          Explore a real community, meet its people, and help them govern themselves through democratic participation.
        </p>
      </div>
    </div>
  );
}
