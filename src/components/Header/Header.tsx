import { LightBulbIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { cn } from 'utils/cn';

export const Header = () => (
  <header className={cn('flex justify-between items-center w-full text-white p-4')}>
    <button type='button' className='p-2 rounded-md'>
      <LightBulbIcon className='w-6 h-6' />
    </button>
    <span className='text-lg font-bold'>WORDOFTHEDAY</span>
    <button type='button' className='p-2 rounded-md'>
      <Cog6ToothIcon className='w-6 h-6' />
    </button>
  </header>
);
