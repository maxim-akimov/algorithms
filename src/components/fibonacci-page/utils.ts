export function * getFibonacci(n: number): Generator<number[]> {
  let i = 0;
  let prev = 0;
  let next = 1;

  let arr: number[] = [];

  while (i < n) {
    next = prev + next;
    prev = next - prev;

    yield arr = [...arr, prev];
    i++;
  }

  //return prev;
}