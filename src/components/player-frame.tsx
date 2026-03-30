type PlayerFrameProps = 
{
    /** The player's name. */
    playerName: string;
    
    /** The previous word the player put. */
    previousWord: string | undefined;

    /** The number of points the player's previous word was worth. */
    previousWordPoints: number | undefined;

    /** The number of points the player currently has. */
    playerPoints: number;

    /** Wether or not its the players turn. */
    isPlaying: boolean;
}

/**
 * A component that display's a players information.
 */
export const PlayerFrame = (playerFrameProps: PlayerFrameProps) =>
{
    return (
        <div 
            className=
            {`
                w-full h-14 border-box p-3 bg-slate-800 text-white flex items-center rounded-xl 
                ${playerFrameProps.isPlaying ? "border-indigo-400 border-2" : ""}
            `}
        >
            <div className="bg-gray-100 rounded-full h-8 w-8 box-border mr-4">

            </div>
            <div>
                <span className="font-semibold block">
                    {playerFrameProps.playerName}
                </span>
                {playerFrameProps.previousWord && playerFrameProps.previousWordPoints && (
                    <span className="text-xs block">
                        {playerFrameProps.previousWord} +{playerFrameProps.previousWordPoints}
                    </span>
                )}
            </div>
            <div className="h-8 w-8 bg-slate-700 text-color flex justify-center items-center rounded-full ml-auto text-sm select-none">
                {playerFrameProps.playerPoints}
            </div>
        </div>
    )
}