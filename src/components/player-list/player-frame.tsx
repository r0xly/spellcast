import type { PlayerData } from "../../types/player-data"

type PlayerFrameProps = 
{
    playerData: PlayerData,
}

/**
 * A component that display's a players information.
 */
export const PlayerFrame = ({ playerData }: PlayerFrameProps) =>
{
    return (
        <div 
            className=
            {`
                w-full h-14 border-box p-3 bg-slate-800 text-white flex items-center rounded-xl 
                ${playerData.isPlaying ? "border-indigo-400 border-2" : ""}
            `}
        >
            <div className="bg-gray-100 rounded-full h-8 w-8 box-border mr-4">

            </div>
            <div>
                <span className="font-semibold block">
                    {playerData.name}
                </span>
                {playerData.previousWord && playerData.previousWordPoints && (
                    <span className="text-xs block uppercase">
                        {playerData.previousWord} +{playerData.previousWordPoints}
                    </span>
                )}
            </div>
            <div className="h-8 w-8 bg-slate-700 text-color flex justify-center items-center rounded-full ml-auto text-sm select-none">
                {playerData.points}
            </div>
        </div>
    )
}