import type { CommunityState, GovernancePhase, LocationState } from '../types/game';

export function getOverallProgress(community: CommunityState): number {
  const ind = community.indicators;
  const values = Object.values(ind);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function getLocationProgress(community: CommunityState): number {
  const states = Object.values(community.locations);
  const resolved = states.filter(s => s === 'resolved' || s === 'improving').length;
  return Math.round((resolved / states.length) * 100);
}

export function getPhaseProgress(completedPhases: GovernancePhase[]): { stage: number; label: string } {
  const phaseStages: Record<string, number> = {
    explore: 1, people: 1, gramSabha: 1,
    decision: 2,
    implement: 3, monitor: 3, final: 3,
  };
  const stageLabels = ['Participate', 'Govern', 'Make it Happen'];

  let maxStage = 0;
  for (const p of completedPhases) {
    const s = phaseStages[p] || 0;
    if (s > maxStage) maxStage = s;
  }

  return { stage: maxStage, label: stageLabels[Math.max(0, maxStage - 1)] || stageLabels[0] };
}

export function getLocationStateLabel(s: LocationState): string {
  switch (s) {
    case 'problem': return 'Needs attention';
    case 'exploring': return 'Exploring...';
    case 'identified': return 'Issue identified';
    case 'improving': return 'Improving';
    case 'resolved': return 'Resolved';
  }
}

export function getLocationStateColor(s: LocationState): string {
  switch (s) {
    case 'problem': return 'var(--danger)';
    case 'exploring': return 'var(--warning)';
    case 'identified': return 'var(--secondary)';
    case 'improving': return 'var(--primary-light)';
    case 'resolved': return 'var(--success)';
  }
}
