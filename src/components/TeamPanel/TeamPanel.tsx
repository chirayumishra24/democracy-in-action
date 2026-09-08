import type { TeamId } from '../../types/game';
import { useGame } from '../../state/gameStore';
import './TeamPanel.css';

const tokenIcons: Record<string, { emoji: string; label: string }> = {
  participation: { emoji: '🗣️', label: 'Participation' },
  decision: { emoji: '✅', label: 'Decision' },
  action: { emoji: '⚡', label: 'Action' },
  community: { emoji: '🤝', label: 'Community' },
};

interface Props { team: TeamId; }

export default function TeamPanel({ team }: Props) {
  const { state } = useGame();
  const info = state.teams[team];
  const score = state.scores[team];
  const tokens = state.tokens[team];
  const isActive = state.currentTeam === team;

  return (
    <div className={`team-panel team-panel--${team.toLowerCase()} ${isActive ? 'team-panel--active' : ''}`} role="region" aria-label={`${info.name} panel`}>
      <div className="team-panel__header">
        <span className="team-panel__indicator" aria-hidden="true">{isActive ? '▶' : '⬤'}</span>
        <div>
          <div className="team-panel__name">{info.name}</div>
          <div className="team-panel__sub">{info.subtitle}</div>
        </div>
      </div>

      <div className="team-panel__score">
        <span className="team-panel__score-number">{score}</span>
        <span className="team-panel__score-label">points</span>
      </div>

      <div className="team-panel__tokens" aria-label="Tokens earned">
        {Object.entries(tokens).map(([key, count]) => {
          const t = tokenIcons[key];
          return (
            <div className="team-panel__token" key={key} title={t.label}>
              <span className="team-panel__token-icon">{t.emoji}</span>
              <span className="team-panel__token-count">{count}</span>
            </div>
          );
        })}
      </div>

      {state.scoreAnimation?.team === team && (
        <div className="team-panel__float-score" key={`anim-${Date.now()}`}>
          +{state.scoreAnimation.points}
        </div>
      )}
    </div>
  );
}
