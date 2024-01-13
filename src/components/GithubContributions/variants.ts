import { tv } from 'tailwind-variants';

export const contributionItemVariants = tv({
  base: 'rounded-sm w-[12px] h-[12px] border',
  variants: {
    color: {
      default: 'bg-green-800 border-green-900 dark:bg-green-400 dark:border-green-300',
      primary: 'bg-yellow-800 border-yellow-900 dark:bg-yellow-400 dark:border-yellow-300',
      secondary: 'bg-purple-800 border-purple-900 dark:bg-purple-400 dark:border-purple-300',
    },
    count: {
      0: 'bg-gray-300 border-gray-300 dark:bg-gray-800 dark:border-gray-800',
      1: 'opacity-[0.4]',
      2: 'opacity-[0.6]',
      3: 'opacity-[0.8]',
      4: `opacity-1`,
    },
  },
});

export default contributionItemVariants;
