import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type {
  GameState, GameAction, TokenState, CommunityState,
  LocationId, LocationState, CommunityIndicators, NetworkState,
  NetworkNode, GovernancePhase, GameSettings,
} from '../types/game';

/* ─ Defaults ─ */
const emptyTokens: TokenState = { participation: 0, decision: 0, action: 0, community: 0 };

const defaultLocations: Record<LocationId, LocationState> = {
  homes: 'problem', school: 'problem', water: 'problem', health: 'problem',
  road: 'problem', market: 'problem', publicSpace: 'problem',
  panchayatOffice: 'problem', gramSabha: 'problem', farms: 'problem', transport: 'problem',
};

const defaultIndicators: CommunityIndicators = {
  participation: 20, decisionQuality: 15, implementation: 10,
  publicService: 15, accountability: 10, communityWellbeing: 20,
};

const defaultNetworkNodes: NetworkNode[] = [
  { id: 'people', label: 'People', emoji: '👥', activated: false, x: 50, y: 8 },
  { id: 'issue', label: 'Issue', emoji: '⚠️', activated: false, x: 85, y: 20 },
  { id: 'participation', label: 'Participation', emoji: '🗣️', activated: false, x: 92, y: 45 },
  { id: 'governance', label: 'Governance', emoji: '🏛️', activated: false, x: 85, y: 70 },
  { id: 'decision', label: 'Decision', emoji: '✅', activated: false, x: 50, y: 85 },
  { id: 'implementation', label: 'Implementation', emoji: '🔧', activated: false, x: 15, y: 70 },
  { id: 'outcome', label: 'Outcome', emoji: '🌟', activated: false, x: 8, y: 45 },
  { id: 'feedback', label: 'Feedback', emoji: '🔄', activated: false, x: 15, y: 20 },
];

const defaultCommunity: CommunityState = {
  locations: { ...defaultLocations },
  resources: 100,
  indicators: { ...defaultIndicators },
};

const defaultNetwork: NetworkState = {
  nodes: defaultNetworkNodes.map(n => ({ ...n })),
  connections: [],
};

const initialState: GameState = {
  mode: 'team',
  currentTeam: 'A',
  round: 1,
  totalRounds: 12,
  teams: {
    A: { name: "People's Voice", subtitle: 'Team A' },
    B: { name: 'Community Action', subtitle: 'Team B' },
  },
  scores: { A: 0, B: 0 },
  tokens: { A: { ...emptyTokens }, B: { ...emptyTokens } },
  phase: 'explore',
  gamePhase: 'intro',
  community: { ...defaultCommunity },
  governanceNetwork: { ...defaultNetwork },
  projectStates: [
    {
      id: 'water-project',
      name: 'Community Water Facility',
      emoji: '💧',
      stages: [
        { id: 'planned', label: 'Was the project planned?', completed: false, hasIssue: false, detail: 'A plan was created after community discussion.' },
        { id: 'started', label: 'Was implementation started?', completed: false, hasIssue: false, detail: 'Construction materials were arranged.' },
        { id: 'completed', label: 'Was the work completed?', completed: false, hasIssue: false, detail: 'The facility structure has been built.' },
        { id: 'benefiting', label: 'Is the community benefiting?', completed: false, hasIssue: true, detail: 'Access is still difficult for some community members.' },
      ],
    },
  ],
  usedChallengeIds: [],
  currentChallenge: null,
  currentPhaseForChallenge: null,
  timer: 45,
  maxTimer: 45,
  hintUsed: false,
  settings: { timerEnabled: true, soundEnabled: true, animationsEnabled: true },
  completedPhases: [],
  exploredLocations: [],
  metPeople: [],
  decisionsLog: [],
  scoreAnimation: null,
  ibSkillsEarned: [],
};

/* ─ Helpers ─ */
function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }

