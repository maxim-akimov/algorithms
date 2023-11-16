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


export function * sortSelection(arr: number[], direction: Direction): Generator<AlgState> {
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    yield {
      numbers: arr,
      states: arr.map((el, ind) => (i === ind) ? ElementStates.Changing : ElementStates.Default)
    }
    // arr[i].state = ElementStates.Changing;
    // setAlgorithmState([...arr]);

    let minMaxInd = i;
    for (let k = i; k < length; k++) {
      yield {
        numbers: arr,
        states: arr.map((el, ind) => (ind === i || ind === k) ? ElementStates.Changing : ElementStates.Default)
      }
      // arr[k].state = ElementStates.Changing;
      // setAlgorithmState([...arr]);
      // await delay(SHORT_DELAY_IN_MS);

      if ((direction === Direction.Descending && arr[k] > arr[minMaxInd])
        || direction === Direction.Ascending && arr[k] < arr[minMaxInd]) {

        minMaxInd = k;
      }
    }
    yield {
      numbers: arr,
      states: arr.map((el, ind) => (ind === minMaxInd ) ? ElementStates.Modified : ElementStates.Default)
    }
    // await delay(SHORT_DELAY_IN_MS);
    // arr[minMaxInd].state = ElementStates.Modified;
    swap(arr, i, minMaxInd);
    yield {
      numbers: arr,
      states: arr.map((el, ind) => (ind === minMaxInd || ind === i) ? ElementStates.Modified : ElementStates.Default)
    }
    // setAlgorithmState(arr);
  }
  // yield {
  //   numbers: arr,
  //   states: []
  // };
}




export function * sortBubble(arr: number[], direction: Direction) {

}