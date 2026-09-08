import { playSound } from '../../utils/audio';
import { useGame } from '../../state/gameStore';
import './InstructionsModal.css';

interface InstructionsModalProps {
  onClose: () => void;
}

export default function InstructionsModal({ onClose }: InstructionsModalProps) {
  const { state } = useGame();

  const handleClose = () => {
    playSound('click', state.settings.soundEnabled);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="instructions-title">
      <div className="instructions-modal" onClick={e => e.stopPropagation()}>
        <div className="instructions-modal__header">
          <div className="instructions-modal__title-group">
            <span className="instructions-modal__icon">📖</span>
            <h2 id="instructions-title">How to Play — Democracy in Action</h2>
          </div>
          <button className="instructions-modal__close-btn" onClick={handleClose} aria-label="Close instructions">
            ✕
          </button>
        </div>

        <div className="instructions-modal__body">
          <div className="instructions-card intro-banner">
            <p className="intro-banner__text">
              Welcome to <strong>Sunderpur</strong>! As a civic leader, your mission is to guide the community through 
              real democratic processes: discovering local needs, deliberating in the Gram Sabha, allocating budgets, 
              and holding local government accountable.
            </p>
          </div>

          <div className="instructions-section">
            <h3 className="section-title">🏛️ The 7 Democratic Phases</h3>
            <div className="phase-guide-grid">
              <div className="phase-guide-item">
                <span className="phase-num">1</span>
                <div>
                  <strong>Explore Sunderpur</strong>
                  <p>Click locations across the village to uncover community issues.</p>
                </div>
              </div>
              <div className="phase-guide-item">
                <span className="phase-num">2</span>
                <div>
                  <strong>Meet the People</strong>
                  <p>Listen to diverse citizens (farmers, youth, women, elders).</p>
                </div>
              </div>
              <div className="phase-guide-item">
                <span className="phase-num">3</span>
                <div>
                  <strong>Gram Sabha Deliberation</strong>
                  <p>Prioritize resolutions through discussion and consensus.</p>
                </div>
              </div>
              <div className="phase-guide-item">
                <span className="phase-num">4</span>
                <div>
                  <strong>Governance Decisions</strong>
                  <p>Route issues to Gram Panchayat, Ward Council, or Municipal level.</p>
                </div>
              </div>
              <div className="phase-guide-item">
                <span className="phase-num">5</span>
                <div>
                  <strong>Plan & Implement</strong>
                  <p>Sequence project timelines and allocate fair public budgets.</p>
                </div>
              </div>
              <div className="phase-guide-item">
                <span className="phase-num">6</span>
                <div>
                  <strong>Monitor & Social Audit</strong>
                  <p>Inspect works, check invoices, and verify public satisfaction.</p>
                </div>
              </div>
              <div className="phase-guide-item">
                <span className="phase-num">7</span>
                <div>
                  <strong>Final Impact Review</strong>
                  <p>Assess governance growth and celebrate community transformation!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="instructions-section">
            <h3 className="section-title">⚖️ Key Democratic Concepts</h3>
            <div className="concept-grid">
              <div className="concept-box">
                <h4>Gram Sabha</h4>
                <p>Every registered voter (18+) in the village. Reviews budgets and checks the Panchayat.</p>
              </div>
              <div className="concept-box">
                <h4>Gram Panchayat</h4>
                <p>Elected executive representatives (Ward Members + Sarpanch) serving for 5 years.</p>
              </div>
              <div className="concept-box">
                <h4>Social Audit</h4>
                <p>A democratic audit by citizens to ensure transparent and corruption-free spending.</p>
              </div>
            </div>
          </div>

          <div className="instructions-section">
            <h3 className="section-title">⌨️ Controls & Accessibility</h3>
            <ul className="controls-list">
              <li><strong>Tab / Shift+Tab</strong>: Navigate between interactive elements</li>
              <li><strong>Enter / Space</strong>: Select options and submit decisions</li>
              <li><strong>⚙️ Settings</strong>: Toggle sound, high contrast mode, and timer options</li>
            </ul>
          </div>
        </div>

        <div className="instructions-modal__footer">
          <button className="btn btn-primary" onClick={handleClose}>
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
}
