import { useState, useCallback } from 'react';
import { useGame } from '../../state/gameStore';
import type { Challenge, TeamId } from '../../types/game';
import { calculatePoints, calculatePartialPoints } from '../../utils/scoring';
import { playSound } from '../../utils/audio';
import Timer from '../Timer/Timer';
import CharacterDialogue from '../CharacterDialogue/CharacterDialogue';
import TreasurySimulator from '../TreasurySimulator/TreasurySimulator';
import { speakText, stopSpeaking } from '../../utils/speechEngine';
import './ChallengeCard.css';

interface Props {
  challenge: Challenge;
  onComplete: () => void;
}

export default function ChallengeCard({ challenge, onComplete }: Props) {
  const { state, dispatch } = useGame();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [sequenceOrder, setSequenceOrder] = useState<string[]>([]);
  const [distribution, setDistribution] = useState<Record<string, number>>({});
  const [selectedRouting, setSelectedRouting] = useState<Record<string, string>>({});
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [timerRunning, setTimerRunning] = useState(true);
  const [isSpeakingText, setIsSpeakingText] = useState(false);

  const team = state.currentTeam;

  const toggleSpeak = () => {
    if (isSpeakingText) {
      stopSpeaking();
      setIsSpeakingText(false);
    } else {
      setIsSpeakingText(true);
      const textToSpeak = `${challenge.title}. ${challenge.prompt}`;
      speakText(textToSpeak, state.settings.language === 'hi' ? 'hi' : 'en', () => {
        setIsSpeakingText(false);
      });
    }
  };

  const resetTimer = useCallback(() => {
    dispatch({ type: 'SET_TIMER', time: state.maxTimer });
    setTimerRunning(true);
  }, [dispatch, state.maxTimer]);

  const awardPoints = useCallback((pts: number, t: TeamId = team) => {
    dispatch({ type: 'ADD_SCORE', team: t, points: pts });
    dispatch({ type: 'ADD_TOKEN', team: t, token: challenge.tokenReward });
    dispatch({ type: 'SET_SCORE_ANIMATION', data: { team: t, points: pts } });
    setTimeout(() => dispatch({ type: 'SET_SCORE_ANIMATION', data: null }), 1500);
  }, [dispatch, team, challenge.tokenReward]);

  // --- MCQ / Explore / Discussion option handler ---
  const handleOptionSelect = (optId: string) => {
    if (answered) return;
    setSelectedOption(optId);
  };

  const handleSubmitOption = () => {
    if (!selectedOption || answered) return;
    setAnswered(true);
    setTimerRunning(false);

    let correct = false;
    let fb = '';

    if (challenge.type === 'explore') {
      const opt = challenge.options.find(o => o.id === selectedOption);
      correct = opt?.correct ?? false;
      fb = opt?.feedback ?? '';
    } else if (challenge.type === 'mcq') {
      const opt = challenge.options.find(o => o.id === selectedOption);
      correct = opt?.correct ?? false;
      fb = opt?.feedback ?? '';
    } else if (challenge.type === 'discussion') {
      correct = selectedOption === challenge.bestPriority;
      fb = correct ? challenge.feedbackCorrect : challenge.feedbackIncorrect;
    } else if (challenge.type === 'viewpoint') {
      const q = challenge.questions[currentQ];
      const opt = q.options.find(o => o.id === selectedOption);
      correct = opt?.correct ?? false;
      fb = opt?.feedback ?? '';
    }

    setIsCorrect(correct);
    setFeedback(fb);

    if (correct) {
      const pts = calculatePoints(challenge.difficulty, state.hintUsed);
      awardPoints(pts);
      playSound('correct', state.settings.soundEnabled);
    } else {
      playSound('incorrect', state.settings.soundEnabled);
    }

    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Viewpoint next question ---
  const handleNextQuestion = () => {
    if (challenge.type !== 'viewpoint') return;
    if (currentQ < challenge.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setAnswered(false);
      setFeedback('');
      resetTimer();
    } else {
      onComplete();
    }
  };

  // --- Sequencing ---
  const handleSequenceAdd = (stepId: string) => {
    if (sequenceOrder.includes(stepId)) {
      setSequenceOrder(sequenceOrder.filter(s => s !== stepId));
    } else {
      setSequenceOrder([...sequenceOrder, stepId]);
    }
  };

  const handleSequenceSubmit = () => {
    if (challenge.type !== 'sequencing') return;
    setAnswered(true);
    setTimerRunning(false);

    let correctCount = 0;
    sequenceOrder.forEach((id, idx) => {
      if (challenge.correctOrder[idx] === id) correctCount++;
    });
    const ratio = correctCount / challenge.correctOrder.length;
    const correct = ratio >= 0.7;
    setIsCorrect(correct);
    setFeedback(challenge.explanation);

    const pts = calculatePartialPoints(challenge.difficulty, ratio, state.hintUsed);
    awardPoints(pts);
    playSound(correct ? 'correct' : 'incorrect', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Resource allocation ---
  const handleDistChange = (needId: string, val: number) => {
    setDistribution({ ...distribution, [needId]: val });
  };

  const handleResourceSubmit = () => {
    if (challenge.type !== 'resource') return;
    const total = Object.values(distribution).reduce((s, v) => s + v, 0);
    if (total > challenge.totalPoints) return;

    setAnswered(true);
    setTimerRunning(false);

    const allMinMet = challenge.needs.every(n => (distribution[n.id] || 0) >= n.minimum);
    setIsCorrect(allMinMet);
    setFeedback(allMinMet ? challenge.feedbackFair : challenge.feedbackUnfair);

    const pts = allMinMet
      ? calculatePoints(challenge.difficulty, state.hintUsed)
      : calculatePartialPoints(challenge.difficulty, 0.3, state.hintUsed);
    awardPoints(pts);
    playSound(allMinMet ? 'correct' : 'incorrect', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Routing ---
  const handleRoutingSubmit = () => {
    if (challenge.type !== 'routing') return;
    setAnswered(true);
    setTimerRunning(false);

    let correctCount = 0;
    const total = Object.keys(challenge.correctRouting).length;
    Object.entries(challenge.correctRouting).forEach(([issueId, correctDest]) => {
      if (selectedRouting[issueId] === correctDest) correctCount++;
    });

    const ratio = correctCount / total;
    setIsCorrect(ratio >= 0.7);
    setFeedback(ratio >= 0.7 ? 'Great routing! You understood which issues belong where.' : 'Some issues were routed to the wrong level. Think about what can be handled locally vs. what needs wider support.');

    const pts = calculatePartialPoints(challenge.difficulty, ratio, state.hintUsed);
    awardPoints(pts);
    playSound(ratio >= 0.7 ? 'correct' : 'incorrect', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Role Play ---
  const handleActionSelect = (actionId: string) => {
    if (challenge.type !== 'rolePlay' || answered) return;
    setSelectedAction(actionId);
    setAnswered(true);
    setTimerRunning(false);

    const action = challenge.actions.find(a => a.id === actionId);
    const correct = action?.isCompromise ?? false;
    setIsCorrect(correct);
    setFeedback(action?.consequence ?? '');

    const pts = correct
      ? calculatePoints(challenge.difficulty, state.hintUsed)
      : calculatePartialPoints(challenge.difficulty, 0.3, state.hintUsed);
    awardPoints(pts);
    playSound(correct ? 'correct' : 'incorrect', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Citizen Report ---
  const handleIssueToggle = (checkpointId: string) => {
    if (answered) return;
    setSelectedIssues(prev =>
      prev.includes(checkpointId)
        ? prev.filter(id => id !== checkpointId)
        : [...prev, checkpointId]
    );
  };

  const handleCitizenReportSubmit = () => {
    if (challenge.type !== 'citizenReport') return;
    setAnswered(true);
    setTimerRunning(false);

    const correctSet = new Set(challenge.correctIssues);
    const selectedSet = new Set(selectedIssues);
    const correctCount = [...correctSet].filter(id => selectedSet.has(id)).length;
    const falsePositives = [...selectedSet].filter(id => !correctSet.has(id)).length;
    const ratio = Math.max(0, (correctCount - falsePositives * 0.5) / correctSet.size);

    setIsCorrect(ratio >= 0.7);
    setFeedback(ratio >= 0.7 ? 'Sharp observation! You correctly identified the issues.' : 'Look more carefully — not everything that looks fine IS fine, and not every stage has issues.');

    const pts = calculatePartialPoints(challenge.difficulty, ratio, state.hintUsed);
    awardPoints(pts);
    playSound(ratio >= 0.7 ? 'correct' : 'incorrect', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Accountability ---
  const handleAccountabilitySubmit = () => {
    if (challenge.type !== 'accountability') return;
    // Use same option-select flow as viewpoint — currentQ tracks which question
    handleSubmitOption();
  };

  // --- Reflection ---
  const handleReflectionSubmit = () => {
    if (challenge.type !== 'reflection') return;
    setAnswered(true);
    setTimerRunning(false);
    setIsCorrect(true);
    setFeedback('Thank you for reflecting! Your thoughts show how much you have learned about governance and participation.');
    awardPoints(calculatePoints(challenge.difficulty, false));
    playSound('celebration', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  // --- Impact ---
  const handleImpactSubmit = () => {
    // Impact uses same option select flow
    handleSubmitOption();
  };

  // --- Hint ---
  const handleHint = () => {
    dispatch({ type: 'USE_HINT' });
    playSound('hint', state.settings.soundEnabled);
  };

  // --- Time up ---
  const handleTimeUp = () => {
    if (answered) return;
    setAnswered(true);
    setTimerRunning(false);
    setIsCorrect(false);
    setFeedback('⏰ Time\'s up! Don\'t worry — you can try another challenge.');
    playSound('incorrect', state.settings.soundEnabled);
    dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
  };

  return (
    <div className={`challenge-card ${answered ? (isCorrect ? 'challenge-card--correct' : 'challenge-card--incorrect') : ''}`}>
      {/* Header */}
      <div className="challenge-card__header">
        <div className="challenge-card__meta">
          <span className="badge badge-primary">{challenge.difficulty}</span>
          <span className="badge badge-warning">{challenge.points} pts</span>
          {challenge.ibSkill && <span className="badge badge-success">{challenge.ibSkill}</span>}
          <button 
            type="button"
            className={`btn-challenge-tts ${isSpeakingText ? 'btn-challenge-tts--active' : ''}`}
            onClick={toggleSpeak}
            title={isSpeakingText ? "Stop Reading" : "Read Question Aloud (TTS)"}
            aria-label="Read Question Aloud"
          >
            {isSpeakingText ? '⏹️ Stop' : '🔊 Read Aloud'}
          </button>
        </div>
        <Timer onTimeUp={handleTimeUp} running={timerRunning && !answered} />
      </div>

      <h3 className="challenge-card__title">{challenge.title}</h3>
      <p className="challenge-card__prompt">{challenge.prompt}</p>

      {/* Hint */}
      {challenge.hint && !state.hintUsed && !answered && (
        <button className="challenge-card__hint-btn" onClick={handleHint}>💡 Use Hint (-2pts)</button>
      )}
      {state.hintUsed && challenge.hint && (
        <div className="challenge-card__hint">💡 {challenge.hint}</div>
      )}

      {/* Learning goal */}
      <div className="challenge-card__learning">
        🎯 <strong>Learning Goal:</strong> {challenge.learningGoal}
      </div>

      {/* ─── EXPLORE ─── */}
      {challenge.type === 'explore' && (
        <div className="challenge-card__body">
          <div className="evidence-list">
            {challenge.evidence.map(e => (
              <div key={e.id} className="evidence-item">
                <span>{e.emoji}</span> {e.text}
              </div>
            ))}
          </div>
          <p className="challenge-card__question">{challenge.question}</p>
          <div className="options-list">
            {challenge.options.map(o => (
              <button key={o.id} className={`option-btn ${selectedOption === o.id ? 'option-btn--selected' : ''} ${answered && o.correct ? 'option-btn--correct' : ''} ${answered && selectedOption === o.id && !o.correct ? 'option-btn--wrong' : ''}`}
                onClick={() => handleOptionSelect(o.id)} disabled={answered}>
                {o.label}
              </button>
            ))}
          </div>
          {!answered && selectedOption && (
            <button className="btn btn-primary" onClick={handleSubmitOption}>Submit Answer</button>
          )}
        </div>
      )}

      {/* ─── VIEWPOINT ─── */}
      {challenge.type === 'viewpoint' && (
        <div className="challenge-card__body">
          <div className="viewpoints-list">
            {challenge.viewpoints.map(v => (
              <CharacterDialogue
                key={v.personId}
                name={v.name}
                role={v.role}
                emoji={v.emoji}
                speech={v.perspective}
              />
            ))}
          </div>
          {challenge.questions[currentQ] && (
            <>
              <p className="challenge-card__question">{challenge.questions[currentQ].question}</p>
              <div className="options-list">
                {challenge.questions[currentQ].options.map(o => (
                  <button key={o.id} className={`option-btn ${selectedOption === o.id ? 'option-btn--selected' : ''} ${answered && o.correct ? 'option-btn--correct' : ''} ${answered && selectedOption === o.id && !o.correct ? 'option-btn--wrong' : ''}`}
                    onClick={() => handleOptionSelect(o.id)} disabled={answered}>
                    {o.label}
                  </button>
                ))}
              </div>
              {!answered && selectedOption && (
                <button className="btn btn-primary" onClick={handleSubmitOption}>Submit Answer</button>
              )}
            </>
          )}
        </div>
      )}

      {/* ─── DISCUSSION ─── */}
      {challenge.type === 'discussion' && (
        <div className="challenge-card__body">
          <div className="viewpoints-list">
            {challenge.viewpoints.map((v, i) => (
              <CharacterDialogue
                key={i}
                name={v.name}
                role="Villager"
                emoji={v.emoji}
                speech={v.position}
              />
            ))}
          </div>
          <p className="challenge-card__question">{challenge.issue}</p>
          <div className="options-list">
            {challenge.priorities.map(p => (
              <button key={p.id} className={`option-btn option-btn--priority ${selectedOption === p.id ? 'option-btn--selected' : ''} ${answered && p.id === challenge.bestPriority ? 'option-btn--correct' : ''} ${answered && selectedOption === p.id && p.id !== challenge.bestPriority ? 'option-btn--wrong' : ''}`}
                onClick={() => handleOptionSelect(p.id)} disabled={answered}>
                <span className="option-btn__emoji">{p.emoji}</span>
                <div>
                  <strong>{p.label}</strong>
                  <p className="option-btn__desc">{p.description}</p>
                </div>
              </button>
            ))}
          </div>
          {!answered && selectedOption && (
            <button className="btn btn-primary" onClick={handleSubmitOption}>Submit Choice</button>
          )}
        </div>
      )}

      {/* ─── ROUTING ─── */}
      {challenge.type === 'routing' && (
        <div className="challenge-card__body">
          <div className="routing-grid">
            {challenge.issues.map(issue => (
              <div key={issue.id} className="routing-item">
                <div className="routing-item__issue">
                  <span>{issue.emoji}</span> <strong>{issue.label}</strong>
                  <p className="routing-item__desc">{issue.description}</p>
                </div>
                <div className="routing-item__destinations">
                  {challenge.destinations.map(d => (
                    <button key={d.id}
                      className={`routing-dest ${selectedRouting[issue.id] === d.id ? 'routing-dest--selected' : ''} ${answered && challenge.correctRouting[issue.id] === d.id ? 'routing-dest--correct' : ''}`}
                      onClick={() => !answered && setSelectedRouting({ ...selectedRouting, [issue.id]: d.id })}
                      disabled={answered}>
                      {d.emoji} {d.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {!answered && Object.keys(selectedRouting).length === challenge.issues.length && (
            <button className="btn btn-primary" onClick={handleRoutingSubmit}>Submit Routing</button>
          )}
        </div>
      )}

      {/* ─── ROLE PLAY ─── */}
      {challenge.type === 'rolePlay' && (
        <div className="challenge-card__body">
          <div className="roleplay-scenario">
            <div className="roleplay-role">
              <span className="roleplay-role__emoji">{challenge.role.emoji}</span>
              <div>
                <strong>Your Role: {challenge.role.title}</strong>
                <p>{challenge.role.description}</p>
              </div>
            </div>
            <div className="viewpoints-list">
              {challenge.otherViewpoints.map((v, i) => (
                <CharacterDialogue
                  key={i}
                  name={v.name}
                  role="Stakeholder"
                  emoji={v.emoji}
                  speech={v.position}
                />
              ))}
            </div>
          </div>
          <p className="challenge-card__question">What action do you take?</p>
          <div className="options-list">
            {challenge.actions.map(a => (
              <button key={a.id}
                className={`option-btn ${selectedAction === a.id ? 'option-btn--selected' : ''} ${answered && a.isCompromise ? 'option-btn--correct' : ''} ${answered && selectedAction === a.id && !a.isCompromise ? 'option-btn--wrong' : ''}`}
                onClick={() => handleActionSelect(a.id)} disabled={answered}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── RESOURCE / TREASURY ALLOCATION ─── */}
      {challenge.type === 'resource' && (
        <div className="challenge-card__body">
          <TreasurySimulator
            totalPoints={challenge.totalPoints}
            needs={challenge.needs}
            distribution={distribution}
            onDistChange={handleDistChange}
            onSubmit={handleResourceSubmit}
            disabled={answered}
          />
        </div>
      )}

      {/* ─── SEQUENCING ─── */}
      {challenge.type === 'sequencing' && (
        <div className="challenge-card__body">
          <p className="challenge-card__instruction">Click steps in the correct order:</p>
          <div className="sequence-selected">
            {sequenceOrder.map((id, idx) => {
              const step = challenge.steps.find(s => s.id === id);
              const isCorrectPos = answered && challenge.correctOrder[idx] === id;
              return (
                <div key={id} className={`sequence-chip sequence-chip--placed ${answered ? (isCorrectPos ? 'sequence-chip--correct' : 'sequence-chip--wrong') : ''}`}
                  onClick={() => !answered && handleSequenceAdd(id)}>
                  <span className="sequence-chip__num">{idx + 1}</span>
                  {step?.emoji} {step?.label}
                </div>
              );
            })}
          </div>
          <div className="sequence-pool">
            {challenge.steps.filter(s => !sequenceOrder.includes(s.id)).map(s => (
              <button key={s.id} className="sequence-chip" onClick={() => handleSequenceAdd(s.id)} disabled={answered}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          {!answered && sequenceOrder.length === challenge.steps.length && (
            <button className="btn btn-primary" onClick={handleSequenceSubmit}>Submit Order</button>
          )}
        </div>
      )}

      {/* ─── CITIZEN REPORT ─── */}
      {challenge.type === 'citizenReport' && (
        <div className="challenge-card__body">
          <p className="challenge-card__instruction">Inspect each checkpoint. Select the ones that have issues:</p>
          <div className="checkpoints-list">
            {challenge.checkpoints.map(cp => (
              <button key={cp.id}
                className={`checkpoint-item ${selectedIssues.includes(cp.id) ? 'checkpoint-item--flagged' : ''} ${answered && challenge.correctIssues.includes(cp.id) ? 'checkpoint-item--correct-issue' : ''}`}
                onClick={() => handleIssueToggle(cp.id)} disabled={answered}>
                <div className="checkpoint-item__label">{cp.label}</div>
                <div className="checkpoint-item__detail">{cp.detail}</div>
                {selectedIssues.includes(cp.id) && <span className="checkpoint-item__flag">🚩</span>}
              </button>
            ))}
          </div>
          {!answered && selectedIssues.length > 0 && (
            <button className="btn btn-primary" onClick={handleCitizenReportSubmit}>Submit Report</button>
          )}
        </div>
      )}

      {/* ─── ACCOUNTABILITY ─── */}
      {challenge.type === 'accountability' && (
        <div className="challenge-card__body">
          <div className="timeline-list">
            {challenge.timeline.map(t => (
              <div key={t.id} className={`timeline-item ${t.hasIssue ? 'timeline-item--issue' : ''}`}>
                <span className="timeline-item__emoji">{t.emoji}</span>
                <div>
                  <strong>{t.stage}</strong>
                  <p>{t.detail}</p>
                  <p className="timeline-item__evidence">📎 {t.evidence}</p>
                </div>
                {t.hasIssue && <span className="timeline-item__flag">⚠️</span>}
              </div>
            ))}
          </div>
          {challenge.questions[currentQ] && (
            <>
              <p className="challenge-card__question">{challenge.questions[currentQ].question}</p>
              <div className="options-list">
                {challenge.questions[currentQ].options.map(o => (
                  <button key={o.id} className={`option-btn ${selectedOption === o.id ? 'option-btn--selected' : ''} ${answered && o.correct ? 'option-btn--correct' : ''} ${answered && selectedOption === o.id && !o.correct ? 'option-btn--wrong' : ''}`}
                    onClick={() => handleOptionSelect(o.id)} disabled={answered}>
                    {o.label}
                  </button>
                ))}
              </div>
              {!answered && selectedOption && (
                <button className="btn btn-primary" onClick={handleAccountabilitySubmit}>Submit</button>
              )}
            </>
          )}
        </div>
      )}

      {/* ─── IMPACT ─── */}
      {challenge.type === 'impact' && (
        <div className="challenge-card__body">
          <div className="impact-comparison">
            <div className="impact-col">
              <h4>⬅️ Before</h4>
              {challenge.before.map((b, i) => (
                <div key={i} className="impact-row impact-row--before">
                  {b.emoji} <strong>{b.area}:</strong> {b.status}
                </div>
              ))}
            </div>
            <div className="impact-col">
              <h4>After ➡️</h4>
              {challenge.after.map((a, i) => (
                <div key={i} className="impact-row impact-row--after">
                  {a.emoji} <strong>{a.area}:</strong> {a.status}
                </div>
              ))}
            </div>
          </div>
          {challenge.questions[currentQ] && (
            <>
              <p className="challenge-card__question">{challenge.questions[currentQ].question}</p>
              <div className="options-list">
                {challenge.questions[currentQ].options.map(o => (
                  <button key={o.id} className={`option-btn ${selectedOption === o.id ? 'option-btn--selected' : ''} ${answered && o.correct ? 'option-btn--correct' : ''} ${answered && selectedOption === o.id && !o.correct ? 'option-btn--wrong' : ''}`}
                    onClick={() => handleOptionSelect(o.id)} disabled={answered}>
                    {o.label}
                  </button>
                ))}
              </div>
              {!answered && selectedOption && (
                <button className="btn btn-primary" onClick={handleImpactSubmit}>Submit</button>
              )}
            </>
          )}
        </div>
      )}

      {/* ─── REFLECTION ─── */}
      {challenge.type === 'reflection' && (
        <div className="challenge-card__body">
          {challenge.questions.map(q => (
            <div key={q.id} className="reflection-question">
              <p className="challenge-card__question">{q.question}</p>
              {q.type === 'choice' && q.options && (
                <div className="options-list">
                  {q.options.map(o => (
                    <button key={o.id}
                      className={`option-btn ${reflectionAnswers[q.id] === o.id ? 'option-btn--selected' : ''}`}
                      onClick={() => setReflectionAnswers({ ...reflectionAnswers, [q.id]: o.id })}
                      disabled={answered}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
              {q.type === 'text' && (
                <textarea className="reflection-textarea" placeholder="Type your thoughts here..."
                  value={reflectionAnswers[q.id] || ''}
                  onChange={e => setReflectionAnswers({ ...reflectionAnswers, [q.id]: e.target.value })}
                  disabled={answered} rows={3} />
              )}
            </div>
          ))}
          {!answered && Object.keys(reflectionAnswers).length > 0 && (
            <button className="btn btn-primary" onClick={handleReflectionSubmit}>Submit Reflection</button>
          )}
        </div>
      )}

      {/* ─── REPRESENTATION ─── */}
      {challenge.type === 'representation' && (
        <div className="challenge-card__body">
          <p className="challenge-card__instruction">Select representatives to cover as many community needs as possible:</p>
          <div className="needs-badges">
            {challenge.communityNeeds.map(n => (
              <span key={n.id} className={`badge ${n.priority === 'high' ? 'badge-warning' : 'badge-primary'}`}>
                {n.emoji} {n.label}
              </span>
            ))}
          </div>
          <div className="options-list">
            {challenge.representatives.map(r => (
              <button key={r.id}
                className={`option-btn ${selectedIssues.includes(r.id) ? 'option-btn--selected' : ''}`}
                onClick={() => !answered && handleIssueToggle(r.id)} disabled={answered}>
                {r.emoji} {r.name}
                <span className="option-btn__desc">Represents: {r.represents.join(', ')}</span>
              </button>
            ))}
          </div>
          {!answered && selectedIssues.length >= 2 && (
            <button className="btn btn-primary" onClick={() => {
              setAnswered(true);
              setTimerRunning(false);
              const coveredNeeds = new Set<string>();
              selectedIssues.forEach(repId => {
                const rep = challenge.representatives.find(r => r.id === repId);
                rep?.represents.forEach(n => coveredNeeds.add(n));
              });
              const coverage = coveredNeeds.size / challenge.communityNeeds.length;
              const good = coverage >= 0.7;
              setIsCorrect(good);
              setFeedback(good ? 'Good representation! You covered most community needs.' : 'Some community needs are not represented. Try to include diverse voices.');
              const pts = calculatePartialPoints(challenge.difficulty, coverage, state.hintUsed);
              awardPoints(pts);
              playSound(good ? 'correct' : 'incorrect', state.settings.soundEnabled);
              dispatch({ type: 'USE_CHALLENGE', id: challenge.id });
            }}>Submit Selection</button>
          )}
        </div>
      )}

      {/* ─── Feedback ─── */}
      {answered && feedback && (
        <div className={`challenge-card__feedback ${isCorrect ? 'challenge-card__feedback--correct' : 'challenge-card__feedback--incorrect'}`}>
          <span>{isCorrect ? '✅' : '💡'}</span>
          <p>{feedback}</p>
        </div>
      )}

      {/* ─── Continue ─── */}
      {answered && (
        <div className="challenge-card__actions">
          {challenge.type === 'viewpoint' && currentQ < challenge.questions.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNextQuestion}>Next Question →</button>
          ) : challenge.type === 'impact' && currentQ < challenge.questions.length - 1 ? (
            <button className="btn btn-primary" onClick={() => { setCurrentQ(currentQ + 1); setSelectedOption(null); setAnswered(false); setFeedback(''); resetTimer(); }}>
              Next Question →
            </button>
          ) : challenge.type === 'accountability' && currentQ < challenge.questions.length - 1 ? (
            <button className="btn btn-primary" onClick={() => { setCurrentQ(currentQ + 1); setSelectedOption(null); setAnswered(false); setFeedback(''); resetTimer(); }}>
              Next Question →
            </button>
          ) : (
            <button className="btn btn-success" onClick={onComplete}>Continue →</button>
          )}
        </div>
      )}

      {/* ─── Gavel Stamp Overlay on Resolution Approval ─── */}
      {answered && isCorrect && (
        <div className="gavel-stamp-overlay" aria-hidden="true">
          <div className="gavel-stamp">
            <span className="gavel-stamp__icon">⚖️</span>
            <span className="gavel-stamp__text">APPROVED IN GRAM SABHA</span>
          </div>
        </div>
      )}
    </div>
  );
}
