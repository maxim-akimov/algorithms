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
import { LinkedList } from "./utils";
import { ActiveElementsState, ElementsActionsState } from "./types";



export const ListPage: React.FC = () => {
  const linkedList = useMemo(() => {
    return new LinkedList<number | string>();
  }, []);


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

  const [listState, setListState] = useState<(number | string)[]>([]);
  const [insertElement, setInsertElement] = useState<ElementsActionsState>(initialElementsState);
  const [deleteElement, setDeleteElement] = useState<ElementsActionsState>(initialElementsState);
  const [activeElement, setActiveElement] = useState<ElementsActionsState>(initialElementsState);
  //
  const [selectedElements, setSelectedElements] = useState<ActiveElementsState>({
    elements: [],
    state: ElementStates.Changing
  })


  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      linkedList.append(Math.floor(Math.random() * 100))
    }
    setListState(linkedList.getElements());
  }, []);


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
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isDisabled: false });
    } else {
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isDisabled: true });
    }

    if (listState.length > 6) {
      setDisabledValue(true);
    } else {
      setDisabledValue(false);
    }

    if (listState.length > 0) {
      setRemoveHeadBtnState({ ...removeHeadBtnState, isDisabled: false });
      setRemoveTailBtnState({ ...removeTailBtnState, isDisabled: false });
    } else {
      setRemoveHeadBtnState({ ...removeHeadBtnState, isDisabled: true });
      setRemoveTailBtnState({ ...removeTailBtnState, isDisabled: true });
    }
  }, [form, listState])


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }


  const handleAddClick = (e: FormEvent, place?: 'head' | 'tail' | number) => {
    e.preventDefault();
    let index: number = 0;

    if (place === undefined) {
      setAddByIndexBtnState({ ...addByIndexBtnState, isProcess: true });
      index = Number(form.index);
    } else if (typeof place === 'number') {
      setAddByIndexBtnState({ ...addByIndexBtnState, isProcess: true });
      index = place;
    } else if (place === 'head') {
      setAddHeadBtnState({ ...addHeadBtnState, isProcess: true });
    } else if (place === 'tail') {
      setAddTailBtnState({ ...addHeadBtnState, isProcess: true });
      index = listState.length;
    }

    if (place === 'tail') {
      linkedList.append(form.value);
    } else {
      linkedList.insertAt(form.value, index);
    }

    setInsertElement({
      index: (place === 'tail') ? index - 1 : index,
      letter: form.value,
      state: ElementStates.Changing
    });

    setTimeout(() => {
      setListState([...linkedList.getElements()]);
      setInsertElement(initialElementsState)
      setActiveElement({ index: index, state: ElementStates.Modified });
    }, SHORT_DELAY_IN_MS);

    setTimeout(() => {
      setActiveElement({ index: index, state: ElementStates.Default });
      setAddByIndexBtnState({ ...addByIndexBtnState, isDisabled: true, isProcess: false });
      setAddHeadBtnState({ ...addHeadBtnState, isProcess: false, isDisabled: true });
      setAddTailBtnState({ ...addTailBtnState, isProcess: false, isDisabled: true });

    }, SHORT_DELAY_IN_MS * 2);

    setTimeout(() => {
      setActiveElement({ index: null, state: ElementStates.Default });
    }, SHORT_DELAY_IN_MS * 3);

    setValues({ value: '' });
  }


  const handleRemoveClick = async (e: FormEvent, index?: number) => {
    e.preventDefault();

    if (index === undefined) {
      index = Number(form.index);
      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isProcess: true });
    } else if (index === 0) {
      setRemoveHeadBtnState({ ...removeHeadBtnState, isProcess: true });
    } else {
      setRemoveTailBtnState({ ...removeTailBtnState, isProcess: true });

    }

    const elements = [];
    for (let ind = 0; ind <= index; ind++) {
      elements.push(ind);
      setSelectedElements({ ...selectedElements, elements: [...elements] })
      await delay(SHORT_DELAY_IN_MS);
    }

    setDeleteElement({ index: index, letter: listState[index] + '', state: ElementStates.Changing });
    setListState([...listState.map((el, i) => (i === index) ? el = '' : el)])

    setTimeout(() => {
      linkedList.remove(listState[index || 0])
      setListState([...linkedList.getElements()]);
      setSelectedElements({ ...selectedElements, elements: [] });
      setDeleteElement(initialElementsState);

      setRemoveByIndexBtnState({ ...removeByIndexBtnState, isProcess: false });
      setRemoveHeadBtnState({ ...removeHeadBtnState, isProcess: false });
      setRemoveTailBtnState({ ...removeTailBtnState, isProcess: false });
    }, SHORT_DELAY_IN_MS)

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
                disabled={addHeadBtnState.isDisabled} onClick={(e) => handleAddClick(e, 'head')}/>
        <Button name={'addTailBtn'} text={'Добавить в tail'} type={'button'}
                isLoader={addTailBtnState.isProcess}
                disabled={addTailBtnState.isDisabled} onClick={(e) => handleAddClick(e, 'tail')}/>
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
