import { useEffect, useState } from "react"
import { getWeightedRandomLetter, Letter, type LetterGrid } from "../controllers/letter-grid-controller"
import { LetterContainer, type LetterContainerState } from "./letter-container";
import { isEnglishWord } from "../util/dictionary";
import { LetterGridLines } from "./letter-grid-lines";


type LetterGridContainerProps =
{
    letterGrid: LetterGrid;
    setWord: (word: string) => void;
    setPoints: (word: number) => void;
} 

const isAdjacent = (a: Letter, b: Letter) => 
{
    const rowDiff = Math.abs(a.x- b.x);
    const colDiff = Math.abs(a.y - b.y);

    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
}

/** The HTML display for a LetterGrid object. This also handles the logic for selecting letters.  */
export function LetterGridContrainer({ letterGrid, setWord, setPoints }: LetterGridContainerProps)
{
    /** All the letters in the grid. */
    const [ letters, setLetters ] = useState<Letter[]>(letterGrid.getsLetters());

    /** Currently selected letters. */
    const [ selectedLetters, setSelectedLetters ] = useState<Letter[]>([]);

    /** The state which the all selected letter containters will be set to. */
    const [ selectedLettersState, setSelectedLettersState ] = useState<LetterContainerState>("selected");

    /** When true, the grid is currently in seletion mode. */
    const [ selectionModeActive, setSelectionMoveActive ] = useState<boolean>(false);

    /** When true, the user can not enter selection mode. */
    const [ canEnterSelectionMode, setCanEnterSelectionMode ] = useState<boolean>(true);

    const enterSelectionMode = (letter: Letter) =>
    {
        if (!selectionModeActive && canEnterSelectionMode)
        {
            setSelectedLettersState("selected");
            setSelectionMoveActive(true);
            setSelectedLetters([letter]);
        }
    }

    const exitSelectionMode = () =>
    {
        if (!selectionModeActive)
        {
            return;
        }

        const currentWord = selectedLetters.map(l => l.character).join("");    
        const validWorld = isEnglishWord(currentWord);


        setSelectedLettersState(validWorld ? "hidden" : "invalid");

        setSelectionMoveActive(false);


        setCanEnterSelectionMode(false);

        setTimeout(() => 
        {
            setSelectedLetters([]);
            setCanEnterSelectionMode(true);

            if (validWorld) 
            {
                for (const letter of selectedLetters) 
                {
                    letterGrid.setLetter(letter.x, letter.y, getWeightedRandomLetter());
                }
            }

        }, 1000)
    }

    const selectLetter = (letter: Letter) =>
    {
        if (selectionModeActive)
        {
            setSelectedLetters(previousLetters => 
            {
                // Prevent reseletion
                if (previousLetters.find(selectedLetter => selectedLetter.x === letter.x && selectedLetter.y === letter.y)) 
                {
                    return previousLetters;
                }

                const lastSelectedLetter = previousLetters[previousLetters.length - 1];

                if (isAdjacent(lastSelectedLetter, letter)) 
                {
                    return [...previousLetters, letter];
                }

                return previousLetters;
            })

        }
    }

    useEffect(() =>
    {
        let currentWord = "";
        let points = 0;

        for (const letter of selectedLetters)
        {
            currentWord += letter.character;
            points +=  letter.points; 
        }

        setWord(currentWord);
        setPoints(points);

        letterGrid.onUpdate = () =>
        {
            setLetters(letterGrid.getsLetters());
        }

        window.addEventListener("mouseup", exitSelectionMode);
        
        return () =>
        {
            window.removeEventListener("mouseup", exitSelectionMode);
        }
    }, [letters, selectedLetters, selectionModeActive]);



    return (
        <div className="relative inline-block">
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none p-4">
                <LetterGridLines selectedLetters={selectedLetters}/>
            </svg>

            <div className="inline-grid grid-cols-5 gap-4 bg-slate-950 p-4 rounded-xl">
                {
                    letters.map((letter) =>
                    (
                        <LetterContainer
                            letter={letter}
                            state=
                            {   
                                selectedLetters.some(selectedLetter => letter.x === selectedLetter.x && letter.y === selectedLetter.y) ? 
                                    selectedLettersState : 
                                    "default"
                            }
                            onMouseDown={() => enterSelectionMode(letter)}
                            onMouseEnter={() => selectLetter(letter)}
                        />
                    ))
                }
            </div>


        </div>
    )
}