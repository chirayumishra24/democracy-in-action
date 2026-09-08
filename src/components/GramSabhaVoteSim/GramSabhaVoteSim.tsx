import { useState } from 'react';
import { playSound } from '../../utils/audio';
import { useGame } from '../../state/gameStore';
import './GramSabhaVoteSim.css';

interface Villager {
  id: number;
  name: string;
  role: string;
  emoji: string;
  defaultVote: 'for' | 'against' | 'abstain';
  reason: string;
}

const VILLAGERS: Villager[] = [
  { id: 1, name: 'Ram Singh', role: 'Elder & Farmer', emoji: '👴🏽', defaultVote: 'for', reason: 'Our crops failed twice due to water shortage. Check-dams are vital.' },
  { id: 2, name: 'Savitri Devi', role: 'Anganwadi Worker', emoji: '👩🏽', defaultVote: 'for', reason: 'Clean water protects children from monsoon infections.' },
  { id: 3, name: 'Harish Patel', role: 'Wheat Farmer', emoji: '👨🏽‍🌾', defaultVote: 'for', reason: 'Borewells dry out our aquifers. Rainwater recharge is sustainable.' },
  { id: 4, name: 'Meena Bai', role: 'Self Help Group Lead', emoji: '🧕🏽', defaultVote: 'for', reason: 'Women walk 3 km daily for water. This project brings relief.' },
  { id: 5, name: 'Deepa Sharma', role: 'Primary Teacher', emoji: '👩🏽‍🏫', defaultVote: 'for', reason: 'School attendance drops when girls carry water. Check-dams help education!' },
  { id: 6, name: 'Ramesh Kumar', role: 'Shopkeeper', emoji: '👨🏽‍💼', defaultVote: 'against', reason: 'Road repairs should be done first before spending on dams.' },
  { id: 7, name: 'Priya Verma', role: 'Youth Representative', emoji: '👩🏽‍🎓', defaultVote: 'for', reason: 'Direct democracy means we build what saves the next generation.' },
  { id: 8, name: 'Jagdish Kumhar', role: 'Village Potter', emoji: '👨🏽‍🎨', defaultVote: 'for', reason: 'Clay work requires steady local pond water throughout the year.' },
  { id: 9, name: 'Anil Yadav', role: 'Dairy Farmer', emoji: '👨🏽‍🌾', defaultVote: 'for', reason: 'Our cattle need watering ponds in summer.' },
  { id: 10, name: 'Kanta Bai', role: 'Health Volunteer', emoji: '👩🏽‍⚕️', defaultVote: 'for', reason: 'Sanitation and clean wells prevent malaria and cholera.' },
  { id: 11, name: 'Mohan Lal', role: 'Carpenter', emoji: '👨🏽‍🔧', defaultVote: 'against', reason: 'I worry the budget might run short if contractors delay.' },
  { id: 12, name: 'Sunita Devi', role: 'Handloom Weaver', emoji: '🧕🏽', defaultVote: 'for', reason: 'Stable water means steady village economy and fewer migrations.' },
  { id: 13, name: 'Baldev Singh', role: 'Panchayat Ward Member', emoji: '👳🏽', defaultVote: 'for', reason: 'As Ward Panch, I support this consensus from Ward No. 3.' },
  { id: 14, name: 'Sarita Rawat', role: 'College Student', emoji: '👩🏽‍💻', defaultVote: 'for', reason: 'NCERT teaches us that Gram Sabha holds the Panchayat accountable.' },
  { id: 15, name: 'Gopal Soni', role: 'Goldsmith', emoji: '👨🏽', defaultVote: 'abstain', reason: 'I want to see the detailed cost breakdown before deciding.' },
  { id: 16, name: 'Rehana Begum', role: 'Tailoring Trainer', emoji: '🧕🏽', defaultVote: 'for', reason: 'Equal distribution of check-dams ensures every mohalla benefits.' },
  { id: 17, name: 'Dinesh Prasad', role: 'Tractor Mechanic', emoji: '👨🏽‍🔧', defaultVote: 'for', reason: 'Healthy water table means richer harvest and more machinery work.' },
  { id: 18, name: 'Kamla Bai', role: 'Midday Meal Cook', emoji: '👩🏽‍🍳', defaultVote: 'for', reason: 'Kitchen needs clean, tested water for 150 school children daily.' },
  { id: 19, name: 'Suraj Bhan', role: 'Poultry Owner', emoji: '👨🏽', defaultVote: 'against', reason: 'Dams might take up grazing land near the eastern ridge.' },
  { id: 20, name: 'Geeta Kumari', role: 'Sports Coach', emoji: '👩🏽‍🏫', defaultVote: 'for', reason: 'Village playground will stay green if groundwater is replenished.' },
  { id: 21, name: 'Vikram Das', role: 'Electrician', emoji: '👨🏽‍🏭', defaultVote: 'for', reason: 'Panchayat solar pumps work best when water levels are high.' },
  { id: 22, name: 'Santosh Devi', role: 'Kisan Credit Member', emoji: '👵🏽', defaultVote: 'for', reason: 'Drought protection saves small farmers from high-interest debt.' },
  { id: 23, name: 'Arun Mehra', role: 'Postman', emoji: '👨🏽‍💼', defaultVote: 'for', reason: 'Villagers united in Gram Sabha always build stronger communities.' },
  { id: 24, name: 'Chanda Bai', role: 'Folk Singer & Elder', emoji: '👵🏽', defaultVote: 'for', reason: 'Our songs celebrate rivers and rains; let us build check-dams!' },
];

