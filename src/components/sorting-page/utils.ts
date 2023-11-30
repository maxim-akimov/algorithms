import { ElementStates } from "../../types/element-states";
import { AlgState } from "./types";
import { Direction } from "../../types/direction";
import { swap } from "../../utils/utils.ts";


export const getRandomArray = (): AlgState => {
  const numbersArray: number[] = [];
  const statesArray: ElementStates[] = [];
  const size = Math.floor(Math.random() * (17 - 3) + 3);

  for (let i = 0; i < size; i++) {
    numbersArray.push(Math.floor(Math.random() * 100));
    statesArray.push(ElementStates.Default);
  }

  return {
    numbers: numbersArray,
    states: statesArray
  };
}


export function* sortSelection(arr: number[], direction: Direction): Generator<AlgState> {
  const { length } = arr;

  if (length === 1 ) {
    yield {
      numbers: arr,
      states:[ElementStates.Modified]
    }
    return;
  }

  for (let i = 0; i < length; i++) {
    yield {
      numbers: arr,
      states: arr.map((el, ind) =>
        (i === ind)
          ? ElementStates.Changing
          : (ind < i) ? ElementStates.Modified : ElementStates.Default)
    }

    let minMaxInd = i;
    for (let k = i; k < length; k++) {
      yield {
        numbers: arr,
        states: arr.map((el, ind) =>
          (ind === i || ind === k)
            ? ElementStates.Changing
            : (ind < i) ? ElementStates.Modified : ElementStates.Default)
      }

      if ((direction === Direction.Descending && arr[k] > arr[minMaxInd])
        || direction === Direction.Ascending && arr[k] < arr[minMaxInd]) {
        minMaxInd = k;
      }
    }

    swap(arr, i, minMaxInd);

    yield {
      numbers: arr,
      states: arr.map((el, ind) =>
        (ind === minMaxInd || ind === i || ind < i)
          ? ElementStates.Modified
          : ElementStates.Default)
    }
  }
}


export function* sortBubble(arr: number[], direction: Direction) {
  const { length } = arr;

  if (length === 1 ) {
    yield {
      numbers: arr,
      states:[ElementStates.Modified]
    }
    return;
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      yield {
        numbers: arr,
        states: arr.map((el, ind) =>
          (ind === j || ind === j + 1)
          ? ElementStates.Changing
          : (ind > j && ind > length - i - 1) ? ElementStates.Modified : ElementStates.Default)
      }

      if ((direction === Direction.Ascending && arr[j] > arr[j + 1])
        || (direction === Direction.Descending && arr[j] < arr[j + 1])) {
        swap(arr, j, j + 1);
      }

      yield {
        numbers: arr,
        states: arr.map((el, ind) =>
          ((ind === j || ind === j + 1) && i !== length - 2)
          ? ElementStates.Changing
          : (ind > j && ind > length - i - 1)
            ? ElementStates.Modified
            : (j === 0 && i === length - 2) ? ElementStates.Modified : ElementStates.Default)
      }
    }
  }
}