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
import { delay } from "../../utils/utils.ts";


export class Node<T> {
  value: T | ''
  next: Node<T> | null

  constructor(value: T | '', next?: Node<T> | null) {
    this.value = value || '';
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  remove: (val: T) => Node<T> | null;
  getSize: () => number;
  getElements: () => void;
}

type ElementsActionsState = {
  index: number | null;
  letter?: string;
  state: ElementStates;
};

type ActiveElementsState = {
  elements: number[];
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

    return dummyHead.next;
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


export const ListPage: React.FC = () => {
  const linkedList = useMemo(() => {
    return new LinkedList<number | string>();
  }, []);


  for (let i = 0; i < 4; i++) {
    linkedList.append(Math.floor(Math.random() * 100))
  }


  const initialBtnState = { isDisabled: true, isProcess: false };
  const initialElementsState = {
    index: null,
    letter: '',
    state: ElementStates.Default
  }

  const [addHeadBtnState, setAddHeadBtnState] = useState(initialBtnState);
  const [addTailBtnState, setAddTailBtnState] = useState(initialBtnState);
  const [addByIndexBtnState, setAddByIndexBtnState] = useState(initialBtnState);
  const [removeHeadBtnState, setRemoveHeadBtnState] = useState(initialBtnState);
  const [removeTailBtnState, setRemoveTailBtnState] = useState(initialBtnState);
  const [removeByIndexBtnState, setRemoveByIndexBtnState] = useState(initialBtnState);
  const [isDisabledValue, setDisabledValue] = useState(false)
  const [isDisabledIndex, setDisabledIndex] = useState(false)

  const [form, handleChange, setValues] = useForm();

  // Стейты для реализации анимации
  const [listState, setListState] = useState<(number | string | null)[]>(linkedList.getElements());
  // Стейт элемента, подлежащего вставке
  const [insertElement, setInsertElement] = useState<ElementsActionsState>(initialElementsState);
  // Стейт элемента, подлежащего удалению
  const [deleteElement, setDeleteElement] = useState<ElementsActionsState>(initialElementsState);
  // Стейт активного элемента списка (над которым произведены или будут производиться манипуляции)
  const [activeElement, setActiveElement] = useState<ElementsActionsState>(initialElementsState);
  //
  const [selectedElements, setSelectedElements] = useState<ActiveElementsState>({
    elements: [],
    state: ElementStates.Changing
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

    if (form.index && form.index.length > 0 && listState.length > 0) {
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isDisabled: false});
    } else {
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isDisabled: true});
    }
  }, [form])


  useEffect(() => {
    if (listState.length > 0) {
      setRemoveHeadBtnState({ ...removeHeadBtnState, isDisabled: false });
      setRemoveTailBtnState({ ...removeTailBtnState, isDisabled: false });
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isDisabled: false });
    } else {
      setRemoveHeadBtnState({ ...removeHeadBtnState, isDisabled: true });
      setRemoveTailBtnState({ ...removeTailBtnState, isDisabled: true });
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isDisabled: true });
    }

    if (listState.length > 6) {
      setDisabledValue(true);
      setDisabledIndex(true);
    }
  }, [listState])


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }


  const handleAddClick = (e: FormEvent, index?: number) => {
    e.preventDefault();

    if (index === undefined) {
      setAddByIndexBtnState({ ...addByIndexBtnState, isProcess: true });
      index = Number(form.index);
    } else {
      setAddHeadBtnState({ ...addHeadBtnState, isProcess: true });
    }

    linkedList.insertAt(form.value, index);

    setInsertElement({ index: index, letter: form.value, state: ElementStates.Changing });

    setTimeout(() => {
      const newListState = [...listState];
      newListState.splice(index || 0, 0, form.value);

      setListState([...newListState]);
      setInsertElement(initialElementsState)
      setActiveElement({ index: index as number, state: ElementStates.Modified });
    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setActiveElement({ index: index as number, state: ElementStates.Default });
      setAddByIndexBtnState({ ...addByIndexBtnState, isDisabled: true, isProcess: false });
      setAddHeadBtnState({ ...addHeadBtnState, isProcess: false, isDisabled: true });
    }, SHORT_DELAY_IN_MS * 2);


    setValues({ value: '' });


  }


  const handleAddTailClick = (e: FormEvent) => {
    e.preventDefault();

    setAddTailBtnState({ ...addTailBtnState, isProcess: true });

    linkedList.append(form.value);

    setInsertElement({ index: listState.length - 1, letter: form.value, state: ElementStates.Changing });

    setTimeout(() => {
      setListState([...listState, form.value]);
      setInsertElement(initialElementsState)

    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setActiveElement({ index: listState.length, state: ElementStates.Modified });
    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setActiveElement({ index: listState.length, state: ElementStates.Default });
      setAddTailBtnState({ ...addTailBtnState, isDisabled: true, isProcess: false });
    }, SHORT_DELAY_IN_MS * 2);

    setValues({ value: '' });
  }


  const handleRemoveClick = async (e: FormEvent, index?: number) => {
    e.preventDefault();

    setRemoveByIndexBtnState({ ...removeByIndexBtnState, isProcess: true});

    if (index === undefined) {
      index = Number(form.index);
    }

    const elements = [];

    for (let ind = 0; ind <= index; ind++) {
      elements.push(ind);
      setSelectedElements({ ...selectedElements, elements: [...elements] })
      await delay(SHORT_DELAY_IN_MS);
    }

    setDeleteElement({ index: index, letter: listState[index] + '', state: ElementStates.Changing });
    setListState([...listState.map((el, i) => (i === index) ? el = '' : el)])

    await setTimeout(() => {
      setListState([...listState.filter((el, i) => (i !== index))]);
      setSelectedElements({ ...selectedElements, elements: []});
      setDeleteElement(initialElementsState);
    }, SHORT_DELAY_IN_MS)

    setRemoveByIndexBtnState({ isDisabled: true, isProcess: false});
    setValues({ index: '' });
  }


  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input name={'value'} type={'text'} placeholder={'Введите значение'} maxLength={4} isLimitText={true}
               extraClass={styles.input} onChange={handleChange} value={form.value || ''}
               disabled={isDisabledValue}/>
        <Button name={'addHeadBtn'} text={'Добавить в head'} type={'button'}
                isLoader={addHeadBtnState.isProcess}
                disabled={addHeadBtnState.isDisabled} onClick={(e) => handleAddClick(e, 0)}/>
        <Button name={'addTailBtn'} text={'Добавить в tail'} type={'button'}
                isLoader={addTailBtnState.isProcess}
                disabled={addTailBtnState.isDisabled} onClick={handleAddTailClick}/>
        <Button name={'removeHeadBtn'} text={'Удалить из head'} type={'button'}
                isLoader={removeHeadBtnState.isProcess}
                disabled={removeHeadBtnState.isDisabled} onClick={(e) => handleRemoveClick(e, 0)}/>
        <Button name={'removeTailBtn'} text={'Удалить из tail'} type={'button'}
                isLoader={removeTailBtnState.isProcess}
                disabled={removeTailBtnState.isDisabled} onClick={(e) => handleRemoveClick(e, listState.length - 1)}/>

        <Input name={'index'} type={'text'} placeholder={'Введите индекс'} maxLength={1} min={0}
               extraClass={styles.input} onChange={handleChange} value={form.index || ''}
               disabled={isDisabledIndex}/>
        <Button text={'Добавить по индексу'} type={'button'} isLoader={addByIndexBtnState.isProcess}
                disabled={addByIndexBtnState.isDisabled} onClick={(e) => handleAddClick(e)}
                extraClass={styles.add_index_btn}/>
        <Button text={'Удалить по индексу'} type={'button'} isLoader={removeByIndexBtnState.isProcess}
                disabled={removeByIndexBtnState.isDisabled} onClick={(e) => handleRemoveClick(e)}
                extraClass={styles.delete_index_btn}/>
      </form>
      <section className={styles.result}>
        {listState.map((el, i) => (
          <React.Fragment key={i}>
            <Circle index={i}
                    state={(i === activeElement.index) ? activeElement.state
                      : (selectedElements.elements.includes(i) ? selectedElements.state
                        : ElementStates.Default)}
                    head={(i === insertElement.index) ? <Circle state={insertElement.state}
                                                                isSmall={true}
                                                                letter={insertElement.letter}/> : (i === 0) ? 'head' : ''}
                    tail={(i === deleteElement.index) ? <Circle state={deleteElement.state}
                                                                isSmall={true}
                                                                letter={deleteElement.letter}/> : (i === listState.length - 1) ? 'tail' : ''}
                    isSmall={false}
                    letter={el + ''}/>
            {i < listState.length - 1 && <ArrowIcon/>}
          </React.Fragment>
        ))}
      </section>
    </SolutionLayout>
  );
};
