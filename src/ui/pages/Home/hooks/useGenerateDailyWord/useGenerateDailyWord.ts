import { useState, useCallback, useEffect } from 'react';

export const useGenerateDailyWord = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateRandomWord = useCallback(async () => {
    setIsLoading(true);

    try {
      // Carregar o arquivo words.txt
      const response = await fetch('/src/ui/pages/Home/hooks/useGenerateDailyWord/words.txt');
      const text = await response.text();

      // Dividir em linhas e filtrar palavras vazias
      const words = text.split('\n').filter((word) => word.trim().length > 0);

      if (words.length === 0) {
        throw new Error('Nenhuma palavra encontrada no arquivo');
      }

      // Selecionar uma palavra aleatória
      const randomIndex = Math.floor(Math.random() * words.length);
      const selectedWord = words[randomIndex].trim();

      console.info('random index', randomIndex);
      console.info('selectedWord', selectedWord);

      setCurrentWord(selectedWord);
    } catch (error) {
      console.error('Erro ao carregar palavras:', error);
      setCurrentWord('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    generateRandomWord();
  }, []);

  return {
    currentWord,
    isLoading,
    generateRandomWord,
  };
};
