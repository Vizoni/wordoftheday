import { InputHTMLAttributes, useState } from 'react';

type InputSingleLetterProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onBlur?: () => void;
  onChange?: () => void;
  // onChange?: (value: string) => void;
};

export const InputSingleLetter = ({
  className,
  onBlur,
  onChange,
  ...props
}: InputSingleLetterProps) => {
  const [touched, setTouched] = useState(false);

  return (
    <div className='relative' data-touched={touched}>
      <input
        {...props}
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        onChange={(e) => {
          onChange?.(e);
        }}
      />
    </div>
  );
};
