// utils/debounce.ts

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