interface Resolution {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  proposedBy: string;
  estimatedCost: string;
}

const RESOLUTIONS: Resolution[] = [
  {
    id: 'res-water',
    title: 'Resolution 1: Community Rainwater Harvesting & 3 Check-Dams',
    hindiTitle: 'प्रस्ताव 1: भूजल संरक्षण व 3 चेक-डैम निर्माण',
    description: 'Construct 3 stone masonry check-dams on the Sunderpur stream to recharge village wells and stop monsoon runoff.',
    proposedBy: 'Water Committee & Farmers Guild',
    estimatedCost: '₹1,20,000 (State Rural Scheme + Panchayat Fund)',
  },
  {
    id: 'res-solar',
    title: 'Resolution 2: Village School Solar Power & Smart Study Hub',
    hindiTitle: 'प्रस्ताव 2: प्राथमिक विद्यालय सोलर पावर व स्मार्ट क्लासरूम',
    description: 'Install 2KW solar panels and classroom digital projectors for uninterrupted education during power cuts.',
    proposedBy: 'School Management Committee',
    estimatedCost: '₹85,000 (Panchayat Development Fund)',
  },
  {
    id: 'res-clinic',
    title: 'Resolution 3: Upgrade Sub-Health Clinic with 24x7 Clean Water',
    hindiTitle: 'प्रस्ताव 3: उप-स्वास्थ्य केंद्र में 24x7 स्वच्छ पेयजल आपूर्ति',
    description: 'Install overhead tank, filter unit, and pipeline connecting the health sub-centre for immunization drives.',
    proposedBy: 'Anganwadi & Women Health Workers',
    estimatedCost: '₹60,000 (Tied Health Grant)',
  },
];

