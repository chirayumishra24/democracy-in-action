import { useGame } from '../../state/gameStore';
import './SettingsPanel.css';

interface Props { onClose: () => void; }

export default function SettingsPanel({ onClose }: Props) {
  const { state, dispatch } = useGame();

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()} role="dialog" aria-label="Settings">
        <div className="settings-panel__header">
          <h2>⚙️ Settings</h2>
          <button className="btn-ghost" onClick={onClose} aria-label="Close settings">✕</button>
        </div>
        <div className="settings-panel__body">
          <label className="settings-toggle">
            <span>⏱️ Timer</span>
            <input type="checkbox" checked={state.settings.timerEnabled} onChange={() => dispatch({ type: 'TOGGLE_SETTING', setting: 'timerEnabled' })} />
            <span className="settings-toggle__slider" />
          </label>
          <label className="settings-toggle">
            <span>🔊 Sound</span>
            <input type="checkbox" checked={state.settings.soundEnabled} onChange={() => dispatch({ type: 'TOGGLE_SETTING', setting: 'soundEnabled' })} />
            <span className="settings-toggle__slider" />
          </label>
          <label className="settings-toggle">
            <span>✨ Animations</span>
            <input type="checkbox" checked={state.settings.animationsEnabled} onChange={() => dispatch({ type: 'TOGGLE_SETTING', setting: 'animationsEnabled' })} />
            <span className="settings-toggle__slider" />
          </label>
        </div>
        <div className="settings-panel__footer">
          <button className="btn btn-danger btn-sm" onClick={() => { dispatch({ type: 'RESET_GAME' }); onClose(); }}>
            🔄 Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
