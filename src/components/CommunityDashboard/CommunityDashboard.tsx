import { useGame } from '../../state/gameStore';
import { getOverallProgress, getLocationProgress } from '../../utils/progressEngine';
import './CommunityDashboard.css';

export default function CommunityDashboard() {
  const { state } = useGame();
  const overall = getOverallProgress(state.community);
  const locationProg = getLocationProgress(state.community);
  const ind = state.community.indicators;

  const indicators = [
    { label: 'Participation', value: ind.participation, emoji: '🗣️', color: 'var(--token-participation)' },
    { label: 'Decision Quality', value: ind.decisionQuality, emoji: '✅', color: 'var(--token-decision)' },
    { label: 'Implementation', value: ind.implementation, emoji: '⚡', color: 'var(--token-action)' },
    { label: 'Public Service', value: ind.publicService, emoji: '🏥', color: 'var(--phase-people)' },
    { label: 'Accountability', value: ind.accountability, emoji: '📋', color: 'var(--phase-review)' },
    { label: 'Wellbeing', value: ind.communityWellbeing, emoji: '🤝', color: 'var(--token-community)' },
  ];

  return (
    <div className="community-dashboard" role="region" aria-label="Community indicators">
      <div className="community-dashboard__header">
        <h3>📊 Community Dashboard</h3>
        <div className="community-dashboard__overall">
          <span className="community-dashboard__overall-value">{overall}%</span>
          <span className="community-dashboard__overall-label">Overall</span>
        </div>
      </div>

      <div className="community-dashboard__grid">
        {indicators.map(i => (
          <div key={i.label} className="indicator-bar">
            <div className="indicator-bar__label">
              <span>{i.emoji} {i.label}</span>
              <span className="indicator-bar__value">{i.value}%</span>
            </div>
            <div className="indicator-bar__track">
              <div className="indicator-bar__fill" style={{ width: `${i.value}%`, background: i.color, '--fill-width': `${i.value}%` } as React.CSSProperties} />
            </div>
          </div>
        ))}
      </div>

      <div className="community-dashboard__footer">
        <div className="community-dashboard__stat">
          <span>🏘️ Locations</span>
          <strong>{locationProg}% improving</strong>
        </div>
        <div className="community-dashboard__stat">
          <span>💰 Resources</span>
          <strong>{state.community.resources}%</strong>
        </div>
      </div>
    </div>
  );
}
