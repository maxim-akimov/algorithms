import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

type ElementsActionsState = {
  index: number | null;
  letter?: string;
  state: ElementStates;
};

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      console.log(index, this.size)
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

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}


export const ListPage: React.FC = () => {
  const linkedList = useMemo(() => {
    return new LinkedList<number | string>();
  }, []);

  linkedList.append(Math.floor(Math.random() * 100))
  linkedList.append(Math.floor(Math.random() * 100))
  linkedList.append(Math.floor(Math.random() * 100))


  const initialBtnState = { isDisabled: true, isProcess: false };
  const initialElementsState = {
    index: null,
    letter: '',
    state: ElementStates.Default
  }

  const [addHeadBtnState, setAddHeadBtnState] = useState(initialBtnState);
  const [addTailBtnState, setAddTailBtnState] = useState(initialBtnState);
  const [addByIndexBtnState, setAddByIndexBtnState] = useState(initialBtnState);

  const [form, handleChange, setValues] = useForm();

  // Стейты для реализации анимации
  const [listState, setListState] = useState<(number | string | null)[]>(linkedList.print());
  // Стейт элемента, подлежащего вставке
  const [insertElement, setInsertElement] = useState<ElementsActionsState>(initialElementsState);
  // Стейт элемента, подлежащего удалению
  const [deleteElement, setDeleteElement] = useState<ElementsActionsState>(initialElementsState);
  // Стейт активного элемента списка (над которым произведены или будут производиться манипуляции)
  const [activeElement, setActiveElement] = useState<ElementsActionsState>({
    index: null,
    state: ElementStates.Default
  })


  useEffect(() => {
    if (form.value && form.value.length > 0) {
      setAddHeadBtnState({ ...addHeadBtnState, isDisabled: false });
      setAddTailBtnState({ ...addTailBtnState, isDisabled: false });

      if (form.index && form.index.length > 0) {
        setAddByIndexBtnState({ ...addByIndexBtnState, isDisabled: false });
      } else {
        setAddByIndexBtnState({ ...addByIndexBtnState, isDisabled: true });
      }
    } else {
      setAddHeadBtnState({ ...addHeadBtnState, isDisabled: true });
      setAddByIndexBtnState({ ...addByIndexBtnState, isDisabled: true });
      setAddTailBtnState({ ...addTailBtnState, isDisabled: true });

    }
  }, [form])


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }


  const handleAddHeadClick = (e: FormEvent) => {
    e.preventDefault();

    setAddHeadBtnState({...addHeadBtnState, isProcess: true});

    linkedList.insertAt(form.value, 0);

    setInsertElement({ index: 0, letter: form.value, state: ElementStates.Changing });

    setTimeout(() => {
      const newListState = [...listState];
      newListState.splice(0, 0, form.value);
      setListState([...newListState]);
    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setActiveElement({ index: 0, state: ElementStates.Modified });
    }, SHORT_DELAY_IN_MS * 2);

    setTimeout(() => {
      setActiveElement({ index: 0, state: ElementStates.Default });
      setInsertElement(initialElementsState)
    }, SHORT_DELAY_IN_MS * 3);


    setValues({ value: '' });
    setAddHeadBtnState({...addHeadBtnState, isProcess: false});
  }


  const handleAddTailClick = (e: FormEvent) => {
    e.preventDefault();

    linkedList.append(form.value);
    setListState([...listState, form.value]);
    console.log(listState)
    setValues({ value: '' });
  }


  const handleAddByIndexClick = (e: FormEvent) => {
    e.preventDefault();

    const index = Number(Number(form.index));
    linkedList.insertAt(form.value, index);

    const newListState = [...listState];
    newListState.splice(index, 0, form.value);
    setListState([...newListState]);

    setValues({ value: '', index: '' });
  }


  const handleRemoveHeadClick = (e: FormEvent) => {
    e.preventDefault();

  }


  const handleRemoveTailClick = (e: FormEvent) => {
    e.preventDefault();

  }


  const handleRemoveByIndexClick = (e: FormEvent) => {
    e.preventDefault();

  }


  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input name={'value'} type={'text'} placeholder={'Введите значение'} maxLength={4} isLimitText={true}
               extraClass={styles.input} onChange={handleChange} value={form.value || ''}
               disabled={false}/>
        <Button name={'addHeadBtn'} text={'Добавить в head'} type={'button'}
                isLoader={addHeadBtnState.isProcess}
                disabled={addHeadBtnState.isDisabled} onClick={handleAddHeadClick}/>
        <Button name={'addTailBtn'} text={'Добавить в tail'} type={'button'}
                isLoader={addTailBtnState.isProcess}
                disabled={addTailBtnState.isDisabled} onClick={handleAddTailClick}/>
        <Button name={'removeHeadBtn'} text={'Удалить из head'} type={'button'}
                isLoader={false}
                disabled={true} onClick={handleRemoveHeadClick}/>
        <Button name={'removeTailBtn'} text={'Удалить из tail'} type={'button'}
                isLoader={false}
                disabled={true} onClick={handleRemoveTailClick}/>

        <Input name={'index'} type={'text'} placeholder={'Введите индекс'} maxLength={1} min={0}
               extraClass={styles.input} onChange={handleChange} value={form.index || ''}
               disabled={false}/>
        <Button text={'Добавить по индексу'} type={'button'} isLoader={addByIndexBtnState.isProcess}
                disabled={addByIndexBtnState.isDisabled} onClick={handleAddByIndexClick}
                extraClass={styles.add_index_btn}/>
        <Button text={'Удалить по индексу'} type={'button'} isLoader={false}
                disabled={true} onClick={handleRemoveByIndexClick}
                extraClass={styles.delete_index_btn}/>
      </form>
      <section className={styles.result}>
        {listState.map((el, i) => (
          <>
            <Circle key={i} index={i}
                    state={(i === activeElement.index) ? activeElement.state : ElementStates.Default}
                    head={(i === insertElement.index) ? <Circle key={i} state={insertElement.state}
                                                                isSmall={true}
                                                                letter={insertElement.letter}/> : (i === 0) ? 'head' : ''}
                    tail={(i === deleteElement.index) ? <Circle key={i} state={deleteElement.state}
                                                                isSmall={true}
                                                                letter={insertElement.letter}/> : (i === listState.length - 1) ? 'tail' : ''}
                    isSmall={false}
            letter={el + ''} />
            {i < listState.length - 1 && <ArrowIcon/>}
          </>
        ))}
      </section>
    </SolutionLayout>
  );
};
