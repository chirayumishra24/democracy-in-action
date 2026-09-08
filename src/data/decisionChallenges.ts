import type { RoutingChallenge, RepresentationChallenge, RolePlayChallenge } from '../types/game';

const routingChallenges: RoutingChallenge[] = [
  {
    id: 'dec-1', phase: 'decision', type: 'routing', difficulty: 'medium', points: 10, tokenReward: 'decision',
    title: 'Who Should Handle This?', prompt: 'Different issues need different governance responses. Route each issue to the right destination.',
    learningGoal: 'Understand that different types of issues are handled at different levels', ibSkill: 'Thinker',
    hint: 'Think about whether the issue is local to the village or needs wider support.',
    issues: [
      { id: 'water-issue', label: 'Water supply repair', emoji: '💧', description: 'The community water pipes need repair. This is a local infrastructure issue.' },
      { id: 'school-issue', label: 'School road safety', emoji: '🛣️', description: 'The road near the school needs improvement for children\'s safety.' },
      { id: 'health-issue', label: 'Health centre supplies', emoji: '🏥', description: 'The health centre needs medical supplies that must come from a wider network.' },
      { id: 'transport-issue', label: 'Bus service improvement', emoji: '🚌', description: 'Transport connects Sunderpur to nearby towns — this needs coordination beyond the village.' },
    ],
    destinations: [
      { id: 'local', label: 'Local Community / Panchayat', emoji: '🏛️' },
      { id: 'block', label: 'Block / District Level', emoji: '🏢' },
    ],
    correctRouting: {
      'water-issue': 'local',
      'school-issue': 'local',
      'health-issue': 'block',
      'transport-issue': 'block',
    },
    reasoningOptions: [
      {
        issueId: 'water-issue',
        options: [
          { id: 'a', label: 'It\'s a local infrastructure issue the community can address', correct: true },
          { id: 'b', label: 'It needs national intervention', correct: false },
        ],
      },
      {
        issueId: 'health-issue',
        options: [
          { id: 'a', label: 'Medical supplies need a wider supply chain beyond the village', correct: true },
          { id: 'b', label: 'The village can manufacture medicines', correct: false },
        ],
      },
    ],
  },
  {
    id: 'dec-2', phase: 'decision', type: 'routing', difficulty: 'hard', points: 15, tokenReward: 'decision',
    title: 'The Governance Pathway', prompt: 'An issue has been identified. Trace the correct pathway from problem to solution.',
    learningGoal: 'Understand the steps in a governance decision pathway', ibSkill: 'Thinker',
    hint: 'Think about the sequence: identify → discuss → decide → plan → act.',
    issues: [
      { id: 'drainage', label: 'Market drainage project', emoji: '🌊', description: 'The market needs better drainage to prevent flooding during monsoons.' },
      { id: 'park', label: 'Public space improvement', emoji: '🌳', description: 'The community park needs maintenance and new facilities.' },
    ],
    destinations: [
      { id: 'community-meeting', label: 'Community Meeting First', emoji: '🗣️' },
      { id: 'direct-action', label: 'Direct Action Without Discussion', emoji: '⚡' },
    ],
    correctRouting: {
      'drainage': 'community-meeting',
      'park': 'community-meeting',
    },
    reasoningOptions: [
      {
        issueId: 'drainage',
        options: [
          { id: 'a', label: 'Community discussion ensures the solution fits everyone\'s needs', correct: true },
          { id: 'b', label: 'Discussion slows things down unnecessarily', correct: false },
        ],
      },
      {
        issueId: 'park',
        options: [
          { id: 'a', label: 'Different groups use the park differently — their input matters', correct: true },
          { id: 'b', label: 'One person can decide what the park needs', correct: false },
        ],
      },
    ],
  },
];

const representationChallenges: RepresentationChallenge[] = [
  {
    id: 'dec-3', phase: 'decision', type: 'representation', difficulty: 'medium', points: 10, tokenReward: 'decision',
    title: 'Building Balanced Representation', prompt: 'Select representatives who can speak for different community needs.',
    learningGoal: 'Understand that representation should cover diverse community needs', ibSkill: 'Open-minded',
    hint: 'Look at which community needs each representative covers.',
    communityNeeds: [
      { id: 'education', label: 'Education', emoji: '📚', priority: 'high' },
      { id: 'health-need', label: 'Health', emoji: '🏥', priority: 'high' },
      { id: 'agriculture', label: 'Agriculture', emoji: '🌾', priority: 'high' },
      { id: 'commerce', label: 'Commerce & Trade', emoji: '🏪', priority: 'medium' },
      { id: 'youth', label: 'Youth & Children', emoji: '👧', priority: 'medium' },
      { id: 'infrastructure', label: 'Infrastructure', emoji: '🛣️', priority: 'medium' },
    ],
    representatives: [
      { id: 'rep-teacher', name: 'Priya (Teacher)', emoji: '👩‍🏫', represents: ['education', 'youth'] },
      { id: 'rep-farmer', name: 'Arjun (Farmer)', emoji: '👨‍🌾', represents: ['agriculture', 'infrastructure'] },
      { id: 'rep-health', name: 'Meera (Health Worker)', emoji: '👩‍⚕️', represents: ['health-need'] },
      { id: 'rep-shop', name: 'Ravi (Shopkeeper)', emoji: '🧑‍💼', represents: ['commerce'] },
      { id: 'rep-youth', name: 'Anita (Student)', emoji: '👧', represents: ['youth', 'education'] },
      { id: 'rep-elder', name: 'Suresh (Elder)', emoji: '👴', represents: ['infrastructure', 'agriculture'] },
    ],
    minRepresentation: 4,
  },
  {
    id: 'dec-4', phase: 'decision', type: 'representation', difficulty: 'hard', points: 15, tokenReward: 'decision',
    title: 'Who Speaks for Whom?', prompt: 'Can you identify which groups are HEARD, PARTIALLY HEARD, or NOT YET HEARD?',
    learningGoal: 'Recognise gaps in representation', ibSkill: 'Principled',
    hint: 'Check if every community need has at least one voice representing it.',
    communityNeeds: [
      { id: 'water-need', label: 'Water & Sanitation', emoji: '💧', priority: 'high' },
      { id: 'edu-need', label: 'Education', emoji: '📚', priority: 'high' },
      { id: 'health-n', label: 'Health Services', emoji: '🏥', priority: 'high' },
      { id: 'trade-need', label: 'Trade & Market', emoji: '🏪', priority: 'medium' },
      { id: 'transport-need', label: 'Transport', emoji: '🚌', priority: 'medium' },
      { id: 'environment', label: 'Environment & Green Spaces', emoji: '🌳', priority: 'low' },
    ],
    representatives: [
      { id: 'r1', name: 'Arjun', emoji: '👨‍🌾', represents: ['water-need'] },
      { id: 'r2', name: 'Priya', emoji: '👩‍🏫', represents: ['edu-need'] },
      { id: 'r3', name: 'Meera', emoji: '👩‍⚕️', represents: ['health-n'] },
      { id: 'r4', name: 'Deepak', emoji: '👨‍💻', represents: ['transport-need'] },
    ],
    minRepresentation: 5,
  },
];

