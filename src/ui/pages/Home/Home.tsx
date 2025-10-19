import { InputSingleLetter } from 'components/InputSingleLetter/InputSingleLetter';
import { useGenerateDailyWord } from './hooks/useGenerateDailyWord/useGenerateDailyWord';
import { useGuessWord } from './hooks/useGuessWord/useGuessWord';
import { Header } from 'components/Header/Header';
import { Keyboard } from 'components/Keyboard/Keyboard';
import { useEffect } from 'react';

export const Home = () => {
  const { currentWord } = useGenerateDailyWord();
  const { maxTries, currentTry, register, handleKeyDown, guessedWords, focusOnFirstElement } =
    useGuessWord({
      currentWord,
    });

  useEffect(() => {
    focusOnFirstElement();
  }, [focusOnFirstElement]);

  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-center gap-2'>
        <span>{currentWord} [esconder]</span>
        {currentTry <= maxTries && (
          <form className='flex flex-col' onKeyDown={(e) => handleKeyDown(e)}>
            <div className='flex flex-row gap-1'>
              <InputSingleLetter {...register('letter-1.letter')} id='first-input' />
              <InputSingleLetter {...register('letter-2.letter')} />
              <InputSingleLetter {...register('letter-3.letter')} />
              <InputSingleLetter {...register('letter-4.letter')} />
              <InputSingleLetter {...register('letter-5.letter')} />
            </div>
          </form>
        )}
        {Array.from({ length: maxTries }, (_, index) => {
          if (index + 1 !== currentTry) {
            return (
              <div key={index} className='flex flex-row gap-1'>
                <InputSingleLetter disabled letterState={guessedWords[index]?.['letter-1']} />
                <InputSingleLetter disabled letterState={guessedWords[index]?.['letter-2']} />
                <InputSingleLetter disabled letterState={guessedWords[index]?.['letter-3']} />
                <InputSingleLetter disabled letterState={guessedWords[index]?.['letter-4']} />
                <InputSingleLetter disabled letterState={guessedWords[index]?.['letter-5']} />
              </div>
            );
          }
        })}
        <Keyboard onClick={() => {}} />
      </main>
    </>
  );
};
