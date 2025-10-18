import { InputSingleLetter } from 'components/InputSingleLetter/InputSingleLetter';
import { useGenerateDailyWord } from './hooks/useGenerateDailyWord/useGenerateDailyWord';
import { useGuessWord } from './hooks/useGuessWord/useGuessWord';

export const Home = () => {
  const { currentWord } = useGenerateDailyWord();
  const { maxTries, currentTry, register, handleKeyDown, errors, guessedLetters } = useGuessWord();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1>Word of the day: {currentWord} [esconder]</h1>
      {Array.from({ length: maxTries }, (_, index) => {
        if (index + 1 !== currentTry) {
          return (
            <div key={index} className={`flex flex-row gap-2`}>
              <InputSingleLetter disabled value={guessedLetters[index]?.['letter-1'].letter} />
              <InputSingleLetter disabled value={guessedLetters[index]?.['letter-2'].letter} />
              <InputSingleLetter disabled value={guessedLetters[index]?.['letter-3'].letter} />
              <InputSingleLetter disabled value={guessedLetters[index]?.['letter-4'].letter} />
              <InputSingleLetter disabled value={guessedLetters[index]?.['letter-5'].letter} />
            </div>
          );
        }
      })}
      {currentTry <= maxTries && (
        <form className='flex flex-col gap-4' onKeyDown={(e) => handleKeyDown(e)}>
          <div className='flex flex-row gap-2'>
            <InputSingleLetter {...register('letter-1.letter')} />
            <InputSingleLetter {...register('letter-2.letter')} />
            <InputSingleLetter {...register('letter-3.letter')} />
            <InputSingleLetter {...register('letter-4.letter')} />
            <InputSingleLetter {...register('letter-5.letter')} />
          </div>
        </form>
      )}
      {errors && <div style={{ color: 'red' }}>Erros: {JSON.stringify(errors, null, 2)}</div>}
    </div>
  );
};
