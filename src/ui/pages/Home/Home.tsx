import { InputSingleLetter } from 'components/InputSingleLetter/InputSingleLetter';
import { useGenerateDailyWord } from './hooks/useGenerateDailyWord/useGenerateDailyWord';
import { useGuessWord } from './hooks/useGuessWord/useGuessWord';

export const Home = () => {
  const { currentWord } = useGenerateDailyWord();
  const { maxTries, currentTry } = useGuessWord();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1>Word of the day: {currentWord} [esconder]</h1>
      {Array.from({ length: maxTries }, (_, i) => (
        <div className='flex flex-column gap-7' key={i}>
          <div className={`flex flex-column gap-2 ${currentTry === i + 1 ? 'active' : ''}`}>
            <InputSingleLetter />
            <InputSingleLetter />
            <InputSingleLetter />
            <InputSingleLetter />
            <InputSingleLetter />
            <InputSingleLetter />
          </div>
        </div>
      ))}
    </div>
  );
};
