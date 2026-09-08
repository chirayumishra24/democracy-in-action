import type { CitizenReportChallenge, AccountabilityChallenge } from '../types/game';

const citizenReportChallenges: CitizenReportChallenge[] = [
  {
    id: 'mon-1', phase: 'monitor', type: 'citizenReport', difficulty: 'medium', points: 10, tokenReward: 'community',
    title: 'Citizen Watch: Water Project', prompt: 'Inspect the community water project checkpoints. Is everything on track?',
    learningGoal: 'Practice monitoring a community project and identifying issues', ibSkill: 'Inquirer',
    hint: 'Check each stage carefully — a completed building doesn\'t mean the service is working.',
    project: 'Community Water Facility',
    checkpoints: [
      { id: 'cp1', label: 'Was the project planned with community input?', status: 'good', detail: 'Yes — the plan was discussed in a Gram Sabha meeting and approved.' },
      { id: 'cp2', label: 'Were resources allocated properly?', status: 'good', detail: 'Resources were allocated from the community budget as agreed.' },
      { id: 'cp3', label: 'Was the work completed on time?', status: 'issue', detail: 'The work took longer than expected due to material delays.' },
      { id: 'cp4', label: 'Is the community actually benefiting?', status: 'issue', detail: 'The facility exists, but access is still difficult for families on the other side of the village.' },
    ],
    correctIssues: ['cp3', 'cp4'],
    reportOptions: [
      { category: 'Delay', affected: 'All community members waiting for water', evidence: 'Work extended beyond the planned timeline', suggestion: 'Review the procurement process to prevent future delays' },
      { category: 'Access', affected: 'Families far from the facility', evidence: 'Some families still walk long distances', suggestion: 'Extend water pipes to cover more areas or add a secondary access point' },
    ],
  },
  {
    id: 'mon-2', phase: 'monitor', type: 'citizenReport', difficulty: 'easy', points: 5, tokenReward: 'community',
    title: 'School Road Check', prompt: 'The school road was repaired last month. Is it working for the community?',
    learningGoal: 'Understand that monitoring means checking real outcomes, not just completion',
    hint: 'Ask: is the road actually safer for children now?',
    project: 'School Road Repair',
    checkpoints: [
      { id: 'cp1', label: 'Was the road repaired?', status: 'good', detail: 'Yes — the road has been repaired and resurfaced.' },
      { id: 'cp2', label: 'Is the road safe for children?', status: 'good', detail: 'Children can now walk safely to school, even during light rain.' },
      { id: 'cp3', label: 'Were proper drainage channels added?', status: 'issue', detail: 'No drainage was added — heavy rain may cause the same problems again.' },
      { id: 'cp4', label: 'Is the community satisfied?', status: 'unknown', detail: 'Nobody has asked the community for feedback yet.' },
    ],
    correctIssues: ['cp3', 'cp4'],
    reportOptions: [
      { category: 'Incomplete work', affected: 'Children and pedestrians during heavy rain', evidence: 'No drainage channels were included in the repair', suggestion: 'Add drainage to prevent the road from deteriorating again' },
      { category: 'No feedback collected', affected: 'Whole community', evidence: 'No mechanism for citizen feedback was established', suggestion: 'Set up a simple way for community members to report issues' },
    ],
  },
  {
    id: 'mon-3', phase: 'monitor', type: 'citizenReport', difficulty: 'hard', points: 15, tokenReward: 'community',
    title: 'Health Centre Review', prompt: 'The health centre received new supplies. Is the service actually improving?',
    learningGoal: 'Look beyond surface-level completion to real impact', ibSkill: 'Reflective',
    hint: 'Supplies arriving is not the same as better health services.',
    project: 'Health Centre Supply Improvement',
    checkpoints: [
      { id: 'cp1', label: 'Were supplies delivered?', status: 'good', detail: 'Yes — basic medical supplies were delivered as planned.' },
      { id: 'cp2', label: 'Are the right supplies available?', status: 'issue', detail: 'Some of the delivered supplies don\'t match what the health worker requested.' },
      { id: 'cp3', label: 'Has the number of patients served increased?', status: 'good', detail: 'More people are visiting the centre now.' },
      { id: 'cp4', label: 'Are all community members able to access the centre?', status: 'issue', detail: 'People from remote areas still find it hard to reach the centre.' },
    ],
    correctIssues: ['cp2', 'cp4'],
    reportOptions: [
      { category: 'Wrong supplies', affected: 'Patients needing specific treatments', evidence: 'Supplies don\'t match the health worker\'s request', suggestion: 'Involve the health worker in the procurement process' },
      { category: 'Access gap', affected: 'Remote community members', evidence: 'Distance and transport remain barriers', suggestion: 'Consider mobile health visits or transport support' },
    ],
  },
];

