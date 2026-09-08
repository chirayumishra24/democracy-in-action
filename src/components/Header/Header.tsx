import { useState, useEffect } from 'react';
import { useGame } from '../../state/gameStore';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import InstructionsModal from '../InstructionsModal/InstructionsModal';
import './Header.css';

const stageLabels = [
  { num: 1, label: 'Participate', sub: 'Explore · Listen · Discuss' },
  { num: 2, label: 'Govern', sub: 'Represent · Decide' },
  { num: 3, label: 'Make it Happen', sub: 'Implement · Review' },
];

function getCurrentStage(phase: string): number {
  if (['explore', 'people', 'gramSabha'].includes(phase)) return 1;
  if (['decision'].includes(phase)) return 2;
  if (['implement', 'monitor', 'final'].includes(phase)) return 3;
  return 0;
}

export default function Header() {
  const { state } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeStage = getCurrentStage(state.gamePhase);

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

  return (
    <header className="header" role="banner">
      <div className="header__left">
        <div className="header__brand">
          <span className="header__icon" aria-hidden="true">🏛️</span>
          <div>
            <h1 className="header__title">Democracy in Action</h1>
            <p className="header__subtitle">People · Decisions · Real Change</p>
          </div>
        </div>
      </div>

      <nav className="header__progress" aria-label="Game progress">
        {stageLabels.map((s, i) => (
          <div key={s.num} className={`header__stage ${activeStage >= s.num ? 'header__stage--active' : ''} ${activeStage === s.num ? 'header__stage--current' : ''}`}>
            <span className="header__stage-num">{s.num}</span>
            <div className="header__stage-text">
              <span className="header__stage-label">{s.label}</span>
              <span className="header__stage-sub">{s.sub}</span>
            </div>
            {i < stageLabels.length - 1 && <span className="header__stage-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </nav>

      <div className="header__right">
        {state.mode === 'team' && (
          <div className={`header__turn ${state.currentTeam === 'A' ? 'turn-a' : 'turn-b'}`}>
            Round {state.round} · {state.teams[state.currentTeam].name}
          </div>
        )}
        <button
          className="header__settings-btn"
          onClick={() => setShowInstructions(true)}
          title="How to Play"
          aria-label="How to play instructions"
        >
          ❓
        </button>
        <button
          className="header__settings-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>
        <button
          className="header__settings-btn"
          onClick={() => setShowSettings(!showSettings)}
          title="Settings"
          aria-label="Open settings"
        >
          ⚙️
        </button>
      </div>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
    </header>
  );
}