const rolePlayChallenges: RolePlayChallenge[] = [
  {
    id: 'dec-5', phase: 'decision', type: 'rolePlay', difficulty: 'hard', points: 15, tokenReward: 'decision',
    title: 'In Their Shoes', prompt: 'You are a community representative. A difficult decision must be made.',
    learningGoal: 'Practice perspective-taking and negotiation', ibSkill: 'Communicator',
    hint: 'A good compromise addresses the most urgent need while showing concern for others.',
    scenario: 'The community has resources to address one major issue this quarter. As a representative, you must listen to concerns and propose a fair action.',
    role: { title: 'Community Representative', emoji: '🏛️', description: 'You represent the whole community. Your job is to listen to everyone and find a solution that is fair.' },
    otherViewpoints: [
      { name: 'Farmer group', emoji: '👨‍🌾', position: 'We need water fixed immediately — our crops are failing.' },
      { name: 'Parents group', emoji: '👩', position: 'Our children\'s safety on the school road cannot wait.' },
      { name: 'Health group', emoji: '👩‍⚕️', position: 'The health centre is running low — people\'s health is at stake.' },
    ],
    actions: [
      { id: 'compromise', label: 'Address the most urgent need first while setting a clear timeline for others', isCompromise: true, consequence: 'The community feels heard. The top priority is addressed while others know their turn is coming.' },
      { id: 'ignore', label: 'Only listen to the loudest group', isCompromise: false, consequence: 'Other groups feel ignored and lose trust in the process.' },
      { id: 'nothing', label: 'Avoid making any decision', isCompromise: false, consequence: 'All groups are frustrated. Problems worsen without action.' },
      { id: 'all', label: 'Promise to fix everything immediately', isCompromise: false, consequence: 'Resources are spread too thin. Nothing gets done properly.' },
    ],
  },
  {
    id: 'dec-6', phase: 'decision', type: 'rolePlay', difficulty: 'medium', points: 10, tokenReward: 'decision',
    title: 'The Citizen\'s Role', prompt: 'You are a citizen attending a community meeting for the first time.',
    learningGoal: 'Understand a citizen\'s rights and responsibilities in governance', ibSkill: 'Principled',
    hint: 'Citizens have both rights (to be heard) and responsibilities (to participate constructively).',
    scenario: 'You attend the Gram Sabha meeting. An issue affecting your neighbourhood is being discussed. What should you do?',
    role: { title: 'Citizen', emoji: '🧑', description: 'You are a community member attending a meeting. You have concerns about sanitation near your home.' },
    otherViewpoints: [
      { name: 'Meeting coordinator', emoji: '📋', position: 'Everyone will get a chance to speak. Please be patient and listen to others too.' },
      { name: 'Another citizen', emoji: '👴', position: 'I\'ve been coming to these meetings for years. Every voice matters, but so does listening.' },
    ],
    actions: [
      { id: 'listen-speak', label: 'Listen to others, then share your concern with evidence', isCompromise: true, consequence: 'Your concern is heard and taken seriously because you presented it thoughtfully with evidence.' },
      { id: 'shout', label: 'Shout your demand immediately without listening', isCompromise: false, consequence: 'People are put off by the aggressive approach. Your point is lost in the disruption.' },
      { id: 'silent', label: 'Stay completely silent and leave disappointed', isCompromise: false, consequence: 'Your concern is never heard. Nothing changes for your neighbourhood.' },
      { id: 'threaten', label: 'Threaten to disrupt the meeting unless your issue is addressed first', isCompromise: false, consequence: 'This undermines the democratic process and alienates potential allies.' },
    ],
  },
];

export const decisionChallenges = [...routingChallenges, ...representationChallenges, ...rolePlayChallenges] as (RoutingChallenge | RepresentationChallenge | RolePlayChallenge)[];
