import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const letterValidation = z.string().refine((val) => val === '' || /^[a-zA-ZÀ-ÿ]$/.test(val), {
  message: 'Deve ser vazio ou apenas uma letra',
});

const guessSchema = z.object({
  'letter-1': letterValidation,
  'letter-2': letterValidation,
  'letter-3': letterValidation,
  'letter-4': letterValidation,
  'letter-5': letterValidation,
});

const defaultValues = {
  'letter-1': '',
  'letter-2': '',
  'letter-3': '',
  'letter-4': '',
  'letter-5': '',
};

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
  } = useForm<GuessSchemaType>({
    resolver: zodResolver(guessSchema),
    defaultValues,
  });

  const submitGuess = (data: GuessSchemaType) => {
    console.info('submitGuess', data);
    setGuessedLetters((prev) => [...prev, data]);
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
  };
};
