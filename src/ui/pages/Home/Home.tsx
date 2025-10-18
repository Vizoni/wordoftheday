import { InputSingleLetter } from 'components/InputSingleLetter/InputSingleLetter';
import { useGenerateDailyWord } from './hooks/useGenerateDailyWord/useGenerateDailyWord';
import { useGuessWord } from './hooks/useGuessWord/useGuessWord';

export const Home = () => {
  const { currentWord } = useGenerateDailyWord();
  const { maxTries, currentTry, register, submitGuess, handleSubmit, errors } = useGuessWord();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1>Word of the day: {currentWord} [esconder]</h1>
      {Array.from({ length: maxTries }, (_, index) => {
        if (index + 1 !== currentTry) {
          return (
            <div key={index} className={`flex flex-row gap-2`}>
              <InputSingleLetter disabled />
              <InputSingleLetter disabled />
              <InputSingleLetter disabled />
              <InputSingleLetter disabled />
              <InputSingleLetter disabled />
            </div>
          );
        }
      })}
      {currentTry <= maxTries && (
        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(submitGuess)(e);
          }}
        >
          <div className='flex flex-row gap-2'>
            <InputSingleLetter {...register('letter-1')} />
            <InputSingleLetter {...register('letter-2')} />
            <InputSingleLetter {...register('letter-3')} />
            <InputSingleLetter {...register('letter-4')} />
            <InputSingleLetter {...register('letter-5')} />
          </div>
          <button type='submit' className='mt-2 p-2 bg-blue-500 text-white rounded-md'>
            Enviar (Tentativa {currentTry})
          </button>
        </form>
      )}
      {errors && <div style={{ color: 'red' }}>Erros: {JSON.stringify(errors, null, 2)}</div>}
    </div>
  );
};
