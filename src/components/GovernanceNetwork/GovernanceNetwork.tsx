import { useGame } from '../../state/gameStore';
import { getNetworkProgress } from '../../utils/networkEngine';
import './GovernanceNetwork.css';

export default function GovernanceNetwork() {
  const { state } = useGame();
  const { nodes, connections } = state.governanceNetwork;
  const progress = getNetworkProgress(state.governanceNetwork);

  return (
    <div className="governance-network" role="img" aria-label="Governance network diagram">
      <div className="governance-network__header">
        <h3>🔗 Governance Network</h3>
        <span className="governance-network__progress">{progress}% connected</span>
      </div>
      <svg className="governance-network__svg" viewBox="0 0 100 100">
        {/* Connections */}
        {connections.map((c, i) => {
          const from = nodes.find(n => n.id === c.from);
          const to = nodes.find(n => n.id === c.to);
          if (!from || !to) return null;
          return (
            <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke="var(--primary-lighter)" strokeWidth="1.5"
              strokeDasharray={c.animated ? '0' : '4,4'} opacity={c.animated ? 1 : 0.4}
              className={c.animated ? 'network-line--animated' : ''} />
          );
        })}
        {/* Nodes */}
        {nodes.map(n => (
          <g key={n.id} className={`network-node ${n.activated ? 'network-node--active' : ''}`}>
            <circle cx={n.x} cy={n.y} r={n.activated ? 7 : 5}
              fill={n.activated ? 'var(--primary-light)' : 'var(--border)'}
              stroke={n.activated ? 'var(--primary-lighter)' : 'var(--text-light)'}
              strokeWidth="1.5"
              className={n.activated ? 'network-circle--active' : ''} />
            <text x={n.x} y={n.y - 10} textAnchor="middle" fontSize="5" fill="var(--text)" fontWeight="700" fontFamily="var(--font-display)">
              {n.emoji}
            </text>
            <text x={n.x} y={n.y + 13} textAnchor="middle" fontSize="3.5" fill="var(--text-muted)" fontFamily="var(--font-body)">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
