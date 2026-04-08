import type { Letter } from "../../controllers/letter-grid-controller";

type LetterGridLinesProps = 
{
    selectedLetters: Letter[];
    visible: boolean,
    color: string,
};

export const LetterGridLines = ({ selectedLetters, visible, color }: LetterGridLinesProps) => 
{
    const CELL_SIZE = 64;
    const GAP = 16;

    const lines = selectedLetters.map((letter, i) => {
        if (i === selectedLetters.length - 1) return null;

        const startX = letter.y * (CELL_SIZE + GAP) + CELL_SIZE / 2;
        const startY = letter.x * (CELL_SIZE + GAP) + CELL_SIZE / 2;

        const next = selectedLetters[i + 1];
        const endX = next.y * (CELL_SIZE + GAP) + CELL_SIZE / 2;
        const endY = next.x * (CELL_SIZE + GAP) + CELL_SIZE / 2;

        return (
            <line
                key={i}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                //stroke="oklch(58.5% 0.233 277.117)"
                stroke={color}
                strokeWidth={10}
                strokeLinecap="round"
            />
        );
    });

    return (
        <svg className={`absolute top-0 left-0 w-full h-full pointer-events-none p-4 ${!visible ? "opacity-0" : ""}`}>
            {lines}
        </svg>
    );
};