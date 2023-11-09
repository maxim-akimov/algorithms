import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack.module.css';
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";


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

  const [form, handleChange] = useForm();

  const stack = new Stack<number | string>();


  useEffect(() => {
    if (form.val && form.val.length > 0) {
      setDisabledAdd(false)
    }
  }, [form])

  console.log(stack.getSize())

  useEffect(() => {
    if (stackState && stackState.length > 0 ) {
      setDisabledDelete(false);
      setDisabledClear(false);
    } else {
      setDisabledDelete(true);
      setDisabledClear(true);
    }
  }, [stackState])


  const handleAddClick = (e: FormEvent) => {
    e.preventDefault();

    stack.push(form.val);
    console.log(stackState)
    setStackState([...stackState, ...stack.getElements()]);
  }


  const handleDeleteClick = (e: FormEvent) => {
    e.preventDefault();

  }


  const handleClearClick = (e: FormEvent) => {
    e.preventDefault();

  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input name={'val'} type={'text'} placeholder={'Введите текст'} maxLength={4} isLimitText={true}
               extraClass={styles.input} onChange={handleChange} value={form.val || ''} />
        <Button text={'Добавить'} type={'button'} isLoader={isProcessAdd}
                disabled={isDisabledAdd} onClick={handleAddClick}/>
        <Button text={'Удалить'} type={'button'} isLoader={isProcessDelete}
                disabled={isDisabledDelete} onClick={handleDeleteClick}/>
        <Button text={'Очистить'} type={'button'} disabled={isDisabledClear} onClick={handleClearClick}
                extraClass={styles.ml}/>
      </form>
      <section className={styles.result}>
        {[].map((el, i) => (
          <Column key={i} index={el} state={el}/>
        ))}
      </section>
    </SolutionLayout>
  );
};
