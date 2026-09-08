/* ============================================================
   DEMOCRACY IN ACTION — Type System
   ============================================================ */

/* ─ Core Enums ─ */
export type TeamId = 'A' | 'B';
export type GameMode = 'team' | 'individual';

export type GovernancePhase =
  | 'explore'
  | 'people'
  | 'gramSabha'
  | 'decision'
  | 'implement'
  | 'monitor'
  | 'final';

export type GamePhase =
  | 'intro'
  | 'setup'
  | GovernancePhase
  | 'celebrate'
  | 'results';

export type TokenType = 'participation' | 'decision' | 'action' | 'community';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type LocationId =
  | 'homes'
  | 'school'
  | 'water'
  | 'health'
  | 'road'
  | 'market'
  | 'publicSpace'
  | 'panchayatOffice'
  | 'gramSabha'
  | 'farms'
  | 'transport';

export type LocationState = 'problem' | 'exploring' | 'identified' | 'improving' | 'resolved';

export type ChallengeType =
  | 'explore'
  | 'viewpoint'
  | 'discussion'
  | 'routing'
  | 'representation'
  | 'rolePlay'
  | 'resource'
  | 'sequencing'
  | 'causeEffect'
  | 'citizenReport'
  | 'accountability'
  | 'impact'
  | 'reflection'
  | 'mcq';

/* ─ Token State ─ */
export interface TokenState {
  participation: number;
  decision: number;
  action: number;
  community: number;
}

/* ─ Community Indicators ─ */
export interface CommunityIndicators {
  participation: number;      // 0-100
  decisionQuality: number;    // 0-100
  implementation: number;     // 0-100
  publicService: number;      // 0-100
  accountability: number;     // 0-100
  communityWellbeing: number; // 0-100
}

/* ─ Community State ─ */
export interface CommunityState {
  locations: Record<LocationId, LocationState>;
  resources: number; // 0-100
  indicators: CommunityIndicators;
}

/* ─ Location Info (data) ─ */
export interface LocationInfo {
  id: LocationId;
  name: string;
  emoji: string;
  description: string;
  issue: string;
  clue: string;
  question: string;
  investigateOptions: { id: string; label: string; correct: boolean; feedback: string }[];
}

/* ─ Community Person ─ */
export interface PersonInfo {
  id: string;
  name: string;
  role: string;
  emoji: string;
  concern: string;
  perspective: string;
  information: string;
  priority: string;
}

/* ─ Governance Network ─ */
export interface NetworkNode {
  id: string;
  label: string;
  emoji: string;
  activated: boolean;
  x: number;
  y: number;
}

export interface NetworkConnection {
  from: string;
  to: string;
  animated: boolean;
}

export interface NetworkState {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
}

/* ─ Project Tracking (Citizen Watch) ─ */
export interface ProjectStage {
  id: string;
  label: string;
  completed: boolean;
  hasIssue: boolean;
  detail: string;
}

export interface ProjectState {
  id: string;
  name: string;
  emoji: string;
  stages: ProjectStage[];
}

/* ─ Decision Record ─ */
export interface DecisionRecord {
  id: string;
  phase: GovernancePhase;
  description: string;
  choice: string;
  consequence: string;
  timestamp: number;
}

/* ─ Challenge Types (Discriminated Union) ─ */
interface ChallengeBase {
  id: string;
  phase: GovernancePhase;
  type: ChallengeType;
  title: string;
  prompt: string;
  difficulty: Difficulty;
  points: number;
  hint?: string;
  learningGoal: string;
  ibSkill?: string;
  tokenReward: TokenType;
}

export interface ExploreChallenge extends ChallengeBase {
  type: 'explore';
  location: LocationId;
  evidence: { id: string; text: string; emoji: string }[];
  question: string;
  options: { id: string; label: string; correct: boolean; feedback: string }[];
}

export interface ViewpointChallenge extends ChallengeBase {
  type: 'viewpoint';
  issue: string;
  viewpoints: { personId: string; name: string; role: string; emoji: string; perspective: string }[];
  questions: { question: string; options: { id: string; label: string; correct: boolean; feedback: string }[] }[];
}

