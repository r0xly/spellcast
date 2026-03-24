import wordsArray from ".././assets/words-dictionary.json";



export function isEnglishWord(word: string): boolean
{
        return (wordsArray as any)[word] == 1; 
}