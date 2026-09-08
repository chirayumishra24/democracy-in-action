import { useState } from 'react';
import { useGame } from '../../state/gameStore';
import { getOverallProgress } from '../../utils/progressEngine';
import { getNetworkProgress } from '../../utils/networkEngine';
import CommunityMap from '../../components/CommunityMap/CommunityMap';
import GovernanceNetwork from '../../components/GovernanceNetwork/GovernanceNetwork';
import CommunityDashboard from '../../components/CommunityDashboard/CommunityDashboard';
import CertificateModal from '../../components/CertificateModal/CertificateModal';
import './ResultsScreen.css';

export default function ResultsScreen() {
  const { state, dispatch } = useGame();
  const [showCertificate, setShowCertificate] = useState(false);
  const overall = getOverallProgress(state.community);
  const networkProg = getNetworkProgress(state.governanceNetwork);

  const totalTokens = (t: 'A' | 'B') => {
    const tk = state.tokens[t];
    return tk.participation + tk.decision + tk.action + tk.community;
  };

  return (
    <div className="results-screen">
      <div className="results-header">
        <h1>📊 Your Governance Report</h1>
        <p>A summary of your journey through Democracy in Action</p>
      </div>

      <div className="results-grid">
        {/* Scores */}
        <div className="results-card results-card--scores">
          <h3>🏆 Final Scores</h3>
          {state.mode === 'team' ? (
            <div className="results-scores-row">
              <div className="results-score results-score--a">
                <span className="results-score__label">{state.teams.A.name}</span>
                <span className="results-score__number">{state.scores.A}</span>
              </div>
              <div className="results-score results-score--b">
                <span className="results-score__label">{state.teams.B.name}</span>
                <span className="results-score__number">{state.scores.B}</span>
              </div>
            </div>
          ) : (
            <div className="results-score results-score--a">
              <span className="results-score__label">Total Score</span>
              <span className="results-score__number">{state.scores.A}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="results-card results-card--stats">
          <h3>📈 Key Statistics</h3>
          <div className="results-stats">
            <div className="results-stat">
              <span className="results-stat__value">{state.completedPhases.length}</span>
              <span className="results-stat__label">Phases Completed</span>
            </div>
            <div className="results-stat">
              <span className="results-stat__value">{state.exploredLocations.length}</span>
              <span className="results-stat__label">Locations Explored</span>
            </div>
            <div className="results-stat">
              <span className="results-stat__value">{state.metPeople.length}</span>
              <span className="results-stat__label">People Met</span>
            </div>
            <div className="results-stat">
              <span className="results-stat__value">{state.usedChallengeIds.length}</span>
              <span className="results-stat__label">Challenges Completed</span>
            </div>
            <div className="results-stat">
              <span className="results-stat__value">{state.decisionsLog.length}</span>
              <span className="results-stat__label">Decisions Made</span>
            </div>
            <div className="results-stat">
              <span className="results-stat__value">{totalTokens('A') + (state.mode === 'team' ? totalTokens('B') : 0)}</span>
              <span className="results-stat__label">Tokens Earned</span>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="results-card results-card--impact">
          <h3>🏘️ Community Impact</h3>
          <div className="results-impact">
            <div className="results-impact__score">
              <span className="results-impact__number">{overall}%</span>
              <span className="results-impact__label">Community Wellbeing</span>
            </div>
            <div className="results-impact__score">
              <span className="results-impact__number">{networkProg}%</span>
              <span className="results-impact__label">Network Connected</span>
            </div>
          </div>
        </div>

        {/* IB Skills */}
        {state.ibSkillsEarned.length > 0 && (
          <div className="results-card">
            <h3>🎯 Skills Demonstrated</h3>
            <div className="results-skills">
              {state.ibSkillsEarned.map(s => (
                <div key={s.skill} className="results-skill-badge">
                  <span>{s.emoji}</span>
                  <div>
                    <strong>{s.skill}</strong>
                    <p>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="results-card results-card--map">
          <h3>🗺️ Sunderpur — Final State</h3>
          <CommunityMap interactive={false} />
        </div>

        {/* Network & Dashboard */}
        <div className="results-card">
          <GovernanceNetwork />
        </div>
        <div className="results-card">
          <CommunityDashboard />
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button
          className="btn btn-primary btn-large btn-claim-cert"
          onClick={() => setShowCertificate(true)}
          style={{ background: '#15803d', borderColor: '#166534' }}
        >
          🎓 Claim & Print Civic Certificate
        </button>
        <button className="btn btn-secondary btn-large" onClick={() => dispatch({ type: 'RESET_GAME' })}>
          🔄 Play Again
        </button>
        <button className="btn btn-secondary" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'intro' })}>
          🏠 Back to Start
        </button>
      </div>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <CertificateModal onClose={() => setShowCertificate(false)} />
      )}

      {/* Key takeaways */}
      <div className="results-takeaways">
        <h3>🧠 Key Takeaways</h3>
        <div className="results-takeaway-grid">
          <div className="results-takeaway">
            <span>🔍</span>
            <p><strong>Investigate Before Deciding</strong> — Good governance starts with understanding the real issues.</p>
          </div>
          <div className="results-takeaway">
            <span>👥</span>
            <p><strong>Every Voice Matters</strong> — Including different perspectives leads to fairer, better decisions.</p>
          </div>
          <div className="results-takeaway">
            <span>🗳️</span>
            <p><strong>Democratic Processes Work</strong> — Discussion + fair voting = decisions the community can support.</p>
          </div>
          <div className="results-takeaway">
            <span>📋</span>
            <p><strong>Follow Through Matters</strong> — Decisions without implementation and monitoring don't create real change.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