export interface DiscussionChallenge extends ChallengeBase {
  type: 'discussion';
  issue: string;
  viewpoints: { name: string; emoji: string; position: string }[];
  priorities: { id: string; label: string; emoji: string; description: string }[];
  bestPriority: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface RoutingChallenge extends ChallengeBase {
  type: 'routing';
  issues: { id: string; label: string; emoji: string; description: string }[];
  destinations: { id: string; label: string; emoji: string }[];
  correctRouting: Record<string, string>;
  reasoningOptions: { issueId: string; options: { id: string; label: string; correct: boolean }[] }[];
}

export interface RepresentationChallenge extends ChallengeBase {
  type: 'representation';
  communityNeeds: { id: string; label: string; emoji: string; priority: 'high' | 'medium' | 'low' }[];
  representatives: { id: string; name: string; emoji: string; represents: string[] }[];
  minRepresentation: number;
}

export interface RolePlayChallenge extends ChallengeBase {
  type: 'rolePlay';
  scenario: string;
  role: { title: string; emoji: string; description: string };
  otherViewpoints: { name: string; emoji: string; position: string }[];
  actions: { id: string; label: string; isCompromise: boolean; consequence: string }[];
}

export interface ResourceChallenge extends ChallengeBase {
  type: 'resource';
  totalPoints: number;
  needs: { id: string; label: string; emoji: string; requested: number; minimum: number; description: string }[];
  feedbackFair: string;
  feedbackUnfair: string;
}

export interface SequencingChallenge extends ChallengeBase {
  type: 'sequencing';
  steps: { id: string; label: string; emoji: string }[];
  correctOrder: string[];
  explanation: string;
}

export interface CauseEffectChallenge extends ChallengeBase {
  type: 'causeEffect';
  scenario: string;
  decisions: { id: string; label: string; emoji: string }[];
  consequences: { decisionId: string; effect: string; isPositive: boolean; mapChange?: LocationId }[];
}

export interface CitizenReportChallenge extends ChallengeBase {
  type: 'citizenReport';
  project: string;
  checkpoints: { id: string; label: string; status: 'good' | 'issue' | 'unknown'; detail: string }[];
  correctIssues: string[];
  reportOptions: { category: string; affected: string; evidence: string; suggestion: string }[];
}

export interface AccountabilityChallenge extends ChallengeBase {
  type: 'accountability';
  timeline: { id: string; stage: string; emoji: string; detail: string; evidence: string; hasIssue: boolean }[];
  questions: { question: string; options: { id: string; label: string; correct: boolean }[] }[];
}

export interface ImpactChallenge extends ChallengeBase {
  type: 'impact';
  before: { area: string; emoji: string; status: string }[];
  after: { area: string; emoji: string; status: string }[];
  questions: { question: string; options: { id: string; label: string; correct: boolean; feedback: string }[] }[];
}

export interface ReflectionChallenge extends ChallengeBase {
  type: 'reflection';
  questions: { id: string; question: string; type: 'text' | 'choice'; options?: { id: string; label: string }[] }[];
}

export interface McqChallenge extends ChallengeBase {
  type: 'mcq';
  options: { id: string; label: string; correct: boolean; feedback: string }[];
}

export type Challenge =
  | ExploreChallenge
  | ViewpointChallenge
  | DiscussionChallenge
  | RoutingChallenge
  | RepresentationChallenge
  | RolePlayChallenge
  | ResourceChallenge
  | SequencingChallenge
  | CauseEffectChallenge
  | CitizenReportChallenge
  | AccountabilityChallenge
  | ImpactChallenge
  | ReflectionChallenge
  | McqChallenge;

/* ─ Team Info ─ */
export interface TeamInfo {
  name: string;
  subtitle: string;
}

/* ─ Game Settings ─ */
export interface GameSettings {
  timerEnabled: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  language: 'en' | 'hi';
}

/* ─ Phase Info ─ */
export interface PhaseInfo {
  id: GovernancePhase;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  bgColor: string;
  route: string;
}

/* ─ IB Skill Badge ─ */
export interface IbSkillBadge {
  skill: string;
  emoji: string;
  description: string;
}

/* ─ Full Game State ─ */
export interface GameState {
  mode: GameMode;
  currentTeam: TeamId;
  round: number;
  totalRounds: number;

  teams: Record<TeamId, TeamInfo>;
  scores: Record<TeamId, number>;
  tokens: Record<TeamId, TokenState>;

  phase: GovernancePhase;
  gamePhase: GamePhase;

  community: CommunityState;
  governanceNetwork: NetworkState;
  projectStates: ProjectState[];

  usedChallengeIds: string[];
  currentChallenge: Challenge | null;
  currentPhaseForChallenge: GovernancePhase | null;

  timer: number;
  maxTimer: number;
  hintUsed: boolean;

  settings: GameSettings;

  completedPhases: GovernancePhase[];
  exploredLocations: LocationId[];
  metPeople: string[];
  decisionsLog: DecisionRecord[];

  scoreAnimation: { team: TeamId; points: number } | null;
  ibSkillsEarned: IbSkillBadge[];
}

/* ─ Game Actions ─ */
export type GameAction =
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'SET_GOVERNANCE_PHASE'; phase: GovernancePhase }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'SET_TEAM_NAME'; team: TeamId; name: string; subtitle: string }
  | { type: 'NEXT_TURN' }
  | { type: 'ADD_SCORE'; team: TeamId; points: number }
  | { type: 'ADD_TOKEN'; team: TeamId; token: TokenType }
  | { type: 'UPDATE_LOCATION'; location: LocationId; state: LocationState }
  | { type: 'UPDATE_INDICATORS'; updates: Partial<CommunityIndicators> }
  | { type: 'UPDATE_RESOURCES'; delta: number }
  | { type: 'ADD_NETWORK_CONNECTION'; connection: NetworkConnection }
  | { type: 'ACTIVATE_NODE'; nodeId: string }
  | { type: 'SET_CHALLENGE'; challenge: Challenge; phase: GovernancePhase }
  | { type: 'CLEAR_CHALLENGE' }
  | { type: 'USE_CHALLENGE'; id: string }
  | { type: 'COMPLETE_PHASE'; phase: GovernancePhase }
  | { type: 'EXPLORE_LOCATION'; location: LocationId }
  | { type: 'MEET_PERSON'; personId: string }
  | { type: 'LOG_DECISION'; decision: DecisionRecord }
  | { type: 'UPDATE_PROJECT'; projectId: string; stageId: string; completed: boolean }
  | { type: 'SET_TIMER'; time: number }
  | { type: 'SET_MAX_TIMER'; time: number }
  | { type: 'USE_HINT' }
  | { type: 'CLEAR_HINT' }
  | { type: 'TOGGLE_SETTING'; setting: keyof GameSettings }
  | { type: 'SET_LANGUAGE'; language: 'en' | 'hi' }
  | { type: 'SET_SCORE_ANIMATION'; data: { team: TeamId; points: number } | null }
  | { type: 'EARN_IB_SKILL'; badge: IbSkillBadge }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_STATE'; state: Partial<GameState> };
