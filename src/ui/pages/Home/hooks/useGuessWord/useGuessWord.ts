import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDefaultValues, guessSchema } from './useGuessWord.utils';

export type GuessSchemaType = z.infer<typeof guessSchema>;

export const useGuessWord = () => {
  const maxTries = 5;
  const [currentTry, setCurrentTry] = useState<number>(1);
  const [guessedLetters, setGuessedLetters] = useState<GuessSchemaType[]>([]);

  const currentGuess = guessedLetters[currentTry - 1] || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GuessSchemaType>({
    resolver: zodResolver(guessSchema),
    defaultValues: formDefaultValues,
  });

  const handleKeyDown = (e: any) => {
    // const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(submitGuess)(e);
    }
  };

  const submitGuess = (data: GuessSchemaType) => {
    console.info('submitGuess', data);
    setGuessedLetters((prev) => [...prev, data]);
    setCurrentTry((prev) => prev + 1);
    reset();
  };

  return {
    maxTries,
    currentTry,
    setCurrentTry,
    guessedLetters,
    setGuessedLetters,
    register,
    submitGuess,
    currentGuess,
    handleSubmit,
    errors,
    handleKeyDown,
  };
};
