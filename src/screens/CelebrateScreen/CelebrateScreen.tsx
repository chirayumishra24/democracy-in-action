import { useEffect, useState } from 'react';
import { useGame } from '../../state/gameStore';
import { playSound } from '../../utils/audio';
import './CelebrateScreen.css';

export default function CelebrateScreen() {
  const { state, dispatch } = useGame();
  const [confetti, setConfetti] = useState<{ x: number; y: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    playSound('celebration', state.settings.soundEnabled);
    const pieces = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="celebrate-screen">
      <div className="celebrate-confetti">
        {confetti.map((c, i) => (
          <div key={i} className="confetti-piece" style={{
            left: `${c.x}%`, top: `${c.y}%`,
            background: c.color,
            animationDelay: `${c.delay}s`,
          }} />
        ))}
      </div>

      <div className="celebrate-content">
        <div className="celebrate-icon">🎉</div>
        <h1 className="celebrate-title">Amazing Work!</h1>
        <p className="celebrate-sub">You completed all governance phases in Sunderpur!</p>

        <div className="celebrate-scores">
          {state.mode === 'team' ? (
            <>
              <div className="celebrate-team celebrate-team--a">
                <span className="celebrate-team__name">{state.teams.A.name}</span>
                <span className="celebrate-team__score">{state.scores.A}</span>
                <span className="celebrate-team__label">points</span>
              </div>
              <div className="celebrate-vs">VS</div>
              <div className="celebrate-team celebrate-team--b">
                <span className="celebrate-team__name">{state.teams.B.name}</span>
                <span className="celebrate-team__score">{state.scores.B}</span>
                <span className="celebrate-team__label">points</span>
              </div>
            </>
          ) : (
            <div className="celebrate-team celebrate-team--a">
              <span className="celebrate-team__name">Your Score</span>
              <span className="celebrate-team__score">{state.scores.A}</span>
              <span className="celebrate-team__label">points</span>
            </div>
          )}
        </div>

        {state.mode === 'team' && (
          <div className="celebrate-winner">
            🏆 {state.scores.A > state.scores.B ? state.teams.A.name : state.scores.B > state.scores.A ? state.teams.B.name : 'Both teams'} win{state.scores.A === state.scores.B ? ' together!' : 's!'}
          </div>
        )}

        <button className="btn btn-primary btn-large" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'results' })}>
          📊 See Full Results →
        </button>
      </div>
    </div>
  );
}
