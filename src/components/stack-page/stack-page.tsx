import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack.module.css';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  getElements: () => T[] | null;
}

type StackStateElement = {
  element: string | number;
  state: ElementStates
}


class Stack<T> implements IStack<T> {
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


export const StackPage: React.FC = () => {
  const [isProcessAdd, setProcessAdd] = useState(false);
  const [isProcessDelete, setProcessDelete] = useState(false);

  const [isDisabledAdd, setDisabledAdd] = useState(true);
  const [isDisabledDelete, setDisabledDelete] = useState(true);
  const [isDisabledClear, setDisabledClear] = useState(true);

  const [stackState, setStackState] = useState<(string | number)[]>([]);
  const [lastElState, setLasElState] = useState({ index: 0, state: ElementStates.Changing})

  const [form, handleChange, setValues] = useForm();

  const stack = useMemo(() => {
    return new Stack<number | string>()
  }, [])


  useEffect(() => {
    if (form.val && form.val.length > 0) {
      setDisabledAdd(false)
    } else {
      setDisabledAdd(true)
    }
  }, [form])


  useEffect(() => {
    if (stackState && stackState.length > 0) {
      setDisabledDelete(false);
      setDisabledClear(false);
    } else {
      setDisabledDelete(true);
      setDisabledClear(true);
    }
  }, [stackState])


  const handleAddClick = (e: FormEvent) => {
    e.preventDefault();

    setProcessAdd(true);

    stack.push(form.val);
    const elements = stack.getElements();
    setStackState([...elements]);

    setLasElState({ index: elements.length - 1, state: ElementStates.Changing})

    setTimeout(() => {
      setLasElState({ index: elements.length - 1, state: ElementStates.Default})
      setProcessAdd(false);
    }, SHORT_DELAY_IN_MS)

    setValues({ val: '' });
  }


  const handleDeleteClick = (e: FormEvent) => {
    e.preventDefault();

    setProcessDelete(true);

    const elements = stack.getElements();

    setLasElState({ index: elements.length - 1, state: ElementStates.Changing})

    setTimeout(() => {
      stack.pop();
      setStackState([...stack.getElements()]);
      setLasElState({ index: elements.length - 1, state: ElementStates.Default})
      setProcessDelete(false);
    }, SHORT_DELAY_IN_MS)
  }


  const handleClearClick = (e: FormEvent) => {
    e.preventDefault();

    stack.clear();
    setStackState([...stack.getElements()]);
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleAddClick}>
        <Input name={'val'} type={'text'} placeholder={'Введите текст'} maxLength={4} isLimitText={true}
               extraClass={styles.input} onChange={handleChange} value={form.val || ''}/>
        <Button text={'Добавить'} type={'button'} isLoader={isProcessAdd}
                disabled={isDisabledAdd} onClick={handleAddClick}/>
        <Button text={'Удалить'} type={'button'} isLoader={isProcessDelete}
                disabled={isDisabledDelete} onClick={handleDeleteClick}/>
        <Button text={'Очистить'} type={'button'} disabled={isDisabledClear} onClick={handleClearClick}
                extraClass={styles.ml}/>
      </form>
      <section className={styles.result}>
        {stackState.map((el, i) => (
          <Circle key={i} index={i} state={(i === lastElState.index) ? lastElState.state : ElementStates.Default  } head={(i === 0) ? 'head' : ''}
                  tail={(i === stackState.length - 1) ? 'tail' : ''} letter={el.toString()}/>
        ))}
      </section>
    </SolutionLayout>
  );
};
