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

  const getTier = (val: number) => {
    if (val >= 75) return { title: 'Vibrant Model Panchayat', badge: '🌟', color: '#15803d' };
    if (val >= 45) return { title: 'Active Democratic Village', badge: '🌿', color: '#b45309' };
    return { title: 'Emerging Civic Trust', badge: '🌱', color: '#4338ca' };
  };

  const tier = getTier(overall);
  const arcLength = 126; // approx half-circumference for r=40
  const strokeOffset = arcLength - (arcLength * Math.min(100, Math.max(0, overall))) / 100;

  return (
    <div className="community-dashboard" role="region" aria-label="Community indicators">
      <div className="community-dashboard__header">
        <div>
          <h3>📊 Civic Health Gauge</h3>
          <span className="community-tier-badge" style={{ color: tier.color }}>
            {tier.badge} {tier.title}
          </span>
        </div>
      </div>

      {/* SVG Radial Speedometer Arc */}
      <div className="civic-speedometer">
        <svg viewBox="0 0 100 62" className="speedometer-svg">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Background Arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="var(--border-light)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Progress Filled Arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="speedometer-arc"
          />
        </svg>
        <div className="speedometer-center">
          <span className="speedometer-value">{overall}%</span>
          <span className="speedometer-label">Civic Health</span>
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
