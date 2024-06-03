import { useEffect, useState } from 'react';
import GameMap from './components/GameMap';
import './css/App.css';
import { GameData } from './data/GameData';
import { fillInCells } from './helperFunctions';

function App() {

  const [gameData, setGameData] = useState(GameData)

  useEffect(() => {
    console.log({ gameData })
    fillInCells({ gameData })
  }, [gameData])


  return (
    <div className="App">
      <GameMap gameData={gameData} setGameData={setGameData} />
    </div>
  );
}

export default App;
