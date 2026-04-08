import type { PlayerData } from "../types/player-data";

export class GameController    
{
    /** The player that is currently playing. */
    activePlayer: PlayerData | undefined;

    /** A map of player ids to their relative player objects. */
    playerDataMap: Map<string, PlayerData> = new Map();

    /** This method runs whenever any player's data is updated. */
    playerDataUpdated: ((players: PlayerData[]) => void) | undefined;

    /** This method runs whenever a round is updated. */
    roundUpdated: ((currentRound: number) => void) | undefined;

    
    maxRounds = 0;
    currentRound = 0;

    constructor(rounds: number)
    {
        this.registerPlayer("0", "Player 1");
        this.registerPlayer("1", "Player 2");
        this.setActivePlayer(this.getPlayers()[0]);

        this.maxRounds = rounds;
        this.currentRound;
    }

    getPlayers(): PlayerData[]
    {
        const players: PlayerData[] = [];

        this.playerDataMap.forEach((playerData, playerId) => 
        {
            players.push(playerData);
        });

        return players;
    }

    registerPlayer(id: string, name: string)
    {

        const playerData: PlayerData = 
        {
            name: name,
            id: id,
            points: 0,
            previousWord: undefined,
            previousWordPoints: undefined,
            isPlaying: false,
        }

        this.playerDataMap.set(id, playerData);

        if (this.playerDataUpdated)
        {
            this.playerDataUpdated(this.getPlayers());
        }
    }

    /**
     * Updates which player is currently playing in the game and remove the previous one. 
     * @param player The target player.
     */
    setActivePlayer(player: PlayerData)
    {
        if (this.activePlayer)
        {
            this.activePlayer.isPlaying = false;
        }

        this.activePlayer = player; 

        player.isPlaying = true;

        if (this.playerDataUpdated)
        {
            this.playerDataUpdated(this.getPlayers());
        }
    }

    currentPlayerIndex = 0;


    playTurn(points: number, word: string) {
        if (this.activePlayer) {
            this.activePlayer.points += points;
            this.activePlayer.previousWord = word;
            this.activePlayer.previousWordPoints = points;
        }

        const players = this.getPlayers();

        const prevIndex = this.currentPlayerIndex;
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % players.length;

        if (this.currentPlayerIndex === 0 && prevIndex !== 0) {
            this.currentRound++;

            if (this.roundUpdated)
            {
                this.roundUpdated(this.currentRound);
            }

            if (this.currentRound >= this.maxRounds) {
                alert("GAME OVER.")
                return;
            }
        }

        // Set next active player
        this.setActivePlayer(players[this.currentPlayerIndex]);

        if (this.playerDataUpdated) {
            this.playerDataUpdated(this.getPlayers());
        }
    }
}