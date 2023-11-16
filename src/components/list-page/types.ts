import { ElementStates } from "../../types/element-states";

export interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  remove: (val: T) => void;
  getSize: () => number;
  getElements: () => void;
}

export type ElementsActionsState = {
  index: number | null;
  letter?: string;
  state: ElementStates;
};

export type ActiveElementsState = {
  elements: number[];
  state: ElementStates;
};