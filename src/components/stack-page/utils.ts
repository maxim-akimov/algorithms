import { ElementStates } from "../../types/element-states";
import { IStack } from "./types";


export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.container.length - 1] || null;
  };

  clear = () => {
    this.container = [];
  }

  getSize = () => this.container.length;

  getElements = () => this.container;
}