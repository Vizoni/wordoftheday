export const sanitizeLetter = (letter: string) => {
  return letter
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[Çç]/g, (match) => (match === 'Ç' ? 'C' : 'c'))
    .toUpperCase();
};
