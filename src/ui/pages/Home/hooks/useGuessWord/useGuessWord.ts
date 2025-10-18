import { useState } from 'react';

export const useGuessWord = () => {
  const maxTries = 6;
  const [currentTry, setCurrentTry] = useState<number>(1);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  return {
    maxTries,
    currentTry,
    setCurrentTry,
    guessedLetters,
    setGuessedLetters,
  };
};
