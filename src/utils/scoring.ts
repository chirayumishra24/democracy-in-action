import type { Difficulty } from '../types/game';

export function getBasePoints(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 5;
    case 'medium': return 10;
    case 'hard': return 15;
  }
}

export function getMajorPoints(): number { return 20; }
export function getFinalPoints(): number { return 25; }
export function getStealBonus(): number { return 5; }

export function calculatePoints(difficulty: Difficulty, hintUsed: boolean, isMajor = false, isFinal = false): number {
  let pts = isFinal ? getFinalPoints() : isMajor ? getMajorPoints() : getBasePoints(difficulty);
  if (hintUsed) pts = Math.max(1, pts - 2);
  return pts;
}

export function calculatePartialPoints(difficulty: Difficulty, ratio: number, hintUsed: boolean): number {
  const base = getBasePoints(difficulty);
  let pts = Math.round(base * ratio);
  if (hintUsed) pts = Math.max(1, pts - 2);
  return Math.max(1, pts);
}
