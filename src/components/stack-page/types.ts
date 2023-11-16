import { ElementStates } from "../../types/element-states";

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  getElements: () => T[] | null;
}

export type StackStateElement = {
  element: string | number;
  state: ElementStates
}