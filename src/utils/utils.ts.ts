export const swap = <T>(arr: Array<T>, firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export const delay = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);