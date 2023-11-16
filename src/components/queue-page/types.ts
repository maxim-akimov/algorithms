import { ElementStates } from "../../types/element-states";

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getLength: () => number;
  getSize: () => number;
  getElements: () => (T | null)[];
  clear: () => void;
  getHead: () => number | null;
  getTail: () => number | null;
}

export type HighlightState = {
  index: number | null;
  state: ElementStates;
}