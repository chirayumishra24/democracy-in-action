import type { ImpactChallenge, ReflectionChallenge } from '../types/game';

const impactChallenges: ImpactChallenge[] = [
  {
    id: 'fin-1', phase: 'final', type: 'impact', difficulty: 'hard', points: 20, tokenReward: 'community',
    title: 'The Community Needs You', prompt: 'Sunderpur faces several issues at once. Use everything you have learned to help.',
    learningGoal: 'Apply the full governance cycle to a complex scenario', ibSkill: 'Thinker',
    hint: 'Follow the cycle: explore → listen → discuss → decide → route → plan → implement → monitor → respond → reflect.',
    before: [
      { area: 'Water Supply', emoji: '💧', status: 'Irregular — many families affected' },
      { area: 'School Road', emoji: '🛣️', status: 'Unsafe for children during rains' },
      { area: 'Health Centre', emoji: '🏥', status: 'Low on supplies' },
      { area: 'Market', emoji: '🏪', status: 'Floods during monsoon' },
      { area: 'Public Space', emoji: '🌳', status: 'Poorly maintained' },
      { area: 'Participation', emoji: '🗣️', status: 'Low attendance at meetings' },
    ],
    after: [
      { area: 'Water Supply', emoji: '💧', status: 'Improved — most families now have regular access' },
      { area: 'School Road', emoji: '🛣️', status: 'Repaired — children can walk safely' },
      { area: 'Health Centre', emoji: '🏥', status: 'Restocked with essential supplies' },
      { area: 'Market', emoji: '🏪', status: 'Drainage added — market functions during rain' },
      { area: 'Public Space', emoji: '🌳', status: 'Maintained — used by all age groups' },
      { area: 'Participation', emoji: '🗣️', status: 'More people attending and contributing to meetings' },
    ],
    questions: [
      {
        question: 'What was the most important step in improving Sunderpur?',
        options: [
          { id: 'a', label: 'Listening to the community and making decisions together', correct: true, feedback: 'Participation and collective decision-making are the foundations of good governance.' },
          { id: 'b', label: 'Spending the most money', correct: false, feedback: 'It\'s not about how much you spend — it\'s about how wisely resources are used.' },
          { id: 'c', label: 'Having one strong leader make all decisions', correct: false, feedback: 'Democratic governance works best when the community participates.' },
          { id: 'd', label: 'Waiting for outside help', correct: false, feedback: 'Communities that act together can solve many problems themselves.' },
        ],
      },
      {
        question: 'Why is monitoring important even after a project is completed?',
        options: [
          { id: 'a', label: 'To ensure the project actually benefits the community as intended', correct: true, feedback: 'Monitoring closes the loop — it ensures decisions translate to real outcomes.' },
          { id: 'b', label: 'It\'s not important — completion is enough', correct: false, feedback: 'A completed project that doesn\'t work is not a success.' },
          { id: 'c', label: 'Only to find someone to blame', correct: false, feedback: 'Monitoring is about improvement, not blame.' },
          { id: 'd', label: 'To create paperwork', correct: false, feedback: 'Monitoring is about real outcomes for real people, not paperwork.' },
        ],
      },
      {
        question: 'What connects all the improvements in Sunderpur?',
        options: [
          { id: 'a', label: 'People participating → making decisions → taking action → reviewing results', correct: true, feedback: 'This is the governance cycle! People → Participation → Decision → Action → Review → People.' },
          { id: 'b', label: 'Random luck', correct: false, feedback: 'Community improvement comes from deliberate, organised action.' },
          { id: 'c', label: 'Money solves everything', correct: false, feedback: 'Resources help, but participation, planning, and accountability matter more.' },
          { id: 'd', label: 'Nothing — each improvement was separate', correct: false, feedback: 'All improvements connect through the governance process that made them possible.' },
        ],
      },
    ],
  },
];

const reflectionChallenges: ReflectionChallenge[] = [
  {
    id: 'fin-2', phase: 'final', type: 'reflection', difficulty: 'medium', points: 15, tokenReward: 'community',
    title: 'Reflect on Your Journey', prompt: 'Think about everything you did in Sunderpur. What did you learn?',
    learningGoal: 'Reflect on the full governance experience and personal learning', ibSkill: 'Reflective',
    questions: [
      {
        id: 'r1', question: 'What did you learn about how communities make decisions?', type: 'choice',
        options: [
          { id: 'o1', label: 'Good decisions come from listening to many viewpoints and discussing together' },
          { id: 'o2', label: 'Communities need organised processes to turn ideas into action' },
          { id: 'o3', label: 'Every voice matters — including those who are often left out' },
          { id: 'o4', label: 'Decisions are just the beginning — implementation and review matter too' },
        ],
      },
      {
        id: 'r2', question: 'Why is it important to listen to different viewpoints?', type: 'choice',
        options: [
          { id: 'o1', label: 'Different people see different aspects of a problem' },
          { id: 'o2', label: 'Inclusion makes decisions fairer and more effective' },
          { id: 'o3', label: 'Missing viewpoints can lead to incomplete solutions' },
          { id: 'o4', label: 'Listening builds trust and encourages participation' },
        ],
      },
      {
        id: 'r3', question: 'What can citizens do after a decision has been made?', type: 'choice',
        options: [
          { id: 'o1', label: 'Monitor whether the plan is being implemented properly' },
          { id: 'o2', label: 'Report issues and provide feedback' },
          { id: 'o3', label: 'Hold decision-makers accountable with evidence' },
          { id: 'o4', label: 'Participate in reviewing and improving outcomes' },
        ],
      },
      {
        id: 'r4', question: 'What would you change about your decisions if you could do this again?', type: 'text',
      },
    ],
  },
  {
    id: 'fin-3', phase: 'final', type: 'reflection', difficulty: 'easy', points: 10, tokenReward: 'community',
    title: 'Your Democracy Skills', prompt: 'Which skills did you use during this activity?',
    learningGoal: 'Recognise the skills involved in democratic participation', ibSkill: 'Reflective',
    questions: [
      {
        id: 'r1', question: 'Which skill do you think you used the most?', type: 'choice',
        options: [
          { id: 'inquiry', label: '🔍 Inquiry — investigating before deciding' },
          { id: 'thinking', label: '🧠 Thinking — comparing solutions and consequences' },
          { id: 'communication', label: '💬 Communication — listening and expressing ideas' },
          { id: 'collaboration', label: '🤝 Collaboration — working together' },
          { id: 'reflection', label: '🔄 Reflection — evaluating my own decisions' },
        ],
      },
      {
        id: 'r2', question: 'What is one thing you would tell a friend about how democracy works?', type: 'text',
      },
    ],
  },
];

export const finalChallenges = [...impactChallenges, ...reflectionChallenges] as (ImpactChallenge | ReflectionChallenge)[];
