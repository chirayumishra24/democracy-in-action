import { useState } from 'react';
import { useGame } from '../../state/gameStore';
import { getNetworkProgress } from '../../utils/networkEngine';
import './GovernanceNetwork.css';

interface NodeDetail {
  title: string;
  hindiTitle: string;
  stepNumber: number;
  stage: string;
  description: string;
  civicRole: string;
  ncertConcept: string;
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  people: {
    title: 'Citizens & Voters',
    hindiTitle: 'नागरिक एवं मतदाता',
    stepNumber: 1,
    stage: 'Grassroots Foundation',
    description: 'All adult residents (18+ years) living in the village who together constitute the Gram Sabha.',
    civicRole: 'Every citizen has equal voting power, the right to inspect public records, and the duty to participate.',
    ncertConcept: 'Universal Adult Franchise & Gram Sabha (NCERT Ch. 11)',
  },
  issue: {
    title: 'Community Needs',
    hindiTitle: 'सामुदायिक समस्याएं',
    stepNumber: 2,
    stage: 'Needs Discovery',
    description: 'Real village concerns such as drinking water scarcity, muddy unpaved roads, or closed medical clinics.',
    civicRole: 'Identified directly by residents through participatory walks rather than top-down government mandates.',
    ncertConcept: 'Local Needs Assessment (NCERT Ch. 10)',
  },
  participation: {
    title: 'Democratic Debate',
    hindiTitle: 'जन सहभागिता एवं संवाद',
    stepNumber: 3,
    stage: 'Civic Deliberation',
    description: 'Open public debate where small farmers, women, shopkeepers, and elders share diverse perspectives.',
    civicRole: 'Ensures that decisions reflect everyone’s needs, preventing decisions that benefit only the wealthy.',
    ncertConcept: 'Inclusive Participation (NCERT Ch. 11)',
  },
  governance: {
    title: 'Panchayati Raj Body',
    hindiTitle: 'ग्राम पंचायत एवं वार्ड समिति',
    stepNumber: 4,
    stage: 'Local Administration',
    description: 'Elected local self-government: Sarpanch (Panchayat Head), Ward Panchs, and the government-appointed Sachiv.',
    civicRole: 'Formulates village plans, receives public funds from government schemes, and manages daily administration.',
    ncertConcept: '3-Tier Panchayati Raj Architecture (NCERT Ch. 11)',
  },
  decision: {
    title: 'Gram Sabha Resolutions',
    hindiTitle: 'ग्राम सभा प्रस्ताव एवं अनुमोदन',
    stepNumber: 5,
    stage: 'Democratic Decision',
    description: 'Formal consensus decisions voted and ratified during full community meetings under the village tree.',
    civicRole: 'Legally authorizes fund spending and ratifies beneficiary lists (such as BPL housing and pensions).',
    ncertConcept: 'Gram Sabha Sovereignty (NCERT Ch. 11)',
  },
  implementation: {
    title: 'Public Action & Works',
    hindiTitle: 'योजना का क्रियान्वयन',
    stepNumber: 6,
    stage: 'Action & Execution',
    description: 'Transforming voted resolutions into physical reality: constructing water pipelines, paving roads, installing solar lights.',
    civicRole: 'Executes community works transparently, ensuring correct use of public budgets and quality materials.',
    ncertConcept: 'Executive Accountability (NCERT Ch. 12)',
  },
  outcome: {
    title: 'Tangible Community Impact',
    hindiTitle: 'सार्वजनिक कल्याण एवं परिणाम',
    stepNumber: 7,
    stage: 'Measurable Wellbeing',
    description: 'Direct improvement in health, safe drinking water access, high student school attendance, and night safety.',
    civicRole: 'Demonstrates how grassroots democracy delivers real, measurable change to everyday life.',
    ncertConcept: 'Public Welfare & Social Justice (NCERT Ch. 10)',
  },
  feedback: {
    title: 'Social Audit & Review',
    hindiTitle: 'सामाजिक अंकेक्षण एवं निगरानी',
    stepNumber: 8,
    stage: 'Accountability Cycle',
    description: 'Citizen vigilance: examining project expense books, inspecting construction quality, and checking muster rolls.',
    civicRole: 'Prevents corruption, holds leaders accountable, and channels new community needs into the next meeting.',
    ncertConcept: 'Social Audit & Continuous Democracy (NCERT Ch. 12)',
  },
};

