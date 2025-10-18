import { GuessSchemaType } from '../../useGuessWord';

export type UseCompareWordType = {
  wordOfTheDay: string;
};
export const useCompareWord = ({ wordOfTheDay }: UseCompareWordType) => {
  const doesLetterExistInWord = (letter: string) => {
    return wordOfTheDay.includes(letter);
  };

  const isLetterInCorrectPosition = (letter: string, position: number) => {
    return wordOfTheDay.charAt(position) === letter;
  };

  const compareWord = (inputWord: GuessSchemaType): GuessSchemaType => {
    const result: GuessSchemaType = {
      'letter-1': { ...inputWord['letter-1'] },
      'letter-2': { ...inputWord['letter-2'] },
      'letter-3': { ...inputWord['letter-3'] },
      'letter-4': { ...inputWord['letter-4'] },
      'letter-5': { ...inputWord['letter-5'] },
    };

    Object.keys(result).forEach((key, index) => {
      const letterKey = key as keyof GuessSchemaType;
      const letter = inputWord[letterKey].letter;

      result[letterKey] = {
        letter,
        exists: doesLetterExistInWord(letter),
        isInCorrectPosition: isLetterInCorrectPosition(letter, index),
      };
    });

    return result;
  };

  return {
    compareWord,
  };
};
