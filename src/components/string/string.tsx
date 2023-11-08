import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { delay, swap } from "../../utils/utils.ts";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";


type AlgData = AlgElement[];

type AlgElement = {
  letter: string;
  index: number;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isProcess, setProcess] = useState(false);
  const [form, handleChange] = useForm({});
  const [algState, setAlgState] = useState<AlgData>([]);

  useEffect(() => {
    if (form.str && form.str.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);


  const createArray = (str: string): AlgData => {
    return Array.from(str).map((el: string, i: number) => {
      return {
        letter: el,
        index: i,
        state: ElementStates.Default,
      }
    });
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setAlgState([]);
    setProcess(true);

    const arr = createArray(form.str);
    setAlgState(arr)
    await reverse(arr);

    setProcess(false);
  }


  const animate = async (arr: AlgData, firstEl: number, secondEl: number, state: ElementStates) => {
    arr[firstEl].state = state;
    arr[secondEl].state = state;

    setAlgState([...arr]);

    await delay(DELAY_IN_MS);
  }


  const reverse = async (arr: AlgData): Promise<void> => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      await animate(arr, start, end, ElementStates.Changing);

      swap(arr, start, end);

      await animate(arr, start++, end--, ElementStates.Modified);
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'text'} name={'str'} placeholder={'Введите текст'} maxLength={11} isLimitText={true}
               extraClass={styles.input} onInput={handleChange} value={form.str || ''}/>
        <Button text={'Развернуть'} type={'submit'} isLoader={isProcess} disabled={isDisabled}/>
      </form>
      <section className={styles.result}>
        {algState.map((el, i) =>
          <Circle key={i} state={el.state} letter={el.letter}/>
        )}
      </section>
    </SolutionLayout>
  );
};