const accountabilityChallenges: AccountabilityChallenge[] = [
  {
    id: 'mon-4', phase: 'monitor', type: 'accountability', difficulty: 'medium', points: 10, tokenReward: 'community',
    title: 'Accountability Trail', prompt: 'Trace the water project from decision to outcome. Click each stage to find evidence.',
    learningGoal: 'Understand accountability as tracking decisions to outcomes', ibSkill: 'Inquirer',
    hint: 'Look for gaps between what was planned and what actually happened.',
    timeline: [
      { id: 'tl1', stage: 'Decision', emoji: '✅', detail: 'Community voted to prioritise water supply repair.', evidence: 'Meeting minutes recorded the vote.', hasIssue: false },
      { id: 'tl2', stage: 'Plan', emoji: '📋', detail: 'A detailed plan was created with timelines and costs.', evidence: 'The plan document exists and was shared publicly.', hasIssue: false },
      { id: 'tl3', stage: 'Resources', emoji: '💰', detail: 'Budget was allocated from community funds.', evidence: 'Budget records show the allocation.', hasIssue: false },
      { id: 'tl4', stage: 'Implementation', emoji: '🔧', detail: 'Work began but took longer than planned.', evidence: 'The contractor reported delays due to material shortage.', hasIssue: true },
      { id: 'tl5', stage: 'Service', emoji: '💧', detail: 'Water now flows, but not to all areas.', evidence: 'Some households report receiving water; others do not.', hasIssue: true },
      { id: 'tl6', stage: 'Outcome', emoji: '🏘️', detail: 'Partial improvement — about 70% of households now have better access.', evidence: 'A community survey showed mixed results.', hasIssue: false },
      { id: 'tl7', stage: 'Feedback', emoji: '💬', detail: 'Community feedback highlighted remaining gaps.', evidence: 'Feedback forms collected from affected families.', hasIssue: false },
    ],
    questions: [
      {
        question: 'At which stage did the first problem appear?',
        options: [
          { id: 'a', label: 'Implementation — work took longer than planned', correct: true },
          { id: 'b', label: 'Decision — the community made the wrong choice', correct: false },
          { id: 'c', label: 'Resources — not enough money was allocated', correct: false },
        ],
      },
      {
        question: 'What should happen after the feedback stage?',
        options: [
          { id: 'a', label: 'The community should review the feedback and plan improvements', correct: true },
          { id: 'b', label: 'Nothing — the project is finished', correct: false },
          { id: 'c', label: 'Blame someone and stop working', correct: false },
        ],
      },
    ],
  },
  {
    id: 'mon-5', phase: 'monitor', type: 'accountability', difficulty: 'hard', points: 15, tokenReward: 'community',
    title: 'Following the Evidence', prompt: 'A community member reports that the market drainage project has not been completed properly. Investigate.',
    learningGoal: 'Use evidence to assess project accountability', ibSkill: 'Thinker',
    hint: 'Compare what was planned with what actually happened.',
    timeline: [
      { id: 'tl1', stage: 'Plan', emoji: '📋', detail: 'The plan called for drainage channels on both sides of the market.', evidence: 'Plan document shows drainage on both sides.', hasIssue: false },
      { id: 'tl2', stage: 'Approval', emoji: '🗳️', detail: 'The plan was approved in a community meeting.', evidence: 'Meeting records confirm approval.', hasIssue: false },
      { id: 'tl3', stage: 'Construction', emoji: '🔨', detail: 'Only one side of the market received drainage.', evidence: 'Visual inspection shows drainage on north side only.', hasIssue: true },
      { id: 'tl4', stage: 'Completion Report', emoji: '📄', detail: 'The completion report says "drainage installed as planned."', evidence: 'But the report doesn\'t match the actual situation.', hasIssue: true },
      { id: 'tl5', stage: 'Citizen Report', emoji: '📢', detail: 'Vendors on the south side report continued flooding.', evidence: 'Photos and testimonies from affected vendors.', hasIssue: false },
    ],
    questions: [
      {
        question: 'What is the main accountability issue here?',
        options: [
          { id: 'a', label: 'The completion report doesn\'t match reality — only half the work was done', correct: true },
          { id: 'b', label: 'The community made a bad decision', correct: false },
          { id: 'c', label: 'There is no issue — the report says it\'s done', correct: false },
        ],
      },
      {
        question: 'What should citizens do when they notice a gap like this?',
        options: [
          { id: 'a', label: 'Report the discrepancy with evidence and demand the plan be completed', correct: true },
          { id: 'b', label: 'Accept the report and move on', correct: false },
          { id: 'c', label: 'Give up on community projects', correct: false },
        ],
      },
    ],
  },
];

export const monitoringChallenges = [...citizenReportChallenges, ...accountabilityChallenges] as (CitizenReportChallenge | AccountabilityChallenge)[];
