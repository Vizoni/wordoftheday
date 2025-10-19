import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDefaultValues, guessSchema } from './useGuessWord.utils';
import { useCompareWord } from './hooks/useCompareWord/useCompareWord';

export type GuessSchemaType = z.infer<typeof guessSchema>;
export type LetterState = {
  letter: string;
  exists: boolean;
  isInCorrectPosition: boolean;
};

type UseGuessWordProps = {
  currentWord: string;
};

export const useGuessWord = ({ currentWord }: UseGuessWordProps) => {
  const maxTries = 5;
  const [currentTry, setCurrentTry] = useState<number>(1);
  const [guessedWords, setGuessedWords] = useState<GuessSchemaType[]>([]);

  const currentGuess = guessedWords[currentTry - 1] || '';

  const { compareWord } = useCompareWord({ wordOfTheDay: currentWord });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GuessSchemaType>({
    resolver: zodResolver(guessSchema),
    defaultValues: formDefaultValues,
  });

  const updateGuessedLettersWithComparison = (data: GuessSchemaType) => {
    const response = compareWord(data);
    setGuessedWords((prev) => [...prev, response]);
  };

  const handleKeyDown = (e: any) => {
    // const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(submitGuess)(e);
    }
  };

  const focusOnFirstElement = () => {
    document.getElementById('first-input')?.focus();
  };

  const submitGuess = (data: GuessSchemaType) => {
    console.info('submitGuess', data);
    setCurrentTry((prev) => prev + 1);
    reset();
    updateGuessedLettersWithComparison(data);
    focusOnFirstElement();
  };

  return {
    maxTries,
    currentTry,
    setCurrentTry,
    guessedWords,
    setGuessedWords,
    register,
    submitGuess,
    currentGuess,
    handleSubmit,
    errors,
    handleKeyDown,
    focusOnFirstElement,
  };
};
