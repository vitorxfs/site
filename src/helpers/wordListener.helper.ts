import { debounce } from './timing.helper';

export const addWordListener = (word: string, action: () => void, debounceTime = 2000) => {
  let wordBuff: string = '';
  document.addEventListener('keydown', (e) => {
    debounce(() => {
      wordBuff = wordBuff + e.key;
      if (wordBuff.indexOf(word) !== -1) action();
    })(() => {
      wordBuff = '';
    })(debounceTime);
  });
};
