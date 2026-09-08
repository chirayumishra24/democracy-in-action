import { useState } from 'react';
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

const locationResidents: Record<LocationId, { resident: string; role: string; hint: string }> = {
  school: { resident: 'Priya', role: 'Teacher', hint: 'Monsoon mud blocks school access for 120 kids.' },
  water: { resident: 'Sunita', role: 'Sarpanch', hint: 'Tanker schedule & irregular well supply.' },
  health: { resident: 'Lakshmi', role: 'Elder', hint: 'Health post lacks emergency medical supplies.' },
  road: { resident: 'Vikram', role: 'Shopkeeper', hint: 'Potholed access cuts off trade connectivity.' },
  market: { resident: 'Anita', role: 'Market Vendor', hint: 'Waterlogging ruins fresh vegetables in rains.' },
  publicSpace: { resident: 'Ravi', role: 'Youth Leader', hint: 'Park needs clean lighting and play equipment.' },
  panchayatOffice: { resident: 'Sunita', role: 'Sarpanch', hint: 'Public budget records & citizen register.' },
  gramSabha: { resident: 'Gram Sabha', role: 'Voters Assembly', hint: 'All 18+ villagers decide community priorities.' },
  homes: { resident: 'Meera', role: 'Resident', hint: 'Sanitation & domestic tap water challenges.' },
  farms: { resident: 'Arjun', role: 'Farmer', hint: 'Canal irrigation water rotation disputes.' },
  transport: { resident: 'Mohan', role: 'Bus Driver', hint: 'Only 2 daily buses to town hospital.' },
};

export default function CommunityMap({ onLocationClick, highlightLocations, interactive = true }: Props) {
  const { state } = useGame();
  const [hoveredLoc, setHoveredLoc] = useState<LocationId | null>(null);

  const activeHover = hoveredLoc ? locations.find(l => l.id === hoveredLoc) : null;
  const activeResident = hoveredLoc ? locationResidents[hoveredLoc] : null;
  const activePos = hoveredLoc ? mapPositions[hoveredLoc] : null;

  return (
    <div className="community-map" role="img" aria-label="Map of Sunderpur community">
      {/* Ambient life overlay */}
      <svg className="map-ambient-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Animated birds flock */}
        <g className="ambient-birds">
          <path d="M 15 12 Q 17 10 19 12 Q 21 10 23 12" stroke="rgba(30, 41, 59, 0.45)" strokeWidth="0.6" fill="none" />
          <path d="M 22 15 Q 23.5 13.5 25 15 Q 26.5 13.5 28 15" stroke="rgba(30, 41, 59, 0.35)" strokeWidth="0.5" fill="none" />
          <path d="M 18 17 Q 19.5 15.5 21 17 Q 22.5 15.5 24 17" stroke="rgba(30, 41, 59, 0.35)" strokeWidth="0.5" fill="none" />
        </g>
        {/* Subtle water ripples along river */}
        <g className="ambient-river">
          <ellipse cx="44" cy="30" rx="3" ry="0.6" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.4" fill="none" />
          <ellipse cx="58" cy="48" rx="4" ry="0.7" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.4" fill="none" />
          <ellipse cx="63" cy="65" rx="3.5" ry="0.6" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.4" fill="none" />
        </g>
      </svg>

      {/* Location markers */}
      {locations.map(loc => {
        const pos = mapPositions[loc.id];
        const locState = state.community.locations[loc.id];
        const isHighlighted = highlightLocations?.includes(loc.id);
        const isExplored = state.exploredLocations.includes(loc.id);

        return (
          <div
            key={loc.id}
            className="map-marker-anchor"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {/* Radar Pulse for unexplored locations */}
            {!isExplored && interactive && (
              <span className="radar-pulse-ring" aria-hidden="true" />
            )}

            <button
              className={`map-marker ${isHighlighted ? 'map-marker--highlight' : ''} ${isExplored ? 'map-marker--explored' : ''} map-marker--${locState}`}
              onClick={() => interactive && onLocationClick?.(loc.id)}
              onMouseEnter={() => setHoveredLoc(loc.id)}
              onMouseLeave={() => setHoveredLoc(prev => prev === loc.id ? null : prev)}
              onFocus={() => setHoveredLoc(loc.id)}
              onBlur={() => setHoveredLoc(prev => prev === loc.id ? null : prev)}
              disabled={!interactive}
              title={`${loc.name}: ${getLocationStateLabel(locState)}`}
              aria-label={`${loc.name} — ${getLocationStateLabel(locState)}`}
            >
              <span className="map-marker__emoji">{loc.emoji}</span>
              <span className="map-marker__label">{loc.name}</span>
              <span className="map-marker__status" style={{ background: getLocationStateColor(locState) }} />
            </button>
          </div>
        );
      })}

      {/* Interactive Hover Preview Card */}
      {activeHover && activeResident && activePos && (
        <div
          className="map-preview-card"
          style={{
            left: `${Math.min(Math.max(activePos.x, 18), 82)}%`,
            top: activePos.y > 60 ? `${activePos.y - 12}%` : `${activePos.y + 10}%`,
          }}
        >
          <div className="map-preview-card__header">
            <span className="map-preview-card__title">
              {activeHover.emoji} {activeHover.name}
            </span>
            <span
              className="map-preview-card__badge"
              style={{
                background: `${getLocationStateColor(state.community.locations[activeHover.id])}20`,
                color: getLocationStateColor(state.community.locations[activeHover.id]),
              }}
            >
              {getLocationStateLabel(state.community.locations[activeHover.id])}
            </span>
          </div>
          <div className="map-preview-card__resident">
            <span className="resident-avatar">👤</span>
            <div>
              <strong>{activeResident.resident}</strong>
              <span className="resident-role"> · {activeResident.role}</span>
            </div>
          </div>
          <p className="map-preview-card__hint">{activeResident.hint}</p>
          <span className="map-preview-card__cta">👉 Click to investigate</span>
        </div>
      )}

      {/* Map watermark Title */}
      <div className="community-map__title">
        <span>🏘️</span> Sunderpur
      </div>
    </div>
  );
}
