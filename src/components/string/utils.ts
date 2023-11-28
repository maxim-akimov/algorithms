import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils.ts";
import { AlgState } from "./types";


export function* getReverseString(str: string): Generator<AlgState> {
  const arr = Array.from(str);

  if (arr.length === 1) {
    yield {
      letters: arr,
      states: [ElementStates.Modified]
    };
    return;
  }

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    yield {
      letters: arr,
      states: arr.map((el, i) =>
        (i === start || i === end)
          ? ElementStates.Changing
          : (i < start || i > end)
            ? ElementStates.Modified
            : ElementStates.Default),
    };

    swap(arr, start, end);

    yield {
      letters: arr,
      states: arr.map((el, i) =>
        (i === start || i === end || start === end)
          ? ElementStates.Modified
          : (i < start || i > end)
            ? ElementStates.Modified
            : ElementStates.Default),
    };

    start++;
    end--;
  }
}