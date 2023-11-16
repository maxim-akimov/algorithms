import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack.module.css';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./utils";
import { BtnState } from "../../types/states";


export const StackPage: React.FC = () => {
  const initialBtnState: BtnState = { isDisabled: true, isProcess: false };

  const [addBtnState, setAddBtnState] = useState<BtnState>(initialBtnState);
  const [removeBtnState, setRemoveBtnState] = useState<BtnState>(initialBtnState);
  const [clearBtnState, setClearBtnState] = useState({ isDisabled: false });

  const [stackState, setStackState] = useState<(string | number)[]>([]);
  const [lastElState, setLastElState] = useState({ index: 0, state: ElementStates.Changing })

  const [form, handleChange, setValues] = useForm();


  const stack = useMemo(() => {
    return new Stack<number | string>()
  }, [])


  useEffect(() => {
    if (form.val && form.val.length > 0) {
      setAddBtnState({ ...addBtnState, isDisabled: false})
    } else {
      setAddBtnState({ ...addBtnState, isDisabled: true})
    }
  }, [form, stackState])


  useEffect(() => {
    if (stackState && stackState.length > 0) {
      setRemoveBtnState({ ...removeBtnState, isDisabled: false });
      setClearBtnState({ ...clearBtnState, isDisabled: false });
    } else {
      setRemoveBtnState({ ...removeBtnState, isDisabled: true });
      setClearBtnState({ ...clearBtnState, isDisabled: true });
    }
  }, [stackState])


  const handleAddClick = (e: FormEvent) => {
    e.preventDefault();

    setAddBtnState({ ...addBtnState, isProcess: true })
    setRemoveBtnState({ ...removeBtnState, isDisabled: true})
    setClearBtnState({ ...clearBtnState, isDisabled: true })

    stack.push(form.val);
    const elements = stack.getElements();
    setStackState([...elements]);
    setLastElState({ index: elements.length - 1, state: ElementStates.Changing })

    setTimeout(() => {
      setLastElState({ index: elements.length - 1, state: ElementStates.Default })
      setAddBtnState({ ...addBtnState, isProcess: false })
    }, SHORT_DELAY_IN_MS)

    setValues({ val: '' });
  }


  const handleDeleteClick = (e: FormEvent) => {
    e.preventDefault();

    setRemoveBtnState({ ...removeBtnState, isProcess: true })
    setAddBtnState({ ...addBtnState, isDisabled: true })
    setClearBtnState({ ...clearBtnState, isDisabled: true })

    const elements = stack.getElements();
    setLastElState({ index: elements.length - 1, state: ElementStates.Changing })

    setTimeout(() => {
      stack.pop();
      setStackState([...stack.getElements()]);
      setLastElState({ index: elements.length - 1, state: ElementStates.Default });
      setRemoveBtnState({ ...removeBtnState, isProcess: false })
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
        <Button text={'Добавить'} type={'button'} isLoader={addBtnState.isProcess}
                disabled={addBtnState.isDisabled} onClick={handleAddClick}/>
        <Button text={'Удалить'} type={'button'} isLoader={removeBtnState.isProcess}
                disabled={removeBtnState.isDisabled} onClick={handleDeleteClick}/>
        <Button text={'Очистить'} type={'button'} disabled={clearBtnState.isDisabled} onClick={handleClearClick}
                extraClass={styles.ml}/>
      </form>
      <section className={styles.result}>
        {stackState.map((el, i) => (
          <Circle key={i} index={i} state={(i === lastElState.index) ? lastElState.state : ElementStates.Default}
                  head={(i === 0) ? 'head' : ''}
                  tail={(i === stackState.length - 1) ? 'tail' : ''} letter={el.toString()}/>
        ))}
      </section>
    </SolutionLayout>
  );
};
