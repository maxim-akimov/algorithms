import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getFibonacci } from "./utils";


export const FibonacciPage: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isProcess, setProcess] = useState(false);
  const [algorithmState, setAlgorithmState] = useState<number[]>([]);

  const [form, handleChange] = useForm({});



  useEffect(() => {
    if (form.value && form.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);


  const startAlgorithm = (value: number) => {
    const generator = getFibonacci(value);

    const intervalId = setInterval(() => {
      const next = generator.next();
      if (next.done) {
        clearInterval(intervalId);
        setProcess(false);
      } else {
        setAlgorithmState([...algorithmState, ...next.value]);
      }
    }, SHORT_DELAY_IN_MS)
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setProcess(true);
    startAlgorithm(Number(form.value));
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'number'} name={'value'} placeholder={'Введите число'}  min={1} max={19} isLimitText={true}
               extraClass={styles.input} onInput={handleChange} value={form.value || ''}/>
        <Button text={'Рассчитать'} type={'submit'} isLoader={isProcess} disabled={isDisabled}/>
      </form>
      <section className={styles.result}>
        {algorithmState.map((el, i) =>
          <Circle key={i} state={ElementStates.Default} letter={el.toString()} index={i} />
        )}
      </section>
    </SolutionLayout>
  );
};
