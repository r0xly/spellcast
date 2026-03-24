import { useState } from "react";
import { LetterGridContrainer } from "./components/letter-grid-container";
import { WordPreview } from "./components/word-preview";
import { LetterGrid } from "./controllers/letter-grid-controller";

const letterGrid = new LetterGrid(5, 5);

export function App() {
  const [word, setWord] = useState("");
  const [points, setPoints] = useState(0);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-800">
      <div className="w-auto m-0 p-0">
        <WordPreview 
          word = {word}
          points = {points}
        />
        <LetterGridContrainer 
          letterGrid = {letterGrid}
          setWord = {setWord}
          setPoints= {setPoints}
        />
      </div>
    </div>
  )
}

