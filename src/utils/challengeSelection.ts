import type { Challenge, GovernancePhase } from '../types/game';
import { exploreChallenges } from '../data/exploreChallenges';
import { peopleChallenges } from '../data/peopleChallenges';
import { discussionChallenges } from '../data/discussionChallenges';
import { decisionChallenges } from '../data/decisionChallenges';
import { implementationChallenges } from '../data/implementationChallenges';
import { monitoringChallenges } from '../data/monitoringChallenges';
import { finalChallenges } from '../data/finalChallenges';

const phasePoolMap: Record<GovernancePhase, () => Challenge[]> = {
  explore: () => exploreChallenges,
  people: () => peopleChallenges,
  gramSabha: () => discussionChallenges,
  decision: () => decisionChallenges,
  implement: () => implementationChallenges,
  monitor: () => monitoringChallenges,
  final: () => finalChallenges,
};

export function selectChallenge(phase: GovernancePhase, usedIds: string[]): Challenge {
  const pool = phasePoolMap[phase]();
  let available = pool.filter(c => !usedIds.includes(c.id));
  if (available.length === 0) available = pool; // reset pool if all used
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

export function getChallengePool(phase: GovernancePhase): Challenge[] {
  return phasePoolMap[phase]();
}

export function getPoolSize(phase: GovernancePhase): number {
  return phasePoolMap[phase]().length;
}
