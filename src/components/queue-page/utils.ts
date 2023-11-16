import { IQueue } from "./types";

export class Queue<T> implements IQueue<T> {
  private readonly container: (T | null)[] = [];
  private head: number = 0;
  private tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    if (this.tail > this.size - 1) {
      this.tail = 1;
    } else {
      this.tail++;
    }
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    if (this.head + 1 > this.size - 1) {
      this.head = 0
    } else {
      this.head++;
    }
    this.length--;

    if (this.length === 0) {
      this.head = 0;
      this.tail =0;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[(this.head || 0) % this.size] || null;
  };

  isEmpty = () => this.length === 0;

  getLength = () => this.length;

  getSize = () => this.size;

  getElements = () => this.container;

  clear = () => {
    this.length = 0;
    this.head = 0;
    this.tail = 0;

    for (let i = 0; i < this.container.length; i++) {
      this.container[i] = null;
    }
  };

  getHead = () => this.head;

  getTail = () => this.tail;
}