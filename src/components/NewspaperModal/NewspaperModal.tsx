import React from 'react';
import type { GovernancePhase } from '../../types/game';
import './NewspaperModal.css';

interface NewspaperData {
  headline: string;
  subhead: string;
  badge: { title: string; emoji: string; desc: string };
  quote: { speaker: string; text: string; role: string };
  leadText: string;
  editionNo: number;
}

const NEWS_DATA: Record<GovernancePhase, NewspaperData> = {
  explore: {
    headline: 'CITIZEN INQUIRY DISCOVERS URGENT VILLAGE PRIORITIES',
    subhead: 'Student delegates complete comprehensive ground inspection across Sunderpur.',
    badge: { title: 'Master Village Surveyor', emoji: '🗺️', desc: 'Identified all critical community spots.' },
    quote: { speaker: 'Priya Sharma', role: 'School Teacher', text: 'For the first time, our waterlogged school pathway is front and center.' },
    leadText: 'Following an extensive ward-by-ward walk, citizen investigators documented issues at the primary school, community health center, and handpump stations. The findings pave the way for immediate Gram Sabha discussions.',
    editionNo: 101,
  },
  people: {
    headline: 'COMMUNITY VOICES HEARD ACROSS EVERY WARD',
    subhead: 'Farmers, teachers, and shopkeepers share unfiltered perspectives on village life.',
    badge: { title: 'Empathetic Listener', emoji: '🎙️', desc: 'Listened to diverse community perspectives.' },
    quote: { speaker: 'Rajesh Patel', role: 'Farmer', text: 'True grassroots democracy starts when the smallest farmer has an equal say.' },
    leadText: 'In an unprecedented listening exercise, representatives gathered viewpoints from diverse families. The report highlights balancing farm water needs with drinking supply for all homes.',
    editionNo: 102,
  },
  gramSabha: {
    headline: 'HISTORIC GRAM SABHA RATIFIES 5-YEAR ACTION PLAN',
    subhead: 'Record turnout under the sacred Banyan tree passes clean water & road resolutions.',
    badge: { title: 'Panchayat Consensus Builder', emoji: '⚖️', desc: 'Built democratic consensus in Gram Sabha.' },
    quote: { speaker: 'Sunita Devi', role: 'Sarpanch', text: 'When citizens deliberate respectfully, solutions emerge that no individual could find alone.' },
    leadText: 'All adult voters gathered today for open debate. After lively presentations, the assembly voted unanimously to approve the clean water pipeline and school drainage projects.',
    editionNo: 103,
  },
  decision: {
    headline: 'GOVERNANCE TIERS SYNCHRONIZED FOR FAIRNESS',
    subhead: 'Ward committees and Panchayat body align roles to ensure transparent decisions.',
    badge: { title: 'Civic Architect', emoji: '🏛️', desc: 'Mastered the 3 tiers of Panchayati Raj.' },
    quote: { speaker: 'Anil Kumar', role: 'Gram Sachiv', text: 'Clear rules and fair representation prevent bias and build public confidence.' },
    leadText: 'Democratic routing procedures were finalized this morning, establishing strict criteria for fund allocation so that remote wards receive equal developmental support.',
    editionNo: 104,
  },
  implement: {
    headline: 'CONSTRUCTION BEGINS: WATER & HEALTH PROJECTS UNDERWAY',
    subhead: 'Public tenders awarded transparently; village youth join supervision teams.',
    badge: { title: 'Action Champion', emoji: '⚡', desc: 'Turned resolutions into concrete results.' },
    quote: { speaker: 'Vikram', role: 'Youth Representative', text: 'Seeing clean water flow into our taps is proof that civic action delivers real change.' },
    leadText: 'Engineers broke ground today on the new filtration tank and reinforced school access road. Project timelines and daily expense logs are posted on the community board.',
    editionNo: 105,
  },
  monitor: {
    headline: 'SOCIAL AUDIT DECLARES 100% TRANSPARENCY',
    subhead: 'Citizen inspection team reviews ledgers and certifies public work standards.',
    badge: { title: 'Vigilant Citizen', emoji: '📋', desc: 'Guaranteed community accountability.' },
    quote: { speaker: 'Meera Bai', role: 'Self-Help Group Leader', text: 'Democracy is not just about voting—it is about following up and holding leaders accountable.' },
    leadText: 'A citizen-led Social Audit committee concluded its review of panchayat accounts. Every rupee was accounted for, establishing Sunderpur as an integrity benchmark.',
    editionNo: 106,
  },
  final: {
    headline: 'SUNDERPUR AWARDED MODEL PANCHAYAT STATUS!',
    subhead: 'Grassroots democracy model praised statewide for citizen inclusion and lasting impact.',
    badge: { title: 'Democracy Luminary', emoji: '🌟', desc: 'Completed the Democracy in Action journey!' },
    quote: { speaker: 'Entire Community', role: 'Gram Sabha', text: 'We didn’t just study democracy in our textbook; we lived it and transformed our home.' },
    leadText: 'State officials visited Sunderpur today to present the prestigious Model Grassroots Panchayat Award. The secret to success? Active citizens who listen, debate, decide, and act together.',
    editionNo: 107,
  },
};

