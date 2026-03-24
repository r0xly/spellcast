/** A dictionary of characters to their default point value.  */
export const letterPoints: Record<string, number> = 
{
    a: 1,
    b: 4,
    c: 5,
    d: 3,
    e: 1,
    f: 5,
    g: 3,
    h: 4,
    i: 1,
    j: 7,
    k: 6,
    l: 3,
    m: 4,
    n: 2,
    o: 1,
    p: 4,
    q: 8,
    r: 2,
    s: 2,
    t: 2,
    u: 4,
    v: 5,
    w: 5,
    x: 7,
    y: 4,
    z: 8
};


/**
 * Generates a weighted random letter based on letter points.
 * Lower points = higher chance, higher points = lower chance.
 */
export function getWeightedRandomLetter(): Letter {
    // Create a weighted array based on points
    const weightedLetters: string[] = [];

    for (const [char, points] of Object.entries(letterPoints)) {
        // Weight is inverse of points: lower points = higher weight
        // Example: weight = 10 - points (so 1 point letters are more common than 8-point letters)
        const weight = Math.max(1, 10 - points);
        for (let i = 0; i < weight; i++) {
            weightedLetters.push(char);
        }
    }

    // Pick a random letter from the weighted array
    const randomIndex = Math.floor(Math.random() * weightedLetters.length);
    const character = weightedLetters[randomIndex];

    return new Letter(character, letterPoints[character], 0, 0);
}

export class Letter
{
    /** The singular character assoistated with the letter object. */
    public character: string;

    /** The points awarded by the letter. */
    public points: number;

    /** The row of the letter. */
    public x: number;

    /** The column of the letter. */
    public y: number;

    constructor(character: string, points: number, x: number, y: number)
    {
        this.character = character;
        this.points = points;
        this.x = x;
        this.y = y;
    }
}



/** A 2D representation of a grid of letters. */
export class LetterGrid
{
    /** 
     * An array of all letters in the letter grid. 
     * Index = x * columns + y
     */
    private letters: Letter[] = [];

    /** The numbers or rows in the grid. */
    private rows: number;
    
    /** The numbers of colums in the grid. */
    private columns: number;


    /** A method that runs everytime the letter grid is updated. */
    onUpdate: (() => void) | undefined;

    constructor(rows: number, columns: number)
    {
        this.rows = rows;
        this.columns = columns;

        this.randomizeGrid();
    }

    /**
     * Returns the letter at the specificed coordinate.
     * 
     * @param x The row of the letter.
     * @param y The column of the letter.
     */
    public getLetter(x: number, y: number): Letter
    {
        const index = x * this.columns + y;
        const letter = this.letters[index];

        return letter;
    }

    /**
     * Returns all letters in the grid.
     */
    public getsLetters(): Letter[]
    {
        const letters = this.letters;

        return letters;
    }

    /**
     * Sets the letter at the specificed coordinate.
     * 
     * @param x The row of the letter.
     * @param y The column of the letter.
     * @param letter The letter to be set.
     */
    public setLetter(x: number, y: number, letter: Letter): void
    {
        // TODO: Add out of bounds check.

        const index = x * this.columns + y;
        
        this.letters[index] = letter;

        letter.x = x;
        letter.y = y;

        if (this.onUpdate)
        {
            this.onUpdate();
        }
    }

    /**
     * Sets all the elements of the grid to a random element.
     */
    public randomizeGrid(): void
    {
        for (let x = 0; x < this.rows; x++)
        {
            for (let y = 0; y < this.columns; y++)
            {
                //const alphabet= "abcdefghijklmnopqrstuvwxyz";
                //const randomCharacterIndex = Math.floor(Math.random() * alphabet.length);
                //const character = alphabet[randomCharacterIndex];
                //let points = letterPoints[character];

                //if (points === undefined)
                //{
                //    console.warn(`Could not find a default points value for character <${character}>. Value was set to 1.`);
                //    points = 1;
                //}

                const letter = getWeightedRandomLetter();

                this.setLetter(x, y, letter);
            }
        }
    }
}