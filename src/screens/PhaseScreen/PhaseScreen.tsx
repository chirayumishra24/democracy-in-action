import { useState, useCallback } from 'react';
import { useGame } from '../../state/gameStore';
import type { GovernancePhase, LocationId } from '../../types/game';
import { selectChallenge } from '../../utils/challengeSelection';
import { getNextExpectedConnection } from '../../utils/networkEngine';
import { playSound } from '../../utils/audio';
import { phases } from '../../data/communityData';
import GameShell from '../../components/GameShell/GameShell';
import CommunityMap from '../../components/CommunityMap/CommunityMap';
import ChallengeCard from '../../components/ChallengeCard/ChallengeCard';
import GovernanceNetwork from '../../components/GovernanceNetwork/GovernanceNetwork';
import CommunityDashboard from '../../components/CommunityDashboard/CommunityDashboard';
import './PhaseScreen.css';

const phaseIntros: Record<GovernancePhase, { title: string; emoji: string; description: string; instruction: string }> = {
  explore: {
    title: 'Explore Sunderpur',
    emoji: '🔍',
    description: 'Click on different locations in the community to discover issues that need attention.',
    instruction: 'Tap a location on the map to begin investigating.',
  },
  people: {
    title: 'Meet the People',
    emoji: '👥',
    description: 'Listen to community members share their concerns and perspectives.',
    instruction: 'Every viewpoint matters — hear what different people think.',
  },
  gramSabha: {
    title: 'Community Discussion',
    emoji: '🗣️',
    description: 'The Gram Sabha meets to discuss and prioritise community issues.',
    instruction: 'Help the community decide what matters most.',
  },
  decision: {
    title: 'Governance Decisions',
    emoji: '✅',
    description: 'Route issues to the right level, build balanced representation, and role-play as decision-makers.',
    instruction: 'Make decisions that are fair and well-informed.',
  },
  implement: {
    title: 'Plan & Implement',
    emoji: '🔧',
    description: 'Turn decisions into action. Allocate resources and plan the steps.',
    instruction: 'Every plan needs careful sequencing and fair resource distribution.',
  },
  monitor: {
    title: 'Monitor & Review',
    emoji: '📋',
    description: 'Check whether projects are working and hold decision-makers accountable.',
    instruction: 'Good governance means following up — not just deciding.',
  },
  final: {
    title: 'Final Review',
    emoji: '🌟',
    description: 'Look at the impact of your governance journey and reflect on what you learned.',
    instruction: 'Compare before and after, then share your thoughts.',
  },
};

