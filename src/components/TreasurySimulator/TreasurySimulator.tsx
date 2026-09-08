import './TreasurySimulator.css';

interface Need {
  id: string;
  label: string;
  emoji: string;
  minimum: number;
  requested: number;
}

interface TreasurySimulatorProps {
  totalPoints: number;
  needs: Need[];
  distribution: Record<string, number>;
  onDistChange: (needId: string, value: number) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function TreasurySimulator({
  totalPoints,
  needs,
  distribution,
  onDistChange,
  onSubmit,
  disabled,
}: TreasurySimulatorProps) {
  const currentTotal = Object.values(distribution).reduce((sum, v) => sum + (v || 0), 0);
  const remaining = totalPoints - currentTotal;
  const isOverBudget = currentTotal > totalPoints;
  const allMinimumsMet = needs.every(n => (distribution[n.id] || 0) >= n.minimum);

  // Format points as Panchayat Civic Funds (₹)
  const formatRupees = (points: number) => {
    const rupees = points * 25000;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(rupees);
  };

  return (
    <div className="treasury-simulator">
      {/* Treasury Header Vault */}
      <div className="treasury-vault">
        <div className="treasury-vault__info">
          <div className="treasury-vault__icon">🏛️</div>
          <div>
            <h4 className="treasury-vault__title">Sunderpur Panchayat Public Treasury</h4>
            <p className="treasury-vault__subtitle">Allot democratic funds fairly across all essential community needs</p>
          </div>
        </div>

        <div className="treasury-vault__stats">
          <div className="treasury-stat">
            <span className="treasury-stat__label">Total Fund</span>
            <strong className="treasury-stat__val">{totalPoints} pts ({formatRupees(totalPoints)})</strong>
          </div>
          <div className={`treasury-stat ${isOverBudget ? 'treasury-stat--danger' : 'treasury-stat--success'}`}>
            <span className="treasury-stat__label">Remaining</span>
            <strong className="treasury-stat__val">
              {remaining} pts {remaining >= 0 ? `(${formatRupees(remaining)})` : '⚠️ Deficit!'}
            </strong>
          </div>
        </div>
      </div>

      {/* Visual Budget Progress Bar */}
      <div className="treasury-bar-wrapper">
        <div className="treasury-bar-track">
          <div
            className={`treasury-bar-fill ${isOverBudget ? 'treasury-bar-fill--over' : ''}`}
            style={{ width: `${Math.min(100, (currentTotal / totalPoints) * 100)}%` }}
          />
        </div>
        <div className="treasury-bar-legend">
          <span>Allocated: {currentTotal} pts</span>
          <span>Max Limit: {totalPoints} pts</span>
        </div>
      </div>

      {/* Needs Allocation Cards */}
      <div className="treasury-needs-grid">
        {needs.map(n => {
          const currentVal = distribution[n.id] || 0;
          const meetsMin = currentVal >= n.minimum;
          const pctOfReq = Math.min(100, Math.round((currentVal / n.requested) * 100));

          return (
            <div key={n.id} className={`treasury-card ${meetsMin ? 'treasury-card--valid' : 'treasury-card--warning'}`}>
              <div className="treasury-card__top">
                <div className="treasury-card__identity">
                  <span className="treasury-card__emoji">{n.emoji}</span>
                  <div>
                    <h5 className="treasury-card__name">{n.label}</h5>
                    <span className="treasury-card__req">
                      Req: {n.requested} pts ({formatRupees(n.requested)}) · Min: {n.minimum} pts
                    </span>
                  </div>
                </div>
                <div className="treasury-card__amount">
                  <span className="amount-pts">{currentVal} pts</span>
                  <span className="amount-inr">{formatRupees(currentVal)}</span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="treasury-slider-row">
                <input
                  type="range"
                  min={0}
                  max={Math.max(n.requested + 2, 10)}
                  value={currentVal}
                  onChange={e => onDistChange(n.id, parseInt(e.target.value) || 0)}
                  disabled={disabled}
                  className="treasury-slider"
                />
              </div>

              {/* Real-time Citizen Reaction */}
              <div className="treasury-reaction">
                <div className="reaction-progress">
                  <div className="reaction-progress__bar" style={{ width: `${pctOfReq}%` }} />
                </div>
                <span className="reaction-feedback">
                  {meetsMin ? (
                    <span className="reaction-success">✅ Essential community minimum satisfied ({pctOfReq}% requested)</span>
                  ) : (
                    <span className="reaction-alert">⚠️ Below essential safety threshold ({currentVal}/{n.minimum} pts)</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Panel */}
      {!disabled && (
        <div className="treasury-actions">
          {isOverBudget ? (
            <div className="treasury-alert-box">
              ⚠️ Budget exceeded by {Math.abs(remaining)} points! Please rebalance allocations before submitting.
            </div>
          ) : !allMinimumsMet ? (
            <div className="treasury-alert-box treasury-alert-box--info">
              💡 Tip: Every sector needs at least its minimum points to ensure fair community development.
            </div>
          ) : (
            <div className="treasury-alert-box treasury-alert-box--success">
              ✅ Balanced allocation! All community sectors receive necessary funding.
            </div>
          )}

          <button
            className="btn btn-primary btn-large treasury-submit-btn"
            onClick={onSubmit}
            disabled={isOverBudget || currentTotal === 0}
          >
            🏛️ Ratify Budget in Gram Sabha →
          </button>
        </div>
      )}
    </div>
  );
}
