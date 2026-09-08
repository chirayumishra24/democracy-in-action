import { useState } from 'react';
import { useGame } from '../../state/gameStore';
import './CertificateModal.css';

interface CertificateModalProps {
  onClose: () => void;
}

export default function CertificateModal({ onClose }: CertificateModalProps) {
  const { state } = useGame();

  const defaultRecipient =
    state.mode === 'team'
      ? `${state.teams.A.name} & ${state.teams.B.name}`
      : state.teams.A.name || 'Dedicated Student Citizen';

  const [recipientName, setRecipientName] = useState(defaultRecipient);
  const [schoolName, setSchoolName] = useState('Kendriya Vidyalaya · Grade 6 Social Science');

  const totalScore = state.scores.A + (state.mode === 'team' ? state.scores.B : 0);
  const totalTokens =
    state.tokens.A.participation +
    state.tokens.A.decision +
    state.tokens.A.action +
    state.tokens.A.community;

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-backdrop" role="dialog" aria-modal="true" aria-labelledby="cert-title">
      <div className="certificate-modal">
        {/* Customization Bar */}
        <div className="certificate-inputs no-print">
          <div className="cert-input-group">
            <label htmlFor="student-name-input">Student / Team Name:</label>
            <input
              id="student-name-input"
              type="text"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder="Enter student or team name"
            />
          </div>
          <div className="cert-input-group">
            <label htmlFor="school-name-input">School / Class Section:</label>
            <input
              id="school-name-input"
              type="text"
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              placeholder="e.g. KV Sector 4, Class 6-B"
            />
          </div>
        </div>

        {/* Print / Close Control Bar */}
        <div className="certificate-controls no-print">
          <button className="btn btn-primary btn-print" onClick={handlePrint}>
            🖨️ Print / Save as PDF
          </button>
          <button className="btn btn-secondary btn-close-cert" onClick={onClose}>
            ✕ Close
          </button>
        </div>

        {/* The Printable Certificate */}
        <div className="certificate-document" id="printable-certificate">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              {/* Corner Ornaments */}
              <span className="cert-corner cert-corner--tl" />
              <span className="cert-corner cert-corner--tr" />
              <span className="cert-corner cert-corner--bl" />
              <span className="cert-corner cert-corner--br" />

              {/* Header Emblem */}
              <header className="cert-header">
                <div className="cert-emblem">🏛️</div>
                <div className="cert-authority">
                  <h3>GOVERNMENT OF GRASSROOTS DEMOCRACY</h3>
                  <h4>DEPARTMENT OF PANCHAYATI RAJ & CIVIC LEARNING</h4>
                  <div className="cert-motto">“People • Decisions • Real Change”</div>
                </div>
                <div className="cert-id-tag">
                  <span>CERT-PANCHAYAT-2026</span>
                  <span>VERIFIED RECORD</span>
                </div>
              </header>

              {/* Title */}
              <div className="cert-body">
                <p className="cert-intro">This is officially presented to</p>
                <h1 className="cert-recipient">{recipientName}</h1>
                {schoolName && <h3 className="cert-school-name">{schoolName}</h3>}
                <p className="cert-text">
                  in recognition of exemplary leadership, participatory inquiry, and democratic problem-solving in
                  the historic model village of <strong>Sunderpur</strong>.
                </p>

                <div className="cert-rank-banner">
                  <span className="rank-ribbon">HONORARY CIVIC TITLE</span>
                  <h2 className="rank-title">Youth Sarpanch & Democratic Delegate</h2>
                </div>

                <div className="cert-achievements">
                  <div className="achievement-pill">
                    <span className="achieve-val">🏆 {totalScore}</span>
                    <span className="achieve-label">Civic Points</span>
                  </div>
                  <div className="achievement-pill">
                    <span className="achieve-val">🪙 {totalTokens}</span>
                    <span className="achieve-label">Civic Tokens</span>
                  </div>
                  <div className="achievement-pill">
                    <span className="achieve-val">🗳️ Gram Sabha</span>
                    <span className="achieve-label">Unanimous Consensus</span>
                  </div>
                  <div className="achievement-pill">
                    <span className="achieve-val">🌟 100%</span>
                    <span className="achieve-label">Model Panchayat</span>
                  </div>
                </div>
              </div>

              {/* Signatures & Seal */}
              <footer className="cert-footer">
                <div className="cert-sig">
                  <div className="sig-line">Sunita Devi</div>
                  <strong>Sarpanch</strong>
                  <span>Gram Panchayat Sunderpur</span>
                </div>

                <div className="cert-seal">
                  <div className="seal-ring">
                    <span>★ OFFICIAL PANCHAYAT SEAL ★</span>
                    <strong>DEMOCRACY IN ACTION</strong>
                    <span>2026</span>
                  </div>
                </div>

                <div className="cert-sig">
                  <div className="sig-line">{today}</div>
                  <strong>Date of Ratification</strong>
                  <span>Skillizee Civic Education</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
