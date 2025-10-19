import { InputHTMLAttributes, forwardRef } from 'react';
import type { LetterState } from 'ui/pages/Home/hooks/useGuessWord/useGuessWord';
import { cn } from 'utils/cn';

type InputSingleLetterProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  letterState?: LetterState;
};

export const InputSingleLetter = forwardRef<HTMLInputElement, InputSingleLetterProps>(
  ({ className, letterState, ...props }, ref) => {
    const getStateClasses = () => {
      if (!letterState || !letterState.letter) return '';

      return cn(
        letterState.exists && !letterState.isInCorrectPosition && 'wordle-letter-present',
        letterState.isInCorrectPosition && 'wordle-letter-correct',
        letterState.letter && !letterState.exists && 'wordle-letter-absent'
      );
    };

    return (
      <input
        ref={ref}
        {...props}
        value={letterState?.letter || props.value}
        className={cn(
          'border-3 rounded-md p-2 w-12 h-12 text-center uppercase font-bold',
          'wordle-letter-base',
          'wordle-letter-default',
          'focus:border-b-4 outline-none transition-all duration-200',
          getStateClasses(),
          className
        )}
        maxLength={1}
      />
    );
  }
);

InputSingleLetter.displayName = 'InputSingleLetter';
