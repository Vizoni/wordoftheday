import { InputHTMLAttributes, forwardRef } from 'react';

type InputSingleLetterProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputSingleLetter = forwardRef<HTMLInputElement, InputSingleLetterProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`border border-gray-300 rounded-md p-2 w-12 h-12 text-center uppercase ${className || ''}`}
        maxLength={1}
      />
    );
  }
);
