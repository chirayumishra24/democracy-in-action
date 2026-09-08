export interface ConsequenceResult {
  steps: { text: string; emoji: string; isPositive: boolean }[];
  overallSuccess: boolean;
  message: string;
}

export function evaluateSequence(
  selectedOrder: string[],
  correctOrder: string[],
  allSteps: { id: string; label: string }[]
): ConsequenceResult {
  const steps: ConsequenceResult['steps'] = [];
  let correctCount = 0;

  selectedOrder.forEach((stepId, idx) => {
    const step = allSteps.find(s => s.id === stepId);
    const isCorrectPosition = correctOrder[idx] === stepId;
    const isInCorrectSet = correctOrder.includes(stepId);

    if (isCorrectPosition) {
      steps.push({ text: `${step?.label ?? stepId} — Good choice at the right time!`, emoji: '✅', isPositive: true });
      correctCount++;
    } else if (isInCorrectSet) {
      steps.push({ text: `${step?.label ?? stepId} — Right idea, but the timing could be better.`, emoji: '🔶', isPositive: true });
      correctCount += 0.5;
    } else {
      steps.push({ text: `${step?.label ?? stepId} — This might not help right now.`, emoji: '❌', isPositive: false });
    }
  });

  const ratio = correctCount / correctOrder.length;
  return {
    steps,
    overallSuccess: ratio >= 0.6,
    message: ratio >= 0.8
      ? 'Excellent planning! The community benefits from your thoughtful approach.'
      : ratio >= 0.5
      ? 'Good effort! A few adjustments would make your plan even better.'
      : 'Think about the order of steps. What needs to happen first before other things can work?',
  };
}

export function evaluateDistribution(
  distribution: Record<string, number>,
  needs: { id: string; minimum: number; requested: number }[],
  totalPoints: number,
): { fair: boolean; message: string; details: { id: string; received: number; status: string }[] } {
  const details = needs.map(need => {
    const received = distribution[need.id] || 0;
    let status = '';
    if (received >= need.requested) status = 'Fully supported';
    else if (received >= need.minimum) status = 'Basic needs met';
    else if (received > 0) status = 'Needs more support';
    else status = 'Not supported';
    return { id: need.id, received, status };
  });

  const allMinMet = needs.every(n => (distribution[n.id] || 0) >= n.minimum);
  const totalUsed = Object.values(distribution).reduce((s, v) => s + v, 0);
  const withinBudget = totalUsed <= totalPoints;

  return {
    fair: allMinMet && withinBudget,
    message: allMinMet
      ? 'Well done! You considered different needs and worked within the available resources.'
      : 'Some areas did not receive enough support. Different needs may require different decisions — think about what is most urgent.',
    details,
  };
}

export function evaluateRouting(
  userRouting: Record<string, string>,
  correctRouting: Record<string, string>,
): { correct: number; total: number; ratio: number; details: { issueId: string; correct: boolean }[] } {
  const total = Object.keys(correctRouting).length;
  let correct = 0;
  const details = Object.entries(correctRouting).map(([issueId, correctDest]) => {
    const isCorrect = userRouting[issueId] === correctDest;
    if (isCorrect) correct++;
    return { issueId, correct: isCorrect };
  });

  return { correct, total, ratio: total > 0 ? correct / total : 0, details };
}
