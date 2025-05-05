export const debounce = (fn: () => void) => {
  let timer: number;
  return (cleanup: () => void) => (time: number) => {
    if (timer) clearTimeout(timer);
    fn();
    timer = window.setTimeout(() => {
      cleanup();
    }, time);
  };
};