export default function PhaseScreen() {
  const { state, dispatch } = useGame();
  const [showChallenge, setShowChallenge] = useState(false);
  const phase = state.phase;
  const intro = phaseIntros[phase];
  const phaseInfo = phases.find(p => p.id === phase);

  const handleStartChallenge = useCallback(() => {
    const challenge = selectChallenge(phase, state.usedChallengeIds);
    dispatch({ type: 'SET_CHALLENGE', challenge, phase });
    dispatch({ type: 'SET_TIMER', time: state.maxTimer });
    dispatch({ type: 'CLEAR_HINT' });
    setShowChallenge(true);
    playSound('decision', state.settings.soundEnabled);
  }, [phase, state.usedChallengeIds, state.maxTimer, state.settings.soundEnabled, dispatch]);

  const handleLocationClick = useCallback((locId: LocationId) => {
    dispatch({ type: 'EXPLORE_LOCATION', location: locId });
    dispatch({ type: 'UPDATE_LOCATION', location: locId, state: 'exploring' });
    handleStartChallenge();
  }, [dispatch, handleStartChallenge]);

  const handleChallengeComplete = useCallback(() => {
    setShowChallenge(false);
    dispatch({ type: 'CLEAR_CHALLENGE' });

    // Network progress
    const nextConn = getNextExpectedConnection(state.governanceNetwork);
    if (nextConn) {
      dispatch({ type: 'ADD_NETWORK_CONNECTION', connection: nextConn });
      dispatch({ type: 'ACTIVATE_NODE', nodeId: nextConn.to });
    }

    // Indicator boosts
    const indicatorMap: Record<GovernancePhase, Record<string, number>> = {
      explore: { participation: 3 },
      people: { participation: 5, communityWellbeing: 2 },
      gramSabha: { participation: 3, decisionQuality: 5 },
      decision: { decisionQuality: 5, accountability: 2 },
      implement: { implementation: 5, publicService: 3 },
      monitor: { accountability: 5, communityWellbeing: 3 },
      final: { communityWellbeing: 5 },
    };
    dispatch({ type: 'UPDATE_INDICATORS', updates: indicatorMap[phase] || {} });

    // Turn management
    if (state.mode === 'team') {
      dispatch({ type: 'NEXT_TURN' });
    }

    playSound('reward', state.settings.soundEnabled);
  }, [dispatch, phase, state.governanceNetwork, state.mode, state.settings.soundEnabled]);

  const handleCompletePhase = useCallback(() => {
    dispatch({ type: 'COMPLETE_PHASE', phase });
    playSound('celebration', state.settings.soundEnabled);

    // Auto-advance to next phase
    const order: GovernancePhase[] = ['explore', 'people', 'gramSabha', 'decision', 'implement', 'monitor', 'final'];
    const idx = order.indexOf(phase);
    if (idx < order.length - 1) {
      dispatch({ type: 'SET_GOVERNANCE_PHASE', phase: order[idx + 1] });
    } else {
      dispatch({ type: 'SET_PHASE', phase: 'celebrate' });
    }
  }, [dispatch, phase, state.settings.soundEnabled]);

  const isPhaseComplete = state.completedPhases.includes(phase);

  return (
    <GameShell>
      {/* Phase intro banner */}
      <div className="phase-banner" style={{ '--phase-color': phaseInfo?.color, '--phase-bg': phaseInfo?.bgColor } as React.CSSProperties}>
        <div className="phase-banner__left">
          <span className="phase-banner__emoji">{intro.emoji}</span>
          <div>
            <h2 className="phase-banner__title">{intro.title}</h2>
            <p className="phase-banner__desc">{intro.description}</p>
          </div>
        </div>
        <div className="phase-banner__right">
          {!showChallenge && !isPhaseComplete && (
            <>
              {phase !== 'explore' && (
                <button className="btn btn-primary" onClick={handleStartChallenge}>
                  ▶ Start Challenge
                </button>
              )}
              <button className="btn btn-success btn-sm" onClick={handleCompletePhase}>
                ✅ Complete Phase
              </button>
            </>
          )}
          {isPhaseComplete && <span className="phase-banner__done">✅ Completed!</span>}
        </div>
      </div>

      {/* Challenge or Map */}
      {showChallenge && state.currentChallenge ? (
        <ChallengeCard challenge={state.currentChallenge} onComplete={handleChallengeComplete} />
      ) : (
        <>
          {/* Show map for explore, dashboard for others */}
          {(phase === 'explore') && (
            <div className="phase-content">
              <CommunityMap
                onLocationClick={handleLocationClick}
                highlightLocations={state.exploredLocations}
                interactive={!isPhaseComplete}
              />
              <p className="phase-instruction">{intro.instruction}</p>
            </div>
          )}

          {phase !== 'explore' && (
            <div className="phase-content">
              <div className="phase-stage-card">
                {phase === 'gramSabha' && (
                  <div className="phase-stage-card__hero-img-wrap">
                    <img
                      src="/images/gram-sabha.jpg"
                      alt="Gram Sabha Meeting under the Banyan Tree"
                      className="phase-stage-card__hero-img"
                    />
                    <div className="phase-stage-card__img-overlay">
                      <span className="phase-stage-card__badge">🏛️ Direct Grassroots Democracy</span>
                      <h3>Gram Sabha Assembly</h3>
                      <p>All adult citizens (18+) gather to review village priorities and hold representatives accountable.</p>
                    </div>
                  </div>
                )}
                <div className="phase-stage-card__body">
                  <div className="phase-stage-card__details">
                    <div className="phase-stage-card__tag">Phase Mission</div>
                    <h3 className="phase-stage-card__heading">{intro.title}</h3>
                    <p className="phase-stage-card__desc">{intro.description}</p>
                    <p className="phase-instruction">{intro.instruction}</p>
                  </div>
                  {!isPhaseComplete && (
                    <div className="phase-stage-card__action">
                      <button className="btn btn-primary btn-large" onClick={handleStartChallenge}>
                        ▶ Launch Challenge Activity
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Side panels: Network + Dashboard */}
      <div className="phase-side-panels">
        <GovernanceNetwork />
        <CommunityDashboard />
      </div>
    </GameShell>
  );
}
