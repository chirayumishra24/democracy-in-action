import type { ResourceChallenge, SequencingChallenge } from '../types/game';

const resourceChallenges: ResourceChallenge[] = [
  {
    id: 'impl-1', phase: 'implement', type: 'resource', difficulty: 'medium', points: 10, tokenReward: 'action',
    title: 'Budget Builder', prompt: 'Allocate 100 Community Points across 5 community needs. Every decision has trade-offs.',
    learningGoal: 'Understand that resource allocation involves trade-offs and priorities', ibSkill: 'Thinker',
    hint: 'Make sure every area gets at least the minimum it needs to function.',
    totalPoints: 100,
    needs: [
      { id: 'water-res', label: 'Water Supply', emoji: '💧', requested: 30, minimum: 15, description: 'Repair and maintain the community water system.' },
      { id: 'road-res', label: 'Road Repair', emoji: '🛣️', requested: 25, minimum: 10, description: 'Fix the school road and market access road.' },
      { id: 'health-res', label: 'Health Centre', emoji: '🏥', requested: 25, minimum: 15, description: 'Stock the health centre with basic supplies.' },
      { id: 'school-res', label: 'School Support', emoji: '🏫', requested: 20, minimum: 10, description: 'Improve school facilities and learning materials.' },
      { id: 'park-res', label: 'Public Space', emoji: '🌳', requested: 15, minimum: 5, description: 'Maintain and improve the community park.' },
    ],
    feedbackFair: 'Well done! You ensured every area received at least basic support while prioritising the most urgent needs. This is what balanced governance looks like.',
    feedbackUnfair: 'Some areas didn\'t receive enough support. In a community, every basic need matters. Try to ensure that even lower-priority areas get at least the minimum resources they need.',
  },
  {
    id: 'impl-2', phase: 'implement', type: 'resource', difficulty: 'hard', points: 15, tokenReward: 'action',
    title: 'Emergency Allocation', prompt: 'A monsoon has caused unexpected damage. Reallocate emergency resources.',
    learningGoal: 'Adapt resource allocation to changing circumstances', ibSkill: 'Thinker',
    hint: 'Think about what is most urgent RIGHT NOW, not what was planned before.',
    totalPoints: 60,
    needs: [
      { id: 'flood-relief', label: 'Flood Relief', emoji: '🌊', requested: 25, minimum: 15, description: 'Help families affected by flooding near the market area.' },
      { id: 'road-fix', label: 'Emergency Road Repair', emoji: '🚧', requested: 20, minimum: 10, description: 'Make the main road passable again for transport and access.' },
      { id: 'health-emer', label: 'Emergency Health', emoji: '⚕️', requested: 20, minimum: 10, description: 'Provide medicines and first aid for water-related illnesses.' },
      { id: 'food-supply', label: 'Food & Water Supply', emoji: '🍚', requested: 15, minimum: 10, description: 'Ensure families have access to clean water and food.' },
    ],
    feedbackFair: 'Good crisis management! You prioritised the most urgent needs while ensuring no group was left completely unsupported. Governance must be responsive to changing situations.',
    feedbackUnfair: 'In an emergency, some needs are more urgent. Make sure the most critical areas receive at least their minimum, even if it means other areas get less than ideal.',
  },
];

const sequencingChallenges: SequencingChallenge[] = [
  {
    id: 'impl-3', phase: 'implement', type: 'sequencing', difficulty: 'medium', points: 10, tokenReward: 'action',
    title: 'Implementation Steps', prompt: 'Put the steps of implementing a community water project in the correct order.',
    learningGoal: 'Understand that implementation requires systematic planning', ibSkill: 'Thinker',
    hint: 'You need to know what to build before gathering materials.',
    steps: [
      { id: 'plan', label: 'Create a detailed plan', emoji: '📋' },
      { id: 'consult', label: 'Consult the community', emoji: '👥' },
      { id: 'resources', label: 'Gather resources and materials', emoji: '📦' },
      { id: 'assign', label: 'Assign responsibilities to people', emoji: '👷' },
      { id: 'build', label: 'Start construction / implementation', emoji: '🔨' },
      { id: 'check', label: 'Check progress and quality', emoji: '✅' },
    ],
    correctOrder: ['consult', 'plan', 'resources', 'assign', 'build', 'check'],
    explanation: 'Good implementation starts with community consultation, then planning, gathering resources, assigning responsibilities, building, and finally checking the results.',
  },
  {
    id: 'impl-4', phase: 'implement', type: 'sequencing', difficulty: 'easy', points: 5, tokenReward: 'action',
    title: 'Decision to Action', prompt: 'After a decision is made, what happens next? Put these in order.',
    learningGoal: 'Understand the steps between a decision and its outcome',
    hint: 'A decision alone doesn\'t solve anything — it needs to be turned into action.',
    steps: [
      { id: 'decide', label: 'Community makes a decision', emoji: '✅' },
      { id: 'plan-action', label: 'Create an action plan', emoji: '📝' },
      { id: 'allocate', label: 'Allocate resources', emoji: '💰' },
      { id: 'implement', label: 'Carry out the plan', emoji: '🔧' },
      { id: 'review', label: 'Review whether it worked', emoji: '📋' },
    ],
    correctOrder: ['decide', 'plan-action', 'allocate', 'implement', 'review'],
    explanation: 'Governance doesn\'t end with a decision. The full cycle is: decide → plan → allocate resources → implement → review results.',
  },
  {
    id: 'impl-5', phase: 'implement', type: 'sequencing', difficulty: 'hard', points: 15, tokenReward: 'action',
    title: 'Road Repair Project', prompt: 'Order the steps needed to repair the road near the school.',
    learningGoal: 'Apply implementation thinking to a real scenario', ibSkill: 'Thinker',
    hint: 'You can\'t repair what you haven\'t surveyed.',
    steps: [
      { id: 'survey', label: 'Survey the road to assess damage', emoji: '🔍' },
      { id: 'estimate', label: 'Estimate costs and materials needed', emoji: '📊' },
      { id: 'approve', label: 'Get community approval for the plan', emoji: '🗳️' },
      { id: 'procure', label: 'Procure materials and hire workers', emoji: '🛒' },
      { id: 'repair', label: 'Carry out the repair work', emoji: '🔨' },
      { id: 'inspect', label: 'Inspect the completed work', emoji: '✅' },
      { id: 'feedback-step', label: 'Gather community feedback on the result', emoji: '💬' },
    ],
    correctOrder: ['survey', 'estimate', 'approve', 'procure', 'repair', 'inspect', 'feedback-step'],
    explanation: 'A well-managed project follows a clear sequence: assess → estimate → approve → procure → implement → inspect → gather feedback.',
  },
];

export const implementationChallenges = [...resourceChallenges, ...sequencingChallenges] as (ResourceChallenge | SequencingChallenge)[];