// Symmetrically spaced coordinates for 8 nodes in a 240x240 viewBox
const NODE_COORDS: Record<string, { cx: number; cy: number; textPos: 'top' | 'bottom' | 'left' | 'right' }> = {
  people: { cx: 120, cy: 36, textPos: 'top' },
  issue: { cx: 178, cy: 60, textPos: 'right' },
  participation: { cx: 202, cy: 118, textPos: 'right' },
  governance: { cx: 178, cy: 176, textPos: 'right' },
  decision: { cx: 120, cy: 200, textPos: 'bottom' },
  implementation: { cx: 62, cy: 176, textPos: 'left' },
  outcome: { cx: 38, cy: 118, textPos: 'left' },
  feedback: { cx: 62, cy: 60, textPos: 'left' },
};

export default function GovernanceNetwork() {
  const { state } = useGame();
  const { nodes, connections } = state.governanceNetwork;
  const progress = getNetworkProgress(state.governanceNetwork);
  const lang = state.settings.language || 'en';
  const isHindi = lang === 'hi';

  // Default to first active or 'people'
  const activeNode = nodes.find(n => n.activated)?.id || 'people';
  const [selectedNodeId, setSelectedNodeId] = useState<string>(activeNode);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const detail = NODE_DETAILS[selectedNodeId] || NODE_DETAILS.people;
  const isSelectedActive = selectedNode?.activated ?? false;

  return (
    <div className="governance-network" role="region" aria-label="Governance network diagram and cycle details">
      {/* Header */}
      <div className="governance-network__header">
        <div>
          <h3>🔗 {isHindi ? 'लोकतांत्रिक शासन चक्र' : 'Governance Network'}</h3>
          <p className="governance-network__subtitle">
            {isHindi ? 'नागरिक आवाज़ से वास्तविक बदलाव तक का चक्र' : 'How citizen voices power democratic change'}
          </p>
        </div>
        <div className="governance-network__badge">
          <span className="network-progress-number">{progress}%</span>
          <span className="network-progress-label">{isHindi ? 'सक्रिय' : 'Connected'}</span>
        </div>
      </div>

      <div className="governance-network__body">
        {/* Interactive Circular Network Diagram */}
        <div className="network-canvas-wrapper">
        <svg className="governance-network__svg" viewBox="0 0 240 236">
          <defs>
            {/* Glow Filter for Active Nodes */}
            <filter id="nodeGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Background Outer Guide Orbit Ring */}
          <circle
            cx="120"
            cy="118"
            r="82"
            fill="none"
            stroke="var(--border-light)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.6"
          />

          {/* Connections / Energy Pulses */}
          {connections.map((c, i) => {
            const fromCoord = NODE_COORDS[c.from];
            const toCoord = NODE_COORDS[c.to];
            if (!fromCoord || !toCoord) return null;

            const fromNode = nodes.find(n => n.id === c.from);
            const toNode = nodes.find(n => n.id === c.to);
            const isLive = c.animated || (fromNode?.activated && toNode?.activated);

            return (
              <g key={i}>
                <line
                  x1={fromCoord.cx}
                  y1={fromCoord.cy}
                  x2={toCoord.cx}
                  y2={toCoord.cy}
                  stroke={isLive ? 'url(#activeLineGrad)' : 'var(--border)'}
                  strokeWidth={isLive ? '2.5' : '1.5'}
                  strokeDasharray={isLive ? '0' : '3,4'}
                  opacity={isLive ? 0.95 : 0.35}
                />
                {isLive && (
                  <line
                    x1={fromCoord.cx}
                    y1={fromCoord.cy}
                    x2={toCoord.cx}
                    y2={toCoord.cy}
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="6, 16"
                    className="network-pulse-flow"
                  />
                )}
              </g>
            );
          })}

          {/* Center Informational Hub */}
          <g className="network-center-hub" onClick={() => setSelectedNodeId('people')}>
            <circle
              cx="120"
              cy="118"
              r="34"
              fill="var(--surface)"
              stroke={progress > 0 ? '#10b981' : 'var(--border)'}
              strokeWidth="2"
              className="center-hub-circle"
            />
            <text x="120" y="110" textAnchor="middle" fontSize="15" className="center-hub-emoji">
              🏛️
            </text>
            <text x="120" y="126" textAnchor="middle" fontSize="8" fontWeight="800" fill="var(--primary)">
              {progress}% {isHindi ? 'सक्रिय' : 'LIVE'}
            </text>
            <text x="120" y="136" textAnchor="middle" fontSize="5.5" fill="var(--text-muted)" fontWeight="600">
              {isHindi ? 'लोकतंत्र चक्र' : 'DEMOCRACY CYCLE'}
            </text>
          </g>

          {/* 8 Symmetrical Interactive Nodes */}
          {nodes.map(n => {
            const coord = NODE_COORDS[n.id] || { cx: 120, cy: 120, textPos: 'bottom' };
            const isSelected = selectedNodeId === n.id;
            const isNodeActive = n.activated;

            return (
              <g
                key={n.id}
                className={`network-node-group ${isNodeActive ? 'network-node--active' : ''} ${isSelected ? 'network-node--selected' : ''}`}
                onClick={() => setSelectedNodeId(n.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Expanded Invisible Hit Target for Touch Screens & Smart Boards */}
                <circle
                  cx={coord.cx}
                  cy={coord.cy}
                  r="25"
                  fill="transparent"
                  className="smart-board-touch-target"
                />

                {/* Selection Halo Ring */}
                {isSelected && (
                  <circle
                    cx={coord.cx}
                    cy={coord.cy}
                    r="20"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    className="node-selection-ring"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={coord.cx}
                  cy={coord.cy}
                  r={isNodeActive ? 15 : 13}
                  fill={isNodeActive ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--surface)'}
                  stroke={isNodeActive ? '#10b981' : 'var(--border)'}
                  strokeWidth={isNodeActive ? '2.5' : '1.5'}
                  filter={isNodeActive ? 'url(#nodeGlowFilter)' : undefined}
                  className="network-node-circle"
                />

                {/* Centered Emoji Icon Inside Circle */}
                <text
                  x={coord.cx}
                  y={coord.cy + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={isNodeActive ? '13' : '11'}
                  className="network-node-emoji"
                >
                  {n.emoji}
                </text>

                {/* Node Label Outside Circle */}
                <text
                  x={coord.cx}
                  y={coord.textPos === 'top' ? coord.cy - 18 : coord.textPos === 'bottom' ? coord.cy + 22 : coord.cy + 3}
                  dx={coord.textPos === 'left' ? -18 : coord.textPos === 'right' ? 18 : 0}
                  textAnchor={coord.textPos === 'left' ? 'end' : coord.textPos === 'right' ? 'start' : 'middle'}
                  fontSize="7"
                  fontWeight={isSelected || isNodeActive ? '800' : '600'}
                  fill={isSelected ? 'var(--primary)' : isNodeActive ? 'var(--text)' : 'var(--text-muted)'}
                  className="network-node-label"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Rich Educational Description Card for the Selected Step */}
      <div className="node-detail-card">
        <div className="node-detail-card__header">
          <div className="node-detail-card__step-badge">
            Step {detail.stepNumber} of 8 · {detail.stage}
          </div>
          <span className={`node-status-pill ${isSelectedActive ? 'node-status-pill--active' : 'node-status-pill--pending'}`}>
            {isSelectedActive ? '✅ Active in Village' : '⏳ Next Milestone'}
          </span>
        </div>

        <h4 className="node-detail-card__title">
          {selectedNode.emoji} {isHindi ? detail.hindiTitle : detail.title}
        </h4>

        <p className="node-detail-card__desc">{detail.description}</p>

        <div className="node-detail-card__role">
          <strong>🏛️ Democratic Function:</strong> {detail.civicRole}
        </div>

        <div className="node-detail-card__footer">
          <span className="ncert-tag">📚 {detail.ncertConcept}</span>
          <span className="interactive-hint">💡 {isHindi ? 'किसी भी नोड पर टैप करें' : 'Tap any node on the left or quick-steps below'}</span>
        </div>

        {/* Quick-Step Interactive Bar */}
        <div className="node-step-switcher" role="tablist" aria-label="Quick jump to step">
          {nodes.map(n => {
            const d = NODE_DETAILS[n.id];
            const isCur = selectedNodeId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                role="tab"
                aria-selected={isCur}
                className={`node-step-chip ${isCur ? 'node-step-chip--active' : ''} ${n.activated ? 'node-step-chip--live' : ''}`}
                onClick={() => setSelectedNodeId(n.id)}
                title={`${d?.stepNumber}. ${n.label}`}
              >
                <span className="node-step-chip__num">{d?.stepNumber}</span>
                <span className="node-step-chip__emoji">{n.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
