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
  homes: { x: 13, y: 22 },
  school: { x: 28, y: 15 },
  publicSpace: { x: 16, y: 64 },
  road: { x: 33, y: 44 },
  water: { x: 49, y: 13 },
  panchayatOffice: { x: 50, y: 46 },
  market: { x: 67, y: 40 },
  gramSabha: { x: 47, y: 76 },
  health: { x: 74, y: 18 },
  transport: { x: 88, y: 26 },
  farms: { x: 84, y: 64 },
};

export default function CommunityMap({ onLocationClick, highlightLocations, interactive = true }: Props) {
  const { state } = useGame();

  return (
    <div className="community-map" role="img" aria-label="Map of Sunderpur community">

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