interface NewspaperModalProps {
  phase: GovernancePhase;
  onClose: () => void;
}

export default function NewspaperModal({ phase, onClose }: NewspaperModalProps) {
  const news = NEWS_DATA[phase] || NEWS_DATA.explore;
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="newspaper-backdrop" role="dialog" aria-modal="true" aria-labelledby="news-headline">
      <div className="newspaper-card">
        {/* Newspaper Masthead */}
        <header className="newspaper-masthead">
          <div className="masthead-topline">
            <span>Special Village Edition</span>
            <span>Issue #{news.editionNo}</span>
            <span>Price: Free for Citizens</span>
          </div>
          <h1 className="masthead-title">The Sunderpur Gazette</h1>
          <div className="masthead-subtitle">शांति नगर एवं सुंदरपुर जन संदेश • Voice of Grassroots Democracy</div>
          <div className="masthead-dateline">
            <span>Sunderpur Panchayat, India</span>
            <span>{today}</span>
            <span>Certified Public Record</span>
          </div>
        </header>

        {/* Newspaper Content Body */}
        <div className="newspaper-body">
          <div className="news-banner">
            <span className="breaking-tag">BREAKING NEWS</span>
            <h2 id="news-headline" className="news-headline">{news.headline}</h2>
            <p className="news-subhead">{news.subhead}</p>
          </div>

          <div className="news-columns">
            {/* Left Column: Lead Story */}
            <article className="news-col news-col--lead">
              <p className="news-lead-text">{news.leadText}</p>
              <blockquote className="news-quote">
                “{news.quote.text}”
                <cite>— {news.quote.speaker}, <em>{news.quote.role}</em></cite>
              </blockquote>
            </article>

            {/* Right Column: Collectible Badge Honor */}
            <aside className="news-col news-col--side">
              <div className="unlocked-badge-card">
                <span className="badge-ribbon">🏆 HONOR UNLOCKED</span>
                <div className="badge-icon-wrap">
                  <span className="badge-emoji">{news.badge.emoji}</span>
                </div>
                <h3 className="badge-title">{news.badge.title}</h3>
                <p className="badge-desc">{news.badge.desc}</p>
              </div>

              <div className="civic-fact-box">
                <h4>📜 Civic Lesson</h4>
                <p>
                  Democratic self-governance relies on the <strong>Gram Sabha</strong>—where every citizen over 18 directly participates in decisions.
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="newspaper-footer">
          <button className="btn btn-primary btn-newspaper-action" onClick={onClose}>
            📰 Distribute Paper & Continue Quest →
          </button>
        </footer>
      </div>
    </div>
  );
}
