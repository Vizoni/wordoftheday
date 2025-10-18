import { useCallback } from 'react';
import { GuessSchemaType } from '../../useGuessWord';
import { sanitizeLetter } from 'utils/sanitzeLetter';

export type UseCompareWordType = {
  wordOfTheDay: string;
};
export const useCompareWord = ({ wordOfTheDay }: UseCompareWordType) => {
  const sanitizeWord = useCallback(() => sanitizeLetter(wordOfTheDay), [wordOfTheDay]);

  const doesLetterExistInWord = (letter: string) => {
    const sanitizedWordOfTheDay = sanitizeWord();
    const sanitizedLetter = sanitizeLetter(letter);

    return sanitizedWordOfTheDay.includes(sanitizedLetter);
  };

  const isLetterInCorrectPosition = (letter: string, position: number) => {
    return wordOfTheDay.charAt(position) === letter;
  };

  const getCorrectLetterAtPosition = (position: number) => {
    return wordOfTheDay.charAt(position);
  };

  const isInputLetterSameAsSanitizedCorrectLetter = (inputLetter: string, position: number) => {
    const correctLetter = getCorrectLetterAtPosition(position);
    const sanitizedCorrectLetter = sanitizeLetter(correctLetter);
    const sanitizedInputLetter = sanitizeLetter(inputLetter);

    return sanitizedCorrectLetter === sanitizedInputLetter;
  };

  const formatLetterToBeCorrect = (letter: string, position: number) => {
    // Se a letra já está na posição correta, retorna ela mesma
    if (isLetterInCorrectPosition(letter, position)) {
      return letter;
    }

    // Se a letra digitada é a versão sem acento da letra correta, retorna a versão com acento
    if (isInputLetterSameAsSanitizedCorrectLetter(letter, position)) {
      return getCorrectLetterAtPosition(position);
    }

    // Caso contrário, retorna a letra original
    return letter;
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
      const formattedLetter = formatLetterToBeCorrect(letter, index);

      result[letterKey] = {
        letter: formattedLetter,
        exists: doesLetterExistInWord(letter),
        isInCorrectPosition: isLetterInCorrectPosition(formattedLetter, index),
      };
    });

    return result;
  };

  return {
    compareWord,
  };
};
