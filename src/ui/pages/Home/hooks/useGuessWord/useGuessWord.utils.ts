import { z } from 'zod';

const letterValidation = z
  .string()
  .toUpperCase()
  .refine((val) => val === '' || /^[a-zA-ZÀ-ÿ]$/.test(val), {
    message: 'Deve ser vazio ou apenas uma letra',
  });

export const guessSchema = z.object({
  'letter-1': z.object({
    exists: z.boolean(),
    isInCorrectPosition: z.boolean(),
    letter: letterValidation,
  }),
  'letter-2': z.object({
    exists: z.boolean(),
    isInCorrectPosition: z.boolean(),
    letter: letterValidation,
  }),
  'letter-3': z.object({
    exists: z.boolean(),
    isInCorrectPosition: z.boolean(),
    letter: letterValidation,
  }),
  'letter-4': z.object({
    exists: z.boolean(),
    isInCorrectPosition: z.boolean(),
    letter: letterValidation,
  }),
  'letter-5': z.object({
    exists: z.boolean(),
    isInCorrectPosition: z.boolean(),
    letter: letterValidation,
  }),
});

export const formDefaultValues = {
  'letter-1': {
    exists: false,
    isInCorrectPosition: false,
    letter: '',
  },
  'letter-2': {
    exists: false,
    isInCorrectPosition: false,
    letter: '',
  },
  'letter-3': {
    exists: false,
    isInCorrectPosition: false,
    letter: '',
  },
  'letter-4': {
    exists: false,
    isInCorrectPosition: false,
    letter: '',
  },
  'letter-5': {
    exists: false,
    isInCorrectPosition: false,
    letter: '',
  },
};