export default function GramSabhaVoteSim() {
  const { state } = useGame();
  const [activeResIndex, setActiveResIndex] = useState(0);
  const [votes, setVotes] = useState<Record<number, 'for' | 'against' | 'abstain' | null>>({});
  const [selectedVillager, setSelectedVillager] = useState<Villager | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const activeRes = RESOLUTIONS[activeResIndex];

  const handleCastVote = (userVote: 'for' | 'against') => {
    const newVotes: Record<number, 'for' | 'against' | 'abstain'> = {};
    VILLAGERS.forEach(v => {
      if (userVote === 'for') {
        newVotes[v.id] = v.defaultVote;
      } else {
        newVotes[v.id] = v.id % 2 === 0 ? 'against' : v.defaultVote;
      }
    });

    setVotes(newVotes);
    setHasVoted(true);
    playSound('correct', state.settings.soundEnabled);
  };

  const handleConsensusVote = () => {
    const unanimousVotes: Record<number, 'for' | 'against' | 'abstain'> = {};
    VILLAGERS.forEach(v => {
      unanimousVotes[v.id] = 'for';
    });
    setVotes(unanimousVotes);
    setHasVoted(true);
    playSound('celebration', state.settings.soundEnabled);
  };

  const handleReset = () => {
    setVotes({});
    setHasVoted(false);
    setSelectedVillager(null);
  };

  const forCount = Object.values(votes).filter(v => v === 'for').length;
  const againstCount = Object.values(votes).filter(v => v === 'against').length;
  const abstainCount = Object.values(votes).filter(v => v === 'abstain').length;
  const isPassed = forCount >= 13;

  return (
    <div className="gram-sabha-sim">
      <div className="gram-sabha-sim__header">
        <div className="gram-sabha-sim__title-group">
          <span className="gram-sabha-sim__badge">🏛️ Direct Democracy in Action</span>
          <h3 className="gram-sabha-sim__title">Gram Sabha "Show of Hands" Voting Floor</h3>
          <p className="gram-sabha-sim__subtitle">
            NCERT Ch. 11: <em>"The Gram Sabha is a meeting of all adults who live in the area covered by a Panchayat. Anyone who is 18 years or more and has the right to vote is a member."</em>
          </p>
        </div>

        <div className="res-tabs">
          {RESOLUTIONS.map((res, idx) => (
            <button
              key={res.id}
              type="button"
              className={`res-tab ${activeResIndex === idx ? 'res-tab--active' : ''}`}
              onClick={() => {
                setActiveResIndex(idx);
                handleReset();
              }}
            >
              Res #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="active-res-card">
        <div className="active-res-card__details">
          <span className="active-res-card__tag">Agenda Item for Discussion</span>
          <h4 className="active-res-card__title">{activeRes.title}</h4>
          <p className="active-res-card__desc">{activeRes.description}</p>
          <div className="active-res-card__meta">
            <span><strong>Proposed By:</strong> {activeRes.proposedBy}</span>
            <span><strong>Budget:</strong> {activeRes.estimatedCost}</span>
          </div>
        </div>

        <div className="res-actions">
          <span className="res-actions__label">Classroom / Teacher Call to Vote:</span>
          <div className="res-actions__btns">
            <button
              type="button"
              className="btn btn-success btn-vote"
              onClick={() => handleCastVote('for')}
            >
              🙋 Raise Hands IN FAVOR
            </button>
            <button
              type="button"
              className="btn btn-warning btn-vote"
              onClick={() => handleCastVote('against')}
            >
              🙅 Vote AGAINST
            </button>
            <button
              type="button"
              className="btn btn-primary btn-vote"
              onClick={handleConsensusVote}
            >
              🤝 Unanimous Consensus
            </button>
            {hasVoted && (
              <button
                type="button"
                className="btn-vote-reset"
                onClick={handleReset}
                title="Clear votes for new round"
              >
                🔄 Reset Floor
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="assembly-floor">
        <div className="assembly-floor__header">
          <span className="assembly-floor__caption">
            🌳 <strong>Banyan Tree Assembly Floor</strong> — 24 Registered Voters of Sunderpur (Tap any citizen to hear their democratic viewpoint):
          </span>
          {hasVoted && (
            <div className="live-tally-pill">
              <span className="tally-tag tally-tag--for">✅ {forCount} In Favor</span>
              <span className="tally-tag tally-tag--against">❌ {againstCount} Against</span>
              <span className="tally-tag tally-tag--abstain">⚖️ {abstainCount} Abstain</span>
            </div>
          )}
        </div>

        <div className="villager-grid">
          {VILLAGERS.map(v => {
            const vote = votes[v.id];
            const isHandRaised = vote === 'for';
            const isAgainst = vote === 'against';
            const isSelected = selectedVillager?.id === v.id;

            return (
              <button
                key={v.id}
                type="button"
                className={`villager-seat ${isHandRaised ? 'villager-seat--hand-raised' : ''} ${isAgainst ? 'villager-seat--against' : ''} ${isSelected ? 'villager-seat--selected' : ''}`}
                onClick={() => setSelectedVillager(v)}
                title={`${v.name} (${v.role}) - Click to view stance`}
              >
                <div className="villager-seat__avatar">
                  <span className="villager-seat__emoji">{v.emoji}</span>
                  {hasVoted && (
                    <span className="villager-seat__status">
                      {isHandRaised ? '🙋' : isAgainst ? '🙅' : '⚪'}
                    </span>
                  )}
                </div>
                <div className="villager-seat__info">
                  <span className="villager-seat__name">{v.name}</span>
                  <span className="villager-seat__role">{v.role}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedVillager && (
          <div className="villager-dialogue-popup">
            <div className="villager-dialogue-popup__header">
              <span className="popup-emoji">{selectedVillager.emoji}</span>
              <div>
                <strong>{selectedVillager.name}</strong>
                <div className="popup-role">{selectedVillager.role}</div>
              </div>
              <button
                type="button"
                className="popup-close"
                onClick={() => setSelectedVillager(null)}
              >
                ✕
              </button>
            </div>
            <p className="popup-speech">“{selectedVillager.reason}”</p>
            <div className="popup-footer">
              <span>Democratic Stance: <strong>{selectedVillager.defaultVote === 'for' ? 'Supports Check-Dams' : 'Raises Questions'}</strong></span>
            </div>
          </div>
        )}

        {hasVoted && (
          <div className={`verdict-banner ${isPassed ? 'verdict-banner--passed' : 'verdict-banner--rejected'}`}>
            <div className="verdict-banner__seal">
              <span>{isPassed ? '⚖️' : '⚠️'}</span>
            </div>
            <div className="verdict-banner__content">
              <h4>{isPassed ? 'RESOLUTION PASSED BY GRAM SABHA' : 'RESOLUTION REFERRED FOR FURTHER STUDY'}</h4>
              <p>
                {isPassed
                  ? `With ${forCount} of 24 hands raised (>${Math.round((forCount / 24) * 100)}% majority), the Gram Sabha has officially ratified this resolution. The Gram Panchayat Secretary (Sachiv) is mandated to record this decision in the official Register of Proceedings.`
                  : `Only ${forCount} hands raised. The resolution did not achieve a majority and must be modified after consulting Ward committees.`}
              </p>
            </div>
            <div className="verdict-banner__stamp">
              {isPassed ? 'CERTIFIED & RATIFIED' : 'PENDING REVISION'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
