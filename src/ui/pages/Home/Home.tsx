import { InputSingleLetter } from 'components/InputSingleLetter/InputSingleLetter';
import { useGenerateDailyWord } from './hooks/useGenerateDailyWord/useGenerateDailyWord';
import { useGuessWord } from './hooks/useGuessWord/useGuessWord';
import { Header } from 'components/Header/Header';
import { Keyboard } from 'components/Keyboard/Keyboard';
import { useEffect } from 'react';

export const Home = () => {
  const { currentWord } = useGenerateDailyWord();
  const { maxTries, currentTry, handleKeyDown, guessedWords, setFocus, handleRegister } =
    useGuessWord({
      currentWord,
    });

  useEffect(() => {
    setFocus('letter-1.letter');
  }, []);

  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-center gap-2'>
        <span>{currentWord} [esconder]</span>
        {currentTry <= maxTries && (
          <form className='flex flex-col' onKeyDown={(e) => handleKeyDown(e)}>
            <div className='flex flex-row gap-1'>
              <InputSingleLetter {...handleRegister('letter-1.letter')} />
              <InputSingleLetter {...handleRegister('letter-2.letter')} />
              <InputSingleLetter {...handleRegister('letter-3.letter')} />
              <InputSingleLetter {...handleRegister('letter-4.letter')} />
              <InputSingleLetter {...handleRegister('letter-5.letter')} />
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
