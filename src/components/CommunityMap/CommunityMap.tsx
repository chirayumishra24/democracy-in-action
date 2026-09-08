import { useGame } from '../../state/gameStore';
import { locations } from '../../data/communityData';
import type { LocationId } from '../../types/game';
import { getLocationStateLabel, getLocationStateColor } from '../../utils/progressEngine';
import './CommunityMap.css';

interface Props {
  onLocationClick?: (id: LocationId) => void;
  highlightLocations?: LocationId[];
  interactive?: boolean;
}

const mapPositions: Record<LocationId, { x: number; y: number }> = {
  homes: { x: 12, y: 30 },
  school: { x: 28, y: 18 },
  water: { x: 50, y: 12 },
  health: { x: 72, y: 18 },
  road: { x: 40, y: 45 },
  market: { x: 60, y: 42 },
  publicSpace: { x: 20, y: 60 },
  panchayatOffice: { x: 50, y: 55 },
  gramSabha: { x: 50, y: 75 },
  farms: { x: 85, y: 55 },
  transport: { x: 85, y: 30 },
};

export default function CommunityMap({ onLocationClick, highlightLocations, interactive = true }: Props) {
  const { state } = useGame();

  return (
    <div className="community-map" role="img" aria-label="Map of Sunderpur community">
      {/* Sky gradient */}
      <div className="community-map__sky" />

      {/* Ground */}
      <div className="community-map__ground" />

      {/* Roads */}
      <svg className="community-map__roads" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 12 30 Q 25 35 40 45" stroke="var(--map-road)" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3,2" />
        <path d="M 28 18 Q 35 30 40 45" stroke="var(--map-road)" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3,2" />
        <path d="M 40 45 L 60 42" stroke="var(--map-road)" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 50 55 L 50 75" stroke="var(--map-road)" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 40 45 Q 45 50 50 55" stroke="var(--map-road)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M 60 42 Q 72 48 85 55" stroke="var(--map-road)" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3,2" />
        <path d="M 72 18 Q 80 25 85 30" stroke="var(--map-road)" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3,2" />
        <path d="M 50 12 Q 50 30 50 55" stroke="var(--map-water)" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="2,3" />
      </svg>

      {/* Location markers */}
      {locations.map(loc => {
        const pos = mapPositions[loc.id];
        const locState = state.community.locations[loc.id];
        const isHighlighted = highlightLocations?.includes(loc.id);
        const isExplored = state.exploredLocations.includes(loc.id);

        return (
          <button
            key={loc.id}
            className={`map-marker ${isHighlighted ? 'map-marker--highlight' : ''} ${isExplored ? 'map-marker--explored' : ''} map-marker--${locState}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => interactive && onLocationClick?.(loc.id)}
            disabled={!interactive}
            title={`${loc.name}: ${getLocationStateLabel(locState)}`}
            aria-label={`${loc.name} — ${getLocationStateLabel(locState)}`}
          >
            <span className="map-marker__emoji">{loc.emoji}</span>
            <span className="map-marker__label">{loc.name}</span>
            <span className="map-marker__status" style={{ background: getLocationStateColor(locState) }} />
          </button>
        );
      })}

      {/* Title */}
      <div className="community-map__title">
        <span>🏘️</span> Sunderpur
      </div>
    </div>
  );
}
