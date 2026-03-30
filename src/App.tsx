import { useState } from "react";
import { LetterGridContrainer } from "./components/letter-grid-container";
import { WordPreview } from "./components/word-preview";
import { LetterGrid } from "./controllers/letter-grid-controller";
import { PlayerFrame } from "./components/player-frame";

const letterGrid = new LetterGrid(5, 5);

export function App() {
  const [word, setWord] = useState("");
  const [points, setPoints] = useState(0);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-800 relative">

      {/* Centered content */}
      <div className="relative">
        <WordPreview word={word} points={points} />

        <LetterGridContrainer
          letterGrid={letterGrid}
          setWord={setWord}
          setPoints={setPoints}
        />

        {/* Right panel */}
        <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 w-64 p-3 bg-slate-950 rounded-xl">
          <span className="w-full text-white">
            Round 1/5
          </span>

          <div className="flex flex-col gap-3 mt-3">
            <PlayerFrame playerPoints={10} playerName={"Player 1"} isPlaying={false} previousWord={"tree"} previousWordPoints={4} />
            <PlayerFrame playerPoints={100} playerName={"Player 2"} isPlaying={false} previousWord={"a"} previousWordPoints={1} />
            <PlayerFrame playerPoints={24} playerName={"Player 4"} isPlaying={true} previousWord={undefined} previousWordPoints={0} />
          </div>
        </div>

      </div>

    </div>
  )
}

