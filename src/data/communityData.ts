import type { LocationInfo, PersonInfo, PhaseInfo } from '../types/game';

/* ─ Locations in Sunderpur ─ */
export const locations: LocationInfo[] = [
  {
    id: 'school', name: 'School', emoji: '🏫',
    description: 'The local school where children from the community study.',
    issue: 'The road near the school needs attention. Some students find it difficult to reach school safely.',
    clue: 'Notice the path children take every morning.',
    question: 'What would you investigate first?',
    investigateOptions: [
      { id: 'inspect', label: 'Inspect the road and surroundings', correct: true, feedback: 'Good — gathering evidence first helps make better decisions.' },
      { id: 'speak', label: 'Speak to community members', correct: true, feedback: 'Listening to people affected is an important step.' },
      { id: 'ignore', label: 'Ignore it for now', correct: false, feedback: 'Overlooking an issue means it may grow worse over time.' },
      { id: 'fix', label: 'Immediately choose a solution', correct: false, feedback: 'Deciding without investigating may not solve the real problem.' },
    ],
  },
  {
    id: 'water', name: 'Water Facility', emoji: '💧',
    description: 'The community water supply point that serves many families.',
    issue: 'The water supply is irregular. Many families have difficulty getting clean water regularly.',
    clue: 'Some families travel long distances for water.',
    question: 'What should you find out before suggesting a solution?',
    investigateOptions: [
      { id: 'howmany', label: 'How many families are affected?', correct: true, feedback: 'Understanding the scale of the problem is important for good decisions.' },
      { id: 'cause', label: 'What is causing the irregularity?', correct: true, feedback: 'Finding the root cause helps create lasting solutions.' },
      { id: 'build', label: 'Build a new facility right away', correct: false, feedback: 'Building without understanding the problem might waste resources.' },
      { id: 'wait', label: 'Wait and see if it fixes itself', correct: false, feedback: 'Community issues rarely resolve without action.' },
    ],
  },
  {
    id: 'health', name: 'Health Centre', emoji: '🏥',
    description: 'A small health centre providing basic medical care to the community.',
    issue: 'The health centre lacks some basic supplies. Community members sometimes have to travel far for treatment.',
    clue: 'Ask the health worker what they need most.',
    question: 'Who should you talk to first to understand this issue?',
    investigateOptions: [
      { id: 'healthworker', label: 'The health worker', correct: true, feedback: 'People who work there understand the challenges best.' },
      { id: 'patients', label: 'Community members who use the centre', correct: true, feedback: 'Listening to those affected helps you understand real needs.' },
      { id: 'nobody', label: 'No one — just decide what to send', correct: false, feedback: 'Deciding without listening may mean you miss the real need.' },
      { id: 'outsider', label: 'Only people from outside the community', correct: false, feedback: 'Local voices are essential for understanding local needs.' },
    ],
  },
  {
    id: 'road', name: 'Roads & Transport', emoji: '🛣️',
    description: 'The roads connecting different parts of Sunderpur and nearby areas.',
    issue: 'Some roads become difficult to use during the rainy season, affecting travel and trade.',
    clue: 'Farmers and shopkeepers are both affected.',
    question: 'Why is it important to understand who is affected before making a plan?',
    investigateOptions: [
      { id: 'priorities', label: 'Different people may have different priorities', correct: true, feedback: 'Understanding different perspectives leads to better, fairer solutions.' },
      { id: 'evidence', label: 'It helps gather stronger evidence for a decision', correct: true, feedback: 'More perspectives mean more complete information.' },
      { id: 'notimportant', label: 'It is not really important', correct: false, feedback: 'Ignoring affected people often leads to incomplete solutions.' },
      { id: 'onevote', label: 'Only one person\'s opinion matters', correct: false, feedback: 'In a community, many voices contribute to good decisions.' },
    ],
  },
  {
    id: 'market', name: 'Market', emoji: '🏪',
    description: 'The community market where people buy and sell goods.',
    issue: 'The market area needs better drainage. During rains, water collects and makes it hard for vendors and buyers.',
    clue: 'Both shopkeepers and customers face difficulties during the monsoon.',
    question: 'What kind of information would help the community decide what to do?',
    investigateOptions: [
      { id: 'howbad', label: 'How often and how severely is the market affected?', correct: true, feedback: 'Understanding frequency and severity helps set priorities.' },
      { id: 'who', label: 'Who depends on the market for their livelihood?', correct: true, feedback: 'Knowing who is affected helps make fair decisions.' },
      { id: 'nothing', label: 'No information is needed — just fix it', correct: false, feedback: 'Acting without information may not address the real problem.' },
      { id: 'onlyrich', label: 'Only ask the wealthiest shopkeepers', correct: false, feedback: 'All community members deserve to be heard, not just a few.' },
    ],
  },
  {
    id: 'publicSpace', name: 'Public Park', emoji: '🌳',
    description: 'An open area where community members gather, children play, and events are held.',
    issue: 'The public space could be improved for community use. Some feel it needs better maintenance.',
    clue: 'Children, families, and elderly people all use this space differently.',
    question: 'How can you understand what different groups need from this space?',
    investigateOptions: [
      { id: 'ask', label: 'Ask different groups — children, parents, elders', correct: true, feedback: 'Different groups have different needs — listening to all helps create inclusive solutions.' },
      { id: 'observe', label: 'Observe how the space is used at different times', correct: true, feedback: 'Observation reveals patterns that people might not think to mention.' },
      { id: 'decide', label: 'One person should decide for everyone', correct: false, feedback: 'Community spaces serve everyone — decisions should consider multiple perspectives.' },
      { id: 'close', label: 'Close the space until someone important decides', correct: false, feedback: 'Closing a community space affects everyone who depends on it.' },
    ],
  },
  {
    id: 'panchayatOffice', name: 'Panchayat Office', emoji: '🏛️',
    description: 'The local governance office where community decisions are discussed and recorded.',
    issue: 'Community members are not always aware of decisions being made. Participation can be improved.',
    clue: 'Good governance depends on people knowing what is happening.',
    question: 'Why is it important for community members to participate in governance?',
    investigateOptions: [
      { id: 'voice', label: 'So every person\'s voice can be heard', correct: true, feedback: 'Participation ensures that decisions reflect the needs of the whole community.' },
      { id: 'better', label: 'Better decisions come from more perspectives', correct: true, feedback: 'Diverse viewpoints lead to stronger, more balanced decisions.' },
      { id: 'notnecessary', label: 'Participation is not really necessary', correct: false, feedback: 'Without participation, decisions may not serve the community well.' },
      { id: 'onlyleaders', label: 'Only leaders should make decisions', correct: false, feedback: 'In a democracy, everyone has the right to participate.' },
    ],
  },
  {
    id: 'gramSabha', name: 'Gram Sabha', emoji: '🗣️',
    description: 'The open meeting area where community members gather to discuss and decide together.',
    issue: 'Not all community members attend meetings regularly. Some feel their voice does not matter.',
    clue: 'A meeting is only as strong as the participation it includes.',
    question: 'What could help more people participate in community meetings?',
    investigateOptions: [
      { id: 'timing', label: 'Hold meetings at times when more people can attend', correct: true, feedback: 'Practical steps like convenient timing can increase participation.' },
      { id: 'inform', label: 'Ensure everyone is informed in advance', correct: true, feedback: 'People need to know about meetings to attend them.' },
      { id: 'exclude', label: 'Only invite certain people', correct: false, feedback: 'Excluding people goes against the spirit of community participation.' },
      { id: 'cancel', label: 'Cancel meetings since not everyone comes', correct: false, feedback: 'The solution is more participation, not less.' },
    ],
  },
  {
    id: 'homes', name: 'Homes', emoji: '🏘️',
    description: 'The residential area of Sunderpur where families live.',
    issue: 'Some homes face challenges with basic services like sanitation and waste management.',
    clue: 'Ask families what daily challenge they face most.',
    question: 'What is the first step in addressing a community-wide issue?',
    investigateOptions: [
      { id: 'listen', label: 'Listen to the people who are affected', correct: true, feedback: 'Listening is always the first step in understanding a problem.' },
      { id: 'map', label: 'Map out which areas are affected and how', correct: true, feedback: 'Understanding the extent of a problem helps plan effectively.' },
      { id: 'assume', label: 'Assume you already know the answer', correct: false, feedback: 'Assumptions can lead to solutions that miss the real problem.' },
      { id: 'blame', label: 'Look for someone to blame', correct: false, feedback: 'Blame does not solve problems — understanding and action do.' },
    ],
  },
  {
    id: 'farms', name: 'Farms', emoji: '🌾',
    description: 'Agricultural land surrounding Sunderpur where families grow crops.',
    issue: 'Farmers need reliable water and road access to bring their produce to the market.',
    clue: 'Farm issues connect to water, roads, and the market.',
    question: 'Why do community issues often connect to each other?',
    investigateOptions: [
      { id: 'system', label: 'A community is a connected system — one issue affects others', correct: true, feedback: 'Understanding connections helps create solutions that help more people.' },
      { id: 'resources', label: 'Shared resources mean shared challenges', correct: true, feedback: 'When resources are shared, improving one area can benefit many.' },
      { id: 'separate', label: 'They don\'t connect — each issue is separate', correct: false, feedback: 'In reality, most community issues are interconnected.' },
      { id: 'norelation', label: 'Farms have nothing to do with roads or markets', correct: false, feedback: 'Farms depend on roads for transport and markets for selling produce.' },
    ],
  },
  {
    id: 'transport', name: 'Transport', emoji: '🚌',
    description: 'The transport services connecting Sunderpur to nearby towns and cities.',
    issue: 'Transport services are limited, making it difficult for people to travel for work, school, or health needs.',
    clue: 'Ask who needs transport most and when.',
    question: 'How does limited transport affect a community?',
    investigateOptions: [
      { id: 'access', label: 'People can\'t easily access health, education, or work', correct: true, feedback: 'Transport connects people to essential services.' },
      { id: 'economy', label: 'It affects local trade and the economy', correct: true, feedback: 'When goods and people can\'t move easily, the whole community is affected.' },
      { id: 'noeffect', label: 'It doesn\'t really matter', correct: false, feedback: 'Transport is essential for connecting communities to services and opportunities.' },
      { id: 'luxury', label: 'Transport is a luxury, not a need', correct: false, feedback: 'For many, transport is the only way to reach school, work, or a hospital.' },
    ],
  },
];

