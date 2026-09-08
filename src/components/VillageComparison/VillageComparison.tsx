import React, { useState, useRef, useCallback } from 'react';
import './VillageComparison.css';

export default function VillageComparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <div className="village-comparison">
      <div className="village-comparison__header">
        <div>
          <span className="comparison-badge">🌱 The Power of Grassroots Democracy</span>
          <h3 className="comparison-title">Sunderpur: Before vs After</h3>
          <p className="comparison-subtitle">
            Drag the slider to see how Gram Sabha decisions directly transformed your village!
          </p>
        </div>
        <div className="comparison-presets">
          <button
            type="button"
            className={`preset-btn ${sliderPos === 100 ? 'preset-btn--active' : ''}`}
            onClick={() => setSliderPos(100)}
          >
            Before
          </button>
          <button
            type="button"
            className={`preset-btn ${sliderPos === 50 ? 'preset-btn--active' : ''}`}
            onClick={() => setSliderPos(50)}
          >
            Split 50/50
          </button>
          <button
            type="button"
            className={`preset-btn ${sliderPos === 0 ? 'preset-btn--active' : ''}`}
            onClick={() => setSliderPos(0)}
          >
            After ✨
          </button>
        </div>
      </div>

      {/* Split Viewer Container */}
      <div
        ref={containerRef}
        className="comparison-viewer"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Background / After Image (revealed on the right) */}
        <img
          src="/images/sunderpur-after.jpg"
          alt="Sunderpur Village After Panchayat Development"
          className="comparison-img comparison-img--after"
        />
        <div className="comparison-label comparison-label--after">
          ✨ AFTER: Democratic Action & Solutions
        </div>

        {/* Clipped / Before Image (revealed on the left) */}
        <div
          className="comparison-clipper"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src="/images/sunderpur-before.jpg"
            alt="Sunderpur Village Before Panchayat Action"
            className="comparison-img comparison-img--before"
          />
          <div className="comparison-label comparison-label--before">
            🌧️ BEFORE: Waterlogging & Disrepair
          </div>
        </div>

        {/* Interactive Handle Line */}
        <div
          className="comparison-handle"
          style={{ left: `${sliderPos}%` }}
          aria-label="Drag to compare before and after"
        >
          <div className="comparison-handle__line" />
          <div className="comparison-handle__circle">
            <span>‹ ›</span>
          </div>
        </div>
      </div>

      {/* Impact Indicators */}
      <div className="comparison-impact-grid">
        <div className="impact-chip impact-chip--water">
          <span className="impact-chip__icon">💧</span>
          <div>
            <strong>Clean Solar Water Tank</strong>
            <p>100% daily clean drinking supply</p>
          </div>
        </div>
        <div className="impact-chip impact-chip--road">
          <span className="impact-chip__icon">🧱</span>
          <div>
            <strong>All-Weather Paved Road</strong>
            <p>Zero school monsoon waterlogging</p>
          </div>
        </div>
        <div className="impact-chip impact-chip--solar">
          <span className="impact-chip__icon">☀️</span>
          <div>
            <strong>Solar Street Lighting</strong>
            <p>Safe night travel for children & women</p>
          </div>
        </div>
        <div className="impact-chip impact-chip--school">
          <span className="impact-chip__icon">🏫</span>
          <div>
            <strong>Primary School Upgrades</strong>
            <p>98% regular student attendance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
