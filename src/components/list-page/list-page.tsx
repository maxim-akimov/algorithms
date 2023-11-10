import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";

export const ListPage: React.FC = () => {
  const defaultList = undefined; //TODO


  const [formElementsState, setFormElementsState] = useState({
    valueInput: {
      isDisabled: false,
    },
    indexInput: {
      isDisabled: false,
    },
    addHeadBtn: {
      isDisabled: true,
      isProcess: false
    },
    addTailBtn: {
      isDisabled: true,
      isProcess: false
    },
    addByIndexBtn: {
      isDisabled: true,
      isProcess: false
    },
    removeHeadBtn: {
      isDisabled: true,
      isProcess: false
    },
    removeTailBtn: {
      isDisabled: true,
      isProcess: false
    },
    removeByIndexBtn: {
      isDisabled: true,
      isProcess: false
    },
  });

  const [form, handleChange, setValues] = useForm();


  useEffect(() => {
    if (form.value && form.value.length > 0) {
      setFormElementsState({
        ...formElementsState,
        addHeadBtn: {
          ...formElementsState.addHeadBtn,
          isDisabled: false,
        },
        addTailBtn: {
          ...formElementsState.addTailBtn,
          isDisabled: false,
        },
      })
    } else {
      setFormElementsState({
        ...formElementsState,
        addHeadBtn: {
          ...formElementsState.addHeadBtn,
          isDisabled: true,
        },
        addTailBtn: {
          ...formElementsState.addTailBtn,
          isDisabled: true,
        },
      })
    }
    /*
    if (form.value && form.value.length > 0
      && form.index && form.index.length > 0) {
      setFormElementsState({
        ...formElementsState,
        addByIndexBtn: {
          ...formElementsState.addByIndexBtn,
          isDisabled: false,
        },
      })
    } else {
      setFormElementsState({
        ...formElementsState,
        addByIndexBtn: {
          ...formElementsState.addByIndexBtn,
          isDisabled: true,
        },
      })
    }

     */
    console.log(formElementsState);
  }, [form])


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }


  const handleAddHeadClick = (e: FormEvent) => {

  }


  const handleAddTailClick = (e: FormEvent) => {

  }


  const handleAddByIndexClick = (e: FormEvent) => {

  }


  const handleRemoveHeadClick = (e: FormEvent) => {

  }


  const handleRemoveTailClick = (e: FormEvent) => {

  }


  const handleRemoveByIndexClick = (e: FormEvent) => {

  }


  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input name={'value'} type={'text'} placeholder={'Введите значение'} maxLength={4} isLimitText={true}
               extraClass={styles.input} onChange={handleChange} value={form.value || ''}
               disabled={formElementsState.valueInput.isDisabled}/>
        <Button name={'addHeadBtn'} text={'Добавить в head'} type={'button'}
                isLoader={formElementsState.addHeadBtn.isProcess}
                disabled={formElementsState.addHeadBtn.isDisabled} onClick={handleAddHeadClick}/>
        <Button name={'addTailBtn'} text={'Добавить в tail'} type={'button'}
                isLoader={formElementsState.addTailBtn.isProcess}
                disabled={formElementsState.addTailBtn.isDisabled} onClick={handleAddTailClick}/>
        <Button name={'removeHeadBtn'} text={'Удалить из head'} type={'button'}
                isLoader={formElementsState.removeTailBtn.isProcess}
                disabled={formElementsState.removeHeadBtn.isDisabled} onClick={handleRemoveHeadClick}/>
        <Button name={'removeTailBtn'} text={'Удалить из tail'} type={'button'}
                isLoader={formElementsState.removeTailBtn.isProcess}
                disabled={formElementsState.removeTailBtn.isDisabled} onClick={handleRemoveTailClick}/>

        <Input name={'index'} type={'text'} placeholder={'Введите индекс'} maxLength={1} min={0}
               extraClass={styles.input} onChange={handleChange} value={form.index || ''}
               disabled={formElementsState.indexInput.isDisabled}/>
        <Button text={'Добавить по индексу'} type={'button'} isLoader={formElementsState.addByIndexBtn.isProcess}
                disabled={formElementsState.addByIndexBtn.isDisabled} onClick={handleAddByIndexClick}
                extraClass={styles.add_index_btn}/>
        <Button text={'Удалить по индексу'} type={'button'} isLoader={formElementsState.removeByIndexBtn.isProcess}
                disabled={formElementsState.removeByIndexBtn.isDisabled} onClick={handleRemoveByIndexClick}
                extraClass={styles.delete_index_btn}/>

      </form>
    </SolutionLayout>
  );
};
