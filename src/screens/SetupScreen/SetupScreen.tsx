import { useState } from 'react';
import { useGame } from '../../state/gameStore';
import { playSound } from '../../utils/audio';
import './SetupScreen.css';

export default function SetupScreen() {
  const { state, dispatch } = useGame();
  const [teamAName, setTeamAName] = useState(state.teams.A.name);
  const [teamBName, setTeamBName] = useState(state.teams.B.name);
  const [mode, setMode] = useState(state.mode);

  const handleStart = () => {
    dispatch({ type: 'SET_MODE', mode });
    if (mode === 'team') {
      dispatch({ type: 'SET_TEAM_NAME', team: 'A', name: teamAName || "People's Voice", subtitle: 'Team A' });
      dispatch({ type: 'SET_TEAM_NAME', team: 'B', name: teamBName || 'Community Action', subtitle: 'Team B' });
    }
    playSound('start', state.settings.soundEnabled);
    dispatch({ type: 'SET_GOVERNANCE_PHASE', phase: 'explore' });
  };

  return (
    <div className="setup-screen">
      <div className="setup-screen__card">
        <h2 className="setup-screen__title">⚙️ Game Setup</h2>
        <p className="setup-screen__desc">Choose how you want to play Democracy in Action.</p>

        <div className="setup-section">
          <h3>Play Mode</h3>
          <div className="setup-modes">
            <button className={`setup-mode ${mode === 'team' ? 'setup-mode--active' : ''}`}
              onClick={() => setMode('team')}>
              <span className="setup-mode__icon">👥</span>
              <span className="setup-mode__label">Team Mode</span>
              <span className="setup-mode__desc">Two teams take turns</span>
            </button>
            <button className={`setup-mode ${mode === 'individual' ? 'setup-mode--active' : ''}`}
              onClick={() => setMode('individual')}>
              <span className="setup-mode__icon">🧑</span>
              <span className="setup-mode__label">Individual</span>
              <span className="setup-mode__desc">Play solo or as a class</span>
            </button>
          </div>
        </div>

        {mode === 'team' && (
          <div className="setup-section setup-teams">
            <h3>Name Your Teams</h3>
            <div className="setup-team-inputs">
              <div className="setup-team-input">
                <label className="setup-team-input__label team-label-a">Team A</label>
                <input type="text" value={teamAName} onChange={e => setTeamAName(e.target.value)}
                  placeholder="People's Voice" maxLength={24} className="setup-team-input__field" />
              </div>
              <div className="setup-team-input">
                <label className="setup-team-input__label team-label-b">Team B</label>
                <input type="text" value={teamBName} onChange={e => setTeamBName(e.target.value)}
                  placeholder="Community Action" maxLength={24} className="setup-team-input__field" />
              </div>
            </div>
          </div>
        )}

        <div className="setup-section">
          <h3>Your Mission</h3>
          <div className="setup-mission">
            <div className="setup-mission__step">
              <span>🔍</span>
              <div><strong>Explore</strong><p>Discover issues in Sunderpur community</p></div>
            </div>
            <div className="setup-mission__step">
              <span>👥</span>
              <div><strong>Listen</strong><p>Hear from different community members</p></div>
            </div>
            <div className="setup-mission__step">
              <span>🗣️</span>
              <div><strong>Discuss & Decide</strong><p>Participate in democratic decision-making</p></div>
            </div>
            <div className="setup-mission__step">
              <span>🔧</span>
              <div><strong>Implement & Review</strong><p>Turn decisions into action and monitor results</p></div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-large" onClick={handleStart}>
          🏛️ Enter Sunderpur →
        </button>
      </div>
    </div>
  );
}
