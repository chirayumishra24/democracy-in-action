import { useGame } from '../../state/gameStore';
import './SettingsPanel.css';

const CREST_OPTIONS = [
  { name: '🦁 Lions of Justice', subtitle: 'Satyameva Jayate' },
  { name: '🐘 Pillars of Unity', subtitle: 'Samvidhan' },
  { name: '🦚 Peacocks of Progress', subtitle: 'Vikas' },
  { name: '🐅 Tigers of Action', subtitle: 'Karmayogi' },
  { name: "🗣️ People's Voice", subtitle: 'Lokshahi' },
  { name: '🤝 Community Action', subtitle: 'Panchayat' },
];

interface Props { onClose: () => void; }

export default function SettingsPanel({ onClose }: Props) {
  const { state, dispatch } = useGame();

  const handleSelectCrest = (team: 'A' | 'B', crest: typeof CREST_OPTIONS[0]) => {
    dispatch({
      type: 'SET_TEAM_NAME',
      team,
      name: crest.name,
      subtitle: crest.subtitle,
    });
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()} role="dialog" aria-label="Settings">
        <div className="settings-panel__header">
          <h2>⚙️ Settings & Classroom Crests</h2>
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

          {/* Classroom Crests */}
          <div className="settings-crests">
            <span className="settings-crests__title">🏛️ Classroom Team Crests</span>
            <div className="team-crest-row">
              <span className="team-badge team-badge--a">Team A: {state.teams.A.name}</span>
              <div className="crest-picker-chips">
                {CREST_OPTIONS.map(c => (
                  <button
                    key={c.name}
                    type="button"
                    className={`crest-chip ${state.teams.A.name === c.name ? 'crest-chip--selected' : ''}`}
                    onClick={() => handleSelectCrest('A', c)}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="team-crest-row">
              <span className="team-badge team-badge--b">Team B: {state.teams.B.name}</span>
              <div className="crest-picker-chips">
                {CREST_OPTIONS.map(c => (
                  <button
                    key={c.name}
                    type="button"
                    className={`crest-chip ${state.teams.B.name === c.name ? 'crest-chip--selected' : ''}`}
                    onClick={() => handleSelectCrest('B', c)}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
