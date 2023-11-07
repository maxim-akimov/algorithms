import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { swap } from "../../utils/utils.ts";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


type AlgData = AlgElement[];

type AlgElement = {
  letter: string;
  index: number;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [form, handleChange, setValues] = useForm({});
  const [algState, setAlgState] = useState<AlgData>([]);

  useEffect(() => {
    if (form.str && form.str.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);


  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const arr = Array.from(form.str).map((el: string, i: number) => {
      return {
        letter: el,
        index: i,
        state: ElementStates.Default,
      }
    });
    setAlgState(arr)


    reverse(arr);
  }

  const reverse = (arr: AlgData): void => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      const currStart = arr[start];
      const currEnd = arr[end];

      currStart.state = ElementStates.Changing;
      currEnd.state = ElementStates.Changing;
      setTimeout(() => {
        setAlgState([...algState, ...arr]);
      }, 1000)

      swap(arr, start++, end--);

      currStart.state = ElementStates.Modified;
      currEnd.state = ElementStates.Modified;
      setTimeout(() => {
        setAlgState([...algState, ...arr]);
      }, 1000)
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'text'} name={'str'} placeholder={'Введите текст'} maxLength={11} isLimitText={true}
               extraClass={styles.input} onInput={handleChange} value={form.str || ''}/>
        <Button text={'Развернуть'} type={'submit'} isLoader={false} disabled={isDisabled}/>
      </form>
      <section className={styles.result}>
        {algState.map((el, i) =>
          <Circle key={i} state={el.state} letter={el.letter}/>
        )}

      </section>
    </SolutionLayout>
  );
};
