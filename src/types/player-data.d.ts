export type PlayerData = 
{
    id: string;
    name: string;
    points: number;
    isPlaying: boolean,
    previousWord: string | undefined;
    previousWordPoints: number | undefined;
}