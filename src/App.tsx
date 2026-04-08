import { useEffect, useState } from "react";
import { LetterGridContrainer } from "./components/letter-grid/letter-grid-container";
import { WordPreview } from "./components/word-preview";
import { LetterGrid } from "./controllers/letter-grid-controller";
import { PlayerListContainer } from "./components/player-list/player-list-container";
import type { PlayerData } from "./types/player-data";
import { GameController } from "./controllers/game-controller";

const letterGrid = new LetterGrid(5, 5);

export const gameController = new GameController(5);

export function App() {
  const [ word, setWord ] = useState("");
  const [ points, setPoints ] = useState(0);
  const [ playerData, setPlayerData ] = useState<PlayerData[]>([]);
  const [ currentlyActivePlayer, setCurrentlyAcitvePlayer ] = useState<PlayerData>();




  useEffect(() => 
  {
    setPlayerData(gameController.getPlayers());
    for (const player of gameController.getPlayers()) {
      if (player.isPlaying) {
        setCurrentlyAcitvePlayer(player);
      }
    }

    gameController.playerDataUpdated = (players) => 
    {
      setPlayerData(players);

      for (const player of players) 
      {
        if (player.isPlaying) 
        {
          setCurrentlyAcitvePlayer(player);
        }
      }
    }
    
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-800 relative">

      {/* Centered content */}
      <div className="relative">
        <WordPreview word={word || `${currentlyActivePlayer?.name}'S TURN`} points={points} />

        <LetterGridContrainer
          letterGrid={letterGrid}
          setWord={setWord}
          setPoints={setPoints}
        />

        {/* Right panel */}
        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2">
          <PlayerListContainer playerData={playerData}/>
        </div>

      </div>

    </div>
  )
}