/* ─ Reducer ─ */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, gamePhase: action.phase };

    case 'SET_GOVERNANCE_PHASE':
      return { ...state, phase: action.phase, gamePhase: action.phase };

    case 'SET_MODE':
      return { ...state, mode: action.mode };

    case 'SET_TEAM_NAME':
      return { ...state, teams: { ...state.teams, [action.team]: { ...state.teams[action.team], name: action.name, subtitle: action.subtitle } } };

    case 'NEXT_TURN':
      return {
        ...state,
        currentTeam: state.mode === 'individual' ? 'A' : (state.currentTeam === 'A' ? 'B' : 'A'),
        round: state.round + 1,
        hintUsed: false,
      };

    case 'ADD_SCORE': {
      return { ...state, scores: { ...state.scores, [action.team]: state.scores[action.team] + action.points } };
    }

    case 'ADD_TOKEN': {
      const t = state.tokens[action.team];
      return { ...state, tokens: { ...state.tokens, [action.team]: { ...t, [action.token]: t[action.token] + 1 } } };
    }

    case 'UPDATE_LOCATION':
      return { ...state, community: { ...state.community, locations: { ...state.community.locations, [action.location]: action.state } } };

    case 'UPDATE_INDICATORS': {
      const ind = { ...state.community.indicators };
      for (const [k, v] of Object.entries(action.updates)) {
        ind[k as keyof CommunityIndicators] = clamp((ind[k as keyof CommunityIndicators] || 0) + (v as number), 0, 100);
      }
      return { ...state, community: { ...state.community, indicators: ind } };
    }

    case 'UPDATE_RESOURCES':
      return { ...state, community: { ...state.community, resources: clamp(state.community.resources + action.delta, 0, 100) } };

    case 'ADD_NETWORK_CONNECTION': {
      const exists = state.governanceNetwork.connections.some(
        c => c.from === action.connection.from && c.to === action.connection.to
      );
      if (exists) return state;
      return { ...state, governanceNetwork: { ...state.governanceNetwork, connections: [...state.governanceNetwork.connections, action.connection] } };
    }

    case 'ACTIVATE_NODE':
      return {
        ...state,
        governanceNetwork: {
          ...state.governanceNetwork,
          nodes: state.governanceNetwork.nodes.map(n => n.id === action.nodeId ? { ...n, activated: true } : n),
        },
      };

    case 'SET_CHALLENGE':
      return { ...state, currentChallenge: action.challenge, currentPhaseForChallenge: action.phase, gamePhase: action.phase };

    case 'CLEAR_CHALLENGE':
      return { ...state, currentChallenge: null, currentPhaseForChallenge: null };

    case 'USE_CHALLENGE':
      return { ...state, usedChallengeIds: [...state.usedChallengeIds, action.id] };

    case 'COMPLETE_PHASE':
      return { ...state, completedPhases: [...new Set([...state.completedPhases, action.phase])] };

    case 'EXPLORE_LOCATION':
      return { ...state, exploredLocations: [...new Set([...state.exploredLocations, action.location])] };

    case 'MEET_PERSON':
      return { ...state, metPeople: [...new Set([...state.metPeople, action.personId])] };

    case 'LOG_DECISION':
      return { ...state, decisionsLog: [...state.decisionsLog, action.decision] };

    case 'UPDATE_PROJECT': {
      return {
        ...state,
        projectStates: state.projectStates.map(p =>
          p.id === action.projectId
            ? { ...p, stages: p.stages.map(s => s.id === action.stageId ? { ...s, completed: action.completed } : s) }
            : p
        ),
      };
    }

    case 'SET_TIMER':
      return { ...state, timer: action.time };

    case 'SET_MAX_TIMER':
      return { ...state, maxTimer: action.time };

    case 'USE_HINT':
      return { ...state, hintUsed: true };

    case 'CLEAR_HINT':
      return { ...state, hintUsed: false };

    case 'TOGGLE_SETTING':
      return { ...state, settings: { ...state.settings, [action.setting]: !state.settings[action.setting] } as GameSettings };

    case 'SET_SCORE_ANIMATION':
      return { ...state, scoreAnimation: action.data };

    case 'EARN_IB_SKILL': {
      const exists = state.ibSkillsEarned.some(s => s.skill === action.badge.skill);
      if (exists) return state;
      return { ...state, ibSkillsEarned: [...state.ibSkillsEarned, action.badge] };
    }

    case 'RESET_GAME':
      return { ...initialState, settings: state.settings };

    case 'LOAD_STATE':
      return { ...state, ...action.state };

    default:
      return state;
  }
}

/* ─ Context ─ */
const STORAGE_KEY = 'democracyInAction';

const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<GameAction> } | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed, currentChallenge: null, scoreAnimation: null };
      }
    } catch { /* ignore */ }
    return init;
  });

  useEffect(() => {
    const { currentChallenge: _c, scoreAnimation: _s, ...toSave } = state;
    void _c; void _s;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
