import { useEffect, useState } from 'react';
import GameMap from './components/GameMap';
import './css/App.css';
import './css/Generic.css';
import { GameData } from './data/GameData';
import { fillInCells } from './helperFunctions';
import SidePanel from './components/SidePanel';

function App() {

  const [gameData, setGameData] = useState(GameData)

  useEffect(() => {
    console.log({ gameData })
    fillInCells({ gameData })
  }, [gameData])


  return (
    <div className="App">
      <GameMap gameData={gameData} setGameData={setGameData} />
      <SidePanel gameData={gameData} setGameData={setGameData} />
    </div>
  );
}

export default App;
