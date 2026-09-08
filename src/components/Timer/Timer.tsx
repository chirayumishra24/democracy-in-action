import { useEffect, useRef } from 'react';
import { useGame } from '../../state/gameStore';
import { playSound } from '../../utils/audio';
import './Timer.css';

interface Props {
  onTimeUp: () => void;
  running: boolean;
}

export default function Timer({ onTimeUp, running }: Props) {
  const { state, dispatch } = useGame();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!state.settings.timerEnabled || !running) return;

    intervalRef.current = window.setInterval(() => {
      dispatch({ type: 'SET_TIMER', time: state.timer - 1 });
      if (state.timer <= 6 && state.timer > 0) {
        playSound('tick', state.settings.soundEnabled);
      }
      if (state.timer <= 1) {
        onTimeUp();
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state.timer, running, state.settings.timerEnabled]);

  if (!state.settings.timerEnabled) return null;

  const pct = (state.timer / state.maxTimer) * 100;
  const isLow = state.timer <= 10;

  return (
    <div className={`timer ${isLow ? 'timer--low' : ''}`} role="timer" aria-label={`${state.timer} seconds remaining`}>
      <div className="timer__bar">
        <div className="timer__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className={`timer__text ${isLow ? 'timer__text--pulse' : ''}`}>
        ⏱️ {state.timer}s
      </span>
    </div>
  );
}
