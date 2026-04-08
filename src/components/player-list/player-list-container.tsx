import type { PlayerData } from "../../types/player-data";
import { PlayerFrame } from "./player-frame"


type PlayerListContainerProps = 
{
    playerData: PlayerData[];
}

export const PlayerListContainer = (playerListProps: PlayerListContainerProps) => {
    return (
        <div className="w-64 p-3 bg-slate-950 rounded-xl">
            <span className="w-full text-white">
                Round 1/5
            </span>

            <div className="flex flex-col gap-3 mt-3">
                {
                    playerListProps.playerData.map((player, index) => (
                        <PlayerFrame
                            key={index}
                            playerData={player}
                        />
                    ))
                }
          </div>
        </div>
    )
}