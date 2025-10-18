import { cn } from 'utils/cn';

type KeyboardProps = {
  onClick: () => void;
};

export const Keyboard = ({ onClick }: KeyboardProps) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'backspace'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
  ];
  return (
    <section>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='flex justify-center mb-2'>
          {row.map((key) => (
            <button
              key={key}
              onClick={onClick}
              type='button'
              className={cn(
                'm-1 px-3 py-2 rounded-md bg-darker text-white font-bold uppercase',
                key === 'enter' ? 'w-20' : 'w-10'
              )}
            >
              {key === 'backspace' ? '⌫' : key === 'enter' ? 'Enter' : key}
            </button>
          ))}
        </div>
      ))}
    </section>
  );
};
