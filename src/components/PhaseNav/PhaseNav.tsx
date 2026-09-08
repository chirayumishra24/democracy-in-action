import { useGame } from '../../state/gameStore';
import { phases } from '../../data/communityData';
import './PhaseNav.css';

export default function PhaseNav() {
  const { state, dispatch } = useGame();

  return (
    <nav className="phase-nav" role="navigation" aria-label="Governance phases">
      <div className="phase-nav__inner">
        {phases.map((p) => {
          const isActive = state.phase === p.id;
          const isCompleted = state.completedPhases.includes(p.id);
          const isUnlocked = isActive || isCompleted || isAdjacentUnlocked(p.id, state.phase, state.completedPhases);

          return (
            <button
              key={p.id}
              className={`phase-nav__item ${isActive ? 'phase-nav__item--active' : ''} ${isCompleted ? 'phase-nav__item--completed' : ''} ${!isUnlocked ? 'phase-nav__item--locked' : ''}`}
              onClick={() => isUnlocked && dispatch({ type: 'SET_GOVERNANCE_PHASE', phase: p.id })}
              disabled={!isUnlocked}
              style={{ '--phase-color': p.color, '--phase-bg': p.bgColor } as React.CSSProperties}
              aria-current={isActive ? 'step' : undefined}
              title={isUnlocked ? `Go to ${p.title}` : 'Complete previous phases first'}
            >
              <span className="phase-nav__emoji" aria-hidden="true">{isCompleted ? '✅' : p.emoji}</span>
              <div className="phase-nav__text-col">
                <span className="phase-nav__label">{p.title}</span>
                <span className="phase-nav__sub">{p.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function isAdjacentUnlocked(phaseId: string, current: string, completed: string[]): boolean {
  const order = phases.map(p => p.id);
  const currentIdx = order.indexOf(current);
  const targetIdx = order.indexOf(phaseId);
  if (targetIdx <= 0) return true;
  return completed.includes(order[targetIdx - 1]) || targetIdx <= currentIdx;
}
