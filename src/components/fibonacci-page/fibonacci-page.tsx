import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils.ts";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export const FibonacciPage: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isProcess, setProcess] = useState(false);
  const [form, handleChange] = useForm({});
  const [algState, setAlgState] = useState<number[]>([]);


  useEffect(() => {
    if (form.num && form.num.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setAlgState([]);
    setProcess(true);

    await fibonacci(Number(form.num));

    setProcess(false);
  }


  const animate = async (n: number, arr: number[]) => {
    arr.push(n);
    setAlgState([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  }


  const fibonacci = async (n: number) => {
    let i = 0;
    let prev = 0;
    let next = 1;
    const arr: number[] = [];

    while (i < n) {
      next = prev + next;
      prev = next - prev;
      await animate(prev, arr);
      i++;
    }

    return prev;
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'number'} name={'num'} placeholder={'Введите число'}  min={1} max={19} isLimitText={true}
               extraClass={styles.input} onInput={handleChange} value={form.num || ''}/>
        <Button text={'Рассчитать'} type={'submit'} isLoader={isProcess} disabled={isDisabled}/>
      </form>
      <section className={styles.result}>
        {algState.map((el, i) =>
          <Circle key={i} state={ElementStates.Default} letter={el.toString()} index={i} />
        )}
      </section>
    </SolutionLayout>
  );
};
