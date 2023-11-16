import { ILinkedList } from "./types";

export class Node<T> {
  value: T | ''
  next: Node<T> | null

  constructor(value: T | '', next?: Node<T> | null) {
    this.value = value || '';
    this.next = (next === undefined ? null : next);
  }
}



export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr: Node<T> | null = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        while (currIndex < index && curr) {
          if (++currIndex < index && curr.next) {
            curr = curr.next;
          }
        }

        // добавить элемент
        if (curr && curr.next) {
          node.next = curr.next;
          curr.next = node;
        }
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  remove(val: T) {
    let dummyHead = new Node<T>('');
    dummyHead.next = this.head;
    let curr: Node<T> | null = dummyHead;

    // Ваш код...
    while (curr && curr.next) {
      const nextNode: Node<T> | null = curr.next;
      if (nextNode && nextNode.value === val) {
        curr.next = nextNode.next;
        continue;
      }
      curr = nextNode;
    }
    this.head = dummyHead.next;
    //return dummyHead.next;
  };

  getSize() {
    return this.size;
  }

  getElements() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}