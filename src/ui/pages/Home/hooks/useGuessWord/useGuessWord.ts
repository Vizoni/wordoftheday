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

const inputNames = [
  'letter-1.letter',
  'letter-2.letter',
  'letter-3.letter',
  'letter-4.letter',
  'letter-5.letter',
];

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
    setFocus,
  } = useForm<GuessSchemaType>({
    resolver: zodResolver(guessSchema),
    defaultValues: formDefaultValues,
  });

  const handleRegister = (input: any) => {
    const { name, onChange, ...rest } = register(input);
    return {
      name,
      onChange: (e: any) => {
        onChange(e);
        setFocus(inputNames[inputNames.indexOf(name) + 1] as any);
      },
      ...rest,
    };
  };

  const updateGuessedLettersWithComparison = (data: GuessSchemaType) => {
    const response = compareWord(data);
    setGuessedWords((prev) => [...prev, response]);
  };

  const getNewFocusAfterKeyPress = (currentInput: string, key: string) => {
    const currentIndex = inputNames.indexOf(currentInput);
    if (key === 'ArrowLeft') {
      setFocus(inputNames[currentIndex - 1] as any);
    } else if (key === 'ArrowRight') {
      setFocus(inputNames[currentIndex + 1] as any);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(submitGuess)(e);
    }
    getNewFocusAfterKeyPress(e.target.name, e.key);
  };

  const submitGuess = (data: GuessSchemaType) => {
    updateGuessedLettersWithComparison(data);
    reset();
    setCurrentTry((prev) => prev + 1);
    setFocus('letter-1.letter');
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
    setFocus,
    handleRegister,
  };
};