/* ─ Community People ─ */
export const communityPeople: PersonInfo[] = [
  {
    id: 'priya', name: 'Priya', role: 'Teacher', emoji: '👩‍🏫',
    concern: 'Children\'s safety on the way to school',
    perspective: 'The road near the school has needed repair for a long time. Children find it hard to walk safely, especially during the rains.',
    information: 'About 120 children use this road daily.',
    priority: 'Road repair near the school should come first — children\'s safety cannot wait.',
  },
  {
    id: 'arjun', name: 'Arjun', role: 'Farmer', emoji: '👨‍🌾',
    concern: 'Water supply for farms and families',
    perspective: 'Without reliable water, crops suffer and families struggle. Water affects everything — health, food, and livelihoods.',
    information: 'Many farming families depend on the community water supply.',
    priority: 'Fixing the water supply should be the top priority — it affects farms and homes.',
  },
  {
    id: 'meera', name: 'Meera', role: 'Health Worker', emoji: '👩‍⚕️',
    concern: 'Lack of basic supplies at the health centre',
    perspective: 'People come to the health centre expecting help, but we sometimes don\'t have what we need. For serious cases, they must travel far.',
    information: 'The nearest alternative health facility is quite far from the village.',
    priority: 'Health should be a priority — when people fall sick, they need help nearby.',
  },
  {
    id: 'ravi', name: 'Ravi', role: 'Shopkeeper', emoji: '🧑‍💼',
    concern: 'Market drainage affecting business',
    perspective: 'During the monsoon, the market floods and nobody can buy or sell. Vendors lose income and goods get damaged.',
    information: 'The market is the main source of income for many families in the area.',
    priority: 'Fix the market drainage — people\'s livelihoods depend on it.',
  },
  {
    id: 'anita', name: 'Anita', role: 'Student', emoji: '👧',
    concern: 'Need for a safe place to play and study',
    perspective: 'We don\'t have a clean, safe space to play or study after school. The public park could be so much better if someone looked after it.',
    information: 'Children and young people make up a large part of the community.',
    priority: 'Every child deserves a safe place to play and learn outside school.',
  },
  {
    id: 'suresh', name: 'Suresh', role: 'Elder', emoji: '👴',
    concern: 'Community participation in decision-making',
    perspective: 'In the old days, everyone came to meetings and discussed problems together. Now, fewer people attend. Decisions are being made without hearing everyone.',
    information: 'Attendance at community meetings has been declining.',
    priority: 'Strengthen participation — good decisions need all voices.',
  },
  {
    id: 'kavita', name: 'Kavita', role: 'Parent', emoji: '👩',
    concern: 'Sanitation and waste management near homes',
    perspective: 'Our homes are affected by poor waste management. It\'s a health concern, especially for young children.',
    information: 'Several families in the residential area face this issue.',
    priority: 'Clean surroundings are basic — this needs attention soon.',
  },
  {
    id: 'deepak', name: 'Deepak', role: 'Young Professional', emoji: '👨‍💻',
    concern: 'Transport connectivity for work and education',
    perspective: 'I have to travel to the nearby town for work. Limited transport means I spend hours commuting. Many young people leave because of this.',
    information: 'Better transport could help the local economy and keep young people connected.',
    priority: 'Transport links would help the whole community grow.',
  },
];

/* ─ Phase Configuration ─ */
export const phases: PhaseInfo[] = [
  { id: 'explore', title: 'Explore', subtitle: 'Discover issues', emoji: '🔍', color: 'var(--phase-explore)', bgColor: 'var(--phase-explore-bg)', route: '/governance/explore' },
  { id: 'people', title: 'Meet People', subtitle: 'Hear viewpoints', emoji: '👥', color: 'var(--phase-people)', bgColor: 'var(--phase-people-bg)', route: '/governance/people' },
  { id: 'gramSabha', title: 'Discuss', subtitle: 'Community meeting', emoji: '🗣️', color: 'var(--phase-discuss)', bgColor: 'var(--phase-discuss-bg)', route: '/governance/gram-sabha' },
  { id: 'decision', title: 'Decide', subtitle: 'Govern & route', emoji: '✅', color: 'var(--phase-decide)', bgColor: 'var(--phase-decide-bg)', route: '/governance/decide' },
  { id: 'implement', title: 'Implement', subtitle: 'Plan & act', emoji: '🔧', color: 'var(--phase-implement)', bgColor: 'var(--phase-implement-bg)', route: '/governance/implement' },
  { id: 'monitor', title: 'Review', subtitle: 'Monitor & account', emoji: '📋', color: 'var(--phase-review)', bgColor: 'var(--phase-review-bg)', route: '/governance/review' },
];
