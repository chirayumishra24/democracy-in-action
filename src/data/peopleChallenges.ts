import type { ViewpointChallenge } from '../types/game';

export const peopleChallenges: ViewpointChallenge[] = [
  {
    id: 'ppl-1', phase: 'people', type: 'viewpoint', difficulty: 'medium', points: 10, tokenReward: 'participation',
    title: 'Road or Water?', prompt: 'Listen to different community members and understand their priorities.',
    learningGoal: 'Understand that different people have different priorities', ibSkill: 'Open-minded',
    hint: 'Think about who is most affected and why.',
    issue: 'Should the community prioritize improving the road near the school or the water supply?',
    viewpoints: [
      { personId: 'priya', name: 'Priya', role: 'Teacher', emoji: '👩‍🏫', perspective: 'Children\'s safety must come first. The road near the school is dangerous, especially during rains. About 120 children use it daily.' },
      { personId: 'arjun', name: 'Arjun', role: 'Farmer', emoji: '👨‍🌾', perspective: 'Without reliable water, crops fail and families go hungry. Water affects everything — health, food, and livelihoods.' },
      { personId: 'kavita', name: 'Kavita', role: 'Parent', emoji: '👩', perspective: 'Both matter, but my children need a safe way to reach school. Can we find a solution that addresses both gradually?' },
    ],
    questions: [
      {
        question: 'What did Priya, the teacher, say is most important?',
        options: [
          { id: 'a', label: 'Children\'s safety on the school road', correct: true, feedback: 'Yes — Priya prioritises the road because it directly affects children every day.' },
          { id: 'b', label: 'Building a new school', correct: false, feedback: 'Priya talked about the road, not a new school.' },
          { id: 'c', label: 'Water supply', correct: false, feedback: 'That was Arjun\'s priority, not Priya\'s.' },
          { id: 'd', label: 'Market drainage', correct: false, feedback: 'That\'s a different issue entirely.' },
        ],
      },
      {
        question: 'Why might Kavita\'s perspective be valuable in this discussion?',
        options: [
          { id: 'a', label: 'She sees both sides and suggests a gradual approach', correct: true, feedback: 'People who see multiple perspectives help communities find balanced solutions.' },
          { id: 'b', label: 'She doesn\'t have an opinion', correct: false, feedback: 'She does — she just considers both viewpoints.' },
          { id: 'c', label: 'Only one person\'s view matters', correct: false, feedback: 'In a community, all voices contribute to better decisions.' },
          { id: 'd', label: 'Her view doesn\'t matter', correct: false, feedback: 'Every community member\'s perspective matters in decision-making.' },
        ],
      },
    ],
  },
  {
    id: 'ppl-2', phase: 'people', type: 'viewpoint', difficulty: 'easy', points: 5, tokenReward: 'participation',
    title: 'The Health Centre Challenge', prompt: 'Listen to community members talk about the health centre.',
    learningGoal: 'Practice active listening and identifying key concerns', ibSkill: 'Caring',
    hint: 'Who is most directly affected?',
    issue: 'The health centre needs more supplies. How should the community respond?',
    viewpoints: [
      { personId: 'meera', name: 'Meera', role: 'Health Worker', emoji: '👩‍⚕️', perspective: 'We need basic supplies urgently. When we run out, patients have to travel far. This is especially hard for the elderly and children.' },
      { personId: 'suresh', name: 'Suresh', role: 'Elder', emoji: '👴', perspective: 'Health is a basic need. When I was younger, the community pooled resources for the centre. We need that spirit again.' },
    ],
    questions: [
      {
        question: 'What is the main concern Meera raised?',
        options: [
          { id: 'a', label: 'The health centre lacks basic supplies and patients must travel far', correct: true, feedback: 'Correct — you listened carefully to Meera\'s concern.' },
          { id: 'b', label: 'The health centre needs a new building', correct: false, feedback: 'Meera talked about supplies, not the building.' },
          { id: 'c', label: 'The health centre should close', correct: false, feedback: 'Nobody suggested closing it — they want to improve it.' },
          { id: 'd', label: 'Only children need health care', correct: false, feedback: 'Meera mentioned elderly people and children both being affected.' },
        ],
      },
    ],
  },
  {
    id: 'ppl-3', phase: 'people', type: 'viewpoint', difficulty: 'medium', points: 10, tokenReward: 'participation',
    title: 'Whose Voice Is Missing?', prompt: 'Look at who has spoken and who hasn\'t been heard yet.',
    learningGoal: 'Recognise when some voices are not being included', ibSkill: 'Principled',
    hint: 'Think about who uses the community spaces but hasn\'t been asked.',
    issue: 'The community is discussing how to improve the public space. Three people have shared their views.',
    viewpoints: [
      { personId: 'suresh', name: 'Suresh', role: 'Elder', emoji: '👴', perspective: 'The space should be peaceful, with benches and shade for older people to sit and talk.' },
      { personId: 'ravi', name: 'Ravi', role: 'Shopkeeper', emoji: '🧑‍💼', perspective: 'If the space is nice, more people will visit the market nearby. It could help business.' },
      { personId: 'priya', name: 'Priya', role: 'Teacher', emoji: '👩‍🏫', perspective: 'It could be used for outdoor learning activities and school events.' },
    ],
    questions: [
      {
        question: 'Whose perspective is missing from this discussion?',
        options: [
          { id: 'a', label: 'Children and young people — they use the space for play', correct: true, feedback: 'Excellent! Noticing missing voices is a crucial skill in community decision-making.' },
          { id: 'b', label: 'No one is missing — three people is enough', correct: false, feedback: 'Three voices don\'t represent the whole community. Children are major users of public spaces.' },
          { id: 'c', label: 'The shopkeeper shouldn\'t have been included', correct: false, feedback: 'All community members have valid perspectives.' },
          { id: 'd', label: 'Voices don\'t matter — just build something', correct: false, feedback: 'Participation means everyone should have a chance to be heard.' },
        ],
      },
      {
        question: 'Why is it important to include missing voices?',
        options: [
          { id: 'a', label: 'Decisions that exclude people may not serve the whole community', correct: true, feedback: 'Inclusive participation leads to fairer outcomes for everyone.' },
          { id: 'b', label: 'It doesn\'t matter who is included', correct: false, feedback: 'Representation matters — overlooked groups may have the most to gain or lose.' },
          { id: 'c', label: 'Only adults should decide', correct: false, feedback: 'Young people are community members too and their needs matter.' },
          { id: 'd', label: 'Speed is more important than inclusion', correct: false, feedback: 'Quick decisions without inclusion often need to be redone later.' },
        ],
      },
    ],
  },
  {
    id: 'ppl-4', phase: 'people', type: 'viewpoint', difficulty: 'hard', points: 15, tokenReward: 'participation',
    title: 'Understanding Priorities', prompt: 'Everyone has valid concerns. Can you map who cares about what?',
    learningGoal: 'Organise multiple viewpoints to find patterns and common ground', ibSkill: 'Thinker',
    hint: 'Look for concerns that connect to each other.',
    issue: 'Sunderpur has limited resources. Multiple issues need attention. How should priorities be set?',
    viewpoints: [
      { personId: 'arjun', name: 'Arjun', role: 'Farmer', emoji: '👨‍🌾', perspective: 'Water first — without it, nothing else works. Crops, health, daily life — all depend on water.' },
      { personId: 'priya', name: 'Priya', role: 'Teacher', emoji: '👩‍🏫', perspective: 'Education is the future. If children can\'t get to school safely, their learning suffers.' },
      { personId: 'deepak', name: 'Deepak', role: 'Young Professional', emoji: '👨‍💻', perspective: 'Better transport would connect Sunderpur to opportunities. Young people leave because there\'s no connectivity.' },
      { personId: 'meera', name: 'Meera', role: 'Health Worker', emoji: '👩‍⚕️', perspective: 'Health cannot wait. When someone is sick, every hour matters.' },
    ],
    questions: [
      {
        question: 'What do all four viewpoints have in common?',
        options: [
          { id: 'a', label: 'Each person cares deeply about a need that affects the community', correct: true, feedback: 'Yes — all viewpoints are valid because they reflect real community needs.' },
          { id: 'b', label: 'They all agree on the same priority', correct: false, feedback: 'They have different priorities — that\'s what makes community decisions complex.' },
          { id: 'c', label: 'None of them care about the community', correct: false, feedback: 'All four clearly care deeply about their community.' },
          { id: 'd', label: 'Only one of them is right', correct: false, feedback: 'Multiple perspectives can all be valid at the same time.' },
        ],
      },
      {
        question: 'How can a community decide when many needs are valid?',
        options: [
          { id: 'a', label: 'Discuss together, consider urgency and impact, and find a balanced plan', correct: true, feedback: 'This is the heart of democratic decision-making — discussion, analysis, and compromise.' },
          { id: 'b', label: 'The loudest person wins', correct: false, feedback: 'Volume doesn\'t equal validity — all voices should be weighed fairly.' },
          { id: 'c', label: 'Flip a coin', correct: false, feedback: 'Community decisions deserve careful thought, not chance.' },
          { id: 'd', label: 'Do nothing since they can\'t agree', correct: false, feedback: 'Disagreement is normal — it\'s resolved through discussion, not inaction.' },
        ],
      },
    ],
  },
  {
    id: 'ppl-5', phase: 'people', type: 'viewpoint', difficulty: 'medium', points: 10, tokenReward: 'participation',
    title: 'The Participation Gap', prompt: 'Why don\'t all community members participate in meetings?',
    learningGoal: 'Understand barriers to participation', ibSkill: 'Open-minded',
    hint: 'Think about practical reasons people might not attend.',
    issue: 'Community meeting attendance has been low. How can participation be improved?',
    viewpoints: [
      { personId: 'suresh', name: 'Suresh', role: 'Elder', emoji: '👴', perspective: 'Meetings used to be well attended. Now people are busy or feel their voice doesn\'t make a difference.' },
      { personId: 'kavita', name: 'Kavita', role: 'Parent', emoji: '👩', perspective: 'The meeting times don\'t work for working parents. We want to participate but can\'t always be there.' },
      { personId: 'anita', name: 'Anita', role: 'Student', emoji: '👧', perspective: 'Young people aren\'t usually invited or encouraged to attend. We have ideas too.' },
    ],
    questions: [
      {
        question: 'What are the main barriers to participation mentioned?',
        options: [
          { id: 'a', label: 'Inconvenient timing, feeling unheard, and exclusion of young people', correct: true, feedback: 'You identified three distinct barriers — each needs a different solution.' },
          { id: 'b', label: 'People are lazy', correct: false, feedback: 'The speakers gave specific reasons — timing, feeling excluded, and lack of invitation.' },
          { id: 'c', label: 'Meetings are not important', correct: false, feedback: 'All three want to participate — they face barriers, not disinterest.' },
          { id: 'd', label: 'Only one barrier exists', correct: false, feedback: 'Multiple barriers were identified — timing, feelings of powerlessness, and age exclusion.' },
        ],
      },
    ],
  },
  {
    id: 'ppl-6', phase: 'people', type: 'viewpoint', difficulty: 'easy', points: 5, tokenReward: 'participation',
    title: 'A New Perspective', prompt: 'Meet Deepak, who recently returned to Sunderpur after working in a nearby town.',
    learningGoal: 'Value new perspectives alongside established ones', ibSkill: 'Communicator',
    hint: 'What can someone who has seen other places bring to the discussion?',
    issue: 'Deepak has ideas about improving transport and connectivity, but some feel outsiders shouldn\'t influence local decisions.',
    viewpoints: [
      { personId: 'deepak', name: 'Deepak', role: 'Young Professional', emoji: '👨‍💻', perspective: 'I grew up here and came back because I care about Sunderpur. In the town, I saw how better transport changed everything.' },
      { personId: 'suresh', name: 'Suresh', role: 'Elder', emoji: '👴', perspective: 'New ideas are welcome, but they should respect what the community has built over the years.' },
    ],
    questions: [
      {
        question: 'How can Deepak\'s experience be valuable to Sunderpur?',
        options: [
          { id: 'a', label: 'He brings new ideas from seeing how other places solved similar problems', correct: true, feedback: 'Fresh perspectives combined with local knowledge can lead to better solutions.' },
          { id: 'b', label: 'He should replace all the current leaders', correct: false, feedback: 'New perspectives should add to the conversation, not replace existing voices.' },
          { id: 'c', label: 'His ideas don\'t matter because he left', correct: false, feedback: 'Everyone who cares about the community can contribute.' },
          { id: 'd', label: 'Only long-time residents should have a say', correct: false, feedback: 'Good ideas can come from anyone who cares about the community.' },
        ],
      },
    ],
  },
];
