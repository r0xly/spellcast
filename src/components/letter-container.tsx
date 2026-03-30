import type { Letter } from "../controllers/letter-grid-controller"

export type LetterContainerState = "default" | "selected" | "invalid" | "hidden";

type LetterContainerProps =
{
    /** The current dispaly state of the letter container. */
    state: LetterContainerState; 
    
    /** The letter object represented by the letter container. */
    letter: Letter;

    /** The function to be ran when the letter container is clicked. */
    onMouseDown: () => void;

    /** The function to be ran when the mouse hovers of the letter container. */
    onMouseEnter: () => void;
} 

/** A component that displays a character and the amount of points it will give. */
export function LetterContainer({ letter , state, onMouseDown, onMouseEnter }: LetterContainerProps)
{
    let stateClasses = "";

    if (state === "selected") 
    {
        stateClasses = "bg-indigo-500 shadow-[inset_0_-5px_0_theme(colors.indigo.900)] text-white";
    } 
    else if (state === "invalid") 
    {
        stateClasses = "bg-red-200 shadow-[inset_0_-5px_0_theme(colors.red.400)] text-red-900";
    } 
    else if (state === "hidden") 
    {
        stateClasses = "opacity-0";
    } 
    else   // Default
    {
        stateClasses = "bg-blue-100 shadow-[inset_0_-5px_0_theme(colors.mauve.400)] text-black";
    }

    return (
        <div 
            className=
            {
                `
                relative box-border rounded-lg size-16 py-5 m-0 
                select-none 
                transition ease-in-out duration-100
                ${stateClasses}
                `
            }
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
        >
            <span className="absolute bottom-0 right-0 m-2 text-xs">
                {letter.points}
            </span>

            {letter.multiplier > 1 && (
                <span className="absolute -top-2 -left-2 w-6 h-6 flex items-center justify-center bg-black text-xs text-white rounded-full border-2 border-indigo-500">
                    {letter.multiplier}x
                </span>
            )}

            <span className="flex justify-center items-center w-full h-full text-2xl font-black mb-2 uppercase">
                {letter.character}
            </span>
        </div>
    )
}