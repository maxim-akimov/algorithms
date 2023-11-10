import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue.module.css';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


interface IQueue<T> {
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

type HighlightState = {
  index: number | null;
  state: ElementStates;
}

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


export const QueuePage: React.FC = () => {
  const [isProcessAdd, setProcessAdd] = useState(false);
  const [isProcessDelete, setProcessDelete] = useState(false);

  const [isDisabledInput, setDisabledInput] = useState(false);
  const [isDisabledAdd, setDisabledAdd] = useState(true);
  const [isDisabledDelete, setDisabledDelete] = useState(true);
  const [isDisabledClear, setDisabledClear] = useState(true);

  const [queueState, setQueueState] = useState<(string | number | null)[]>([]);
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<HighlightState>({ index: null, state: ElementStates.Changing });

  const [form, handleChange, setValues] = useForm();


  const queue = useMemo(() => {
    return new Queue<number | string>(7)
  }, [])


  useEffect(() => {
    const elements = queue.getElements();
    setQueueState([...elements]);

    if (form.val && form.val.length > 0) {
      setDisabledAdd(false)
    } else {
      setDisabledAdd(true)
    }
  }, [form])


  useEffect(() => {
    if (!queue.isEmpty()) {
      setDisabledDelete(false);
      setDisabledClear(false);
    } else {
      setDisabledDelete(true);
      setDisabledClear(true);
    }

    if (queue.getLength() === queue.getSize()) {
      setDisabledInput(true);
    } else {
      setDisabledInput(false);
    }
  }, [queueState])


  const handleAddClick = (e: FormEvent) => {
    e.preventDefault();

    setProcessAdd(true);

    queue.enqueue(form.val);
    const elements = queue.getElements();
    const headIndex = queue.getHead();
    const tailIndex = queue.getTail();

    setQueueState([...elements]);

    setHead(headIndex);
    setTail(tailIndex - 1);
    setHighlight({ index: tailIndex - 1, state: ElementStates.Changing} );

    setTimeout(() => {
      setTail(tailIndex - 1)
      setHighlight({ index: tailIndex - 1, state: ElementStates.Default} );

      setProcessAdd(false);
    }, SHORT_DELAY_IN_MS)

    setValues({ val: '' });
  }


  const handleDeleteClick = (e: FormEvent) => {
    e.preventDefault();

    setProcessDelete(true);

    const elements = queue.getElements();
    let deletedElementIndex = queue.getHead();
    setHighlight({ index: deletedElementIndex, state: ElementStates.Changing} );

    setTimeout(() => {
      queue.dequeue();

      let headIndex;
      let tailIndex;

      if (queue.getLength() === 0) {
        headIndex = null;
        tailIndex = null;
      } else {
        headIndex = queue.getHead();
        tailIndex = queue.getTail() - 1;
      }

      setQueueState([...elements]);
      setHead(headIndex)
      setTail(tailIndex)
      setHighlight({ index: headIndex, state: ElementStates.Default} );

      setProcessDelete(false);
    }, SHORT_DELAY_IN_MS)
  }


  const handleClearClick = (e: FormEvent) => {
    e.preventDefault();

    queue.clear();
    setQueueState([...queue.getElements()]);
  }


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleAddClick}>
        <Input name={'val'} type={'text'} placeholder={'Введите текст'} maxLength={4} isLimitText={true}
               extraClass={styles.input} onChange={handleChange} value={form.val || ''} disabled={isDisabledInput}/>
        <Button text={'Добавить'} type={'button'} isLoader={isProcessAdd}
                disabled={isDisabledAdd} onClick={handleAddClick}/>
        <Button text={'Удалить'} type={'button'} isLoader={isProcessDelete}
                disabled={isDisabledDelete} onClick={handleDeleteClick}/>
        <Button text={'Очистить'} type={'button'} disabled={isDisabledClear} onClick={handleClearClick}
                extraClass={styles.ml}/>
      </form>
      <section className={styles.result}>
        {queueState.map((el, i) => (
          <Circle key={i} index={i} state={(i === highlight.index) ? highlight.state : ElementStates.Default}
                  head={(i === head) ? 'head' : ''}
                  tail={(i === tail) ? 'tail' : ''} letter={(el) ? el.toString() : ''}/>
        ))}
      </section>
    </SolutionLayout>
  );
};
