export type Language = 'en' | 'hi';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Brand & Header
  appTitle: {
    en: 'Democracy in Action',
    hi: 'लोकतंत्र कर्म में',
  },
  appTagline: {
    en: 'People • Decisions • Real Change',
    hi: 'लोग • निर्णय • वास्तविक बदलाव',
  },
  round: {
    en: 'Round',
    hi: 'दौर',
  },
  points: {
    en: 'pts',
    hi: 'अंक',
  },
  howToPlay: {
    en: 'How to Play',
    hi: 'कैसे खेलें',
  },
  settings: {
    en: 'Settings',
    hi: 'सेटिंग्स',
  },

  // Phases
  phaseExplore: {
    en: 'Explore Sunderpur',
    hi: 'सुंदरपुर की खोज',
  },
  phasePeople: {
    en: 'Meet the People',
    hi: 'नागरिकों से मिलें',
  },
  phaseGramSabha: {
    en: 'Community Discussion',
    hi: 'ग्राम सभा चर्चा',
  },
  phaseDecision: {
    en: 'Governance Decisions',
    hi: 'पंचायती निर्णय',
  },
  phaseImplement: {
    en: 'Plan & Implement',
    hi: 'योजना एवं क्रियान्वयन',
  },
  phaseMonitor: {
    en: 'Monitor & Review',
    hi: 'निगरानी एवं समीक्षा',
  },
  phaseFinal: {
    en: 'Final Review',
    hi: 'अंतिम समीक्षा',
  },

  // Tokens
  tokenParticipation: {
    en: 'Participation',
    hi: 'जन भागीदारी',
  },
  tokenDecision: {
    en: 'Decision Quality',
    hi: 'निर्णय गुणवत्ता',
  },
  tokenAction: {
    en: 'Implementation',
    hi: 'क्रियान्वयन',
  },
  tokenCommunity: {
    en: 'Wellbeing',
    hi: 'सामुदायिक कल्याण',
  },

  // Dashboard & Indicators
  civicHealth: {
    en: 'Civic Health Gauge',
    hi: 'नागरिक स्वास्थ्य पैमाना',
  },
  locationsImproving: {
    en: 'Locations improving',
    hi: 'स्थानों में सुधार',
  },
  resources: {
    en: 'Resources',
    hi: 'संसाधन',
  },

  // Buttons & Interactions
  startChallenge: {
    en: '▶ Start Challenge',
    hi: '▶ चुनौती शुरू करें',
  },
  completePhase: {
    en: '✅ Complete Phase',
    hi: '✅ चरण पूरा करें',
  },
  submitAnswer: {
    en: 'Submit Answer',
    hi: 'उत्तर जमा करें',
  },
  continueBtn: {
    en: 'Continue →',
    hi: 'आगे बढ़ें →',
  },
  nextQuestion: {
    en: 'Next Question →',
    hi: 'अगला प्रश्न →',
  },
  approvedGramSabha: {
    en: 'APPROVED IN GRAM SABHA',
    hi: 'ग्राम सभा द्वारा स्वीकृत',
  },
  readToMe: {
    en: 'Listen to speech',
    hi: 'आवाज़ सुनें',
  },
};

export function t(key: string, lang: Language = 'en'): string {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  return key;
}
