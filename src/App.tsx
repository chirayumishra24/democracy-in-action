import { GameProvider, useGame } from './state/gameStore';
import IntroScreen from './screens/IntroScreen/IntroScreen';
import SetupScreen from './screens/SetupScreen/SetupScreen';
import PhaseScreen from './screens/PhaseScreen/PhaseScreen';
import CelebrateScreen from './screens/CelebrateScreen/CelebrateScreen';
import ResultsScreen from './screens/ResultsScreen/ResultsScreen';

function GameRouter() {
  const { state } = useGame();

  switch (state.gamePhase) {
    case 'intro':
      return <IntroScreen />;
    case 'setup':
      return <SetupScreen />;
    case 'celebrate':
      return <CelebrateScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      // All governance phases render through PhaseScreen
      return <PhaseScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
