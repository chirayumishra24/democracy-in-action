import { useGame } from '../../state/gameStore';
import Header from '../Header/Header';
import TeamPanel from '../TeamPanel/TeamPanel';
import PhaseNav from '../PhaseNav/PhaseNav';
import './GameShell.css';

interface Props {
  children: React.ReactNode;
  hideTeams?: boolean;
  hideNav?: boolean;
  fullWidth?: boolean;
}

export default function GameShell({ children, hideTeams, hideNav, fullWidth }: Props) {
  const { state } = useGame();
  const isIndividual = state.mode === 'individual';

  return (
    <div className="game-shell">
      <Header />
      <div className={`game-body ${fullWidth ? 'game-body--full' : ''}`}>
        {!hideTeams && !isIndividual && (
          <aside className="game-sidebar game-sidebar--left" aria-label="Team A panel">
            <TeamPanel team="A" />
          </aside>
        )}
        <main className="game-center" role="main">
          {children}
        </main>
        {!hideTeams && !isIndividual && (
          <aside className="game-sidebar game-sidebar--right" aria-label="Team B panel">
            <TeamPanel team="B" />
          </aside>
        )}
      </div>
      {!hideNav && <PhaseNav />}
    </div>
  );
}
