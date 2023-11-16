import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { getReverseString } from "./utils";
import { AlgState } from "./types";


export const StringComponent: React.FC = () => {
  const initialAlgorithmState: AlgState = {letters: [], states: []};

  const [isDisabled, setDisabled] = useState(true);
  const [isProcess, setProcess] = useState(false);
  const [algorithmState, setAlgState] = useState<AlgState>(initialAlgorithmState);

  const [form, handleChange] = useForm({});


  useEffect(() => {
    if (form.value && form.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);



  const startAlgorithm = (value: string) => {
    const generator = getReverseString(value);

    const intervalId = setInterval(() => {
      const next = generator.next();
      if (next.done) {
        clearInterval(intervalId);
        setProcess(false);
      } else {
        setAlgState({ ...next.value });
      }
    }, DELAY_IN_MS)
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcess(true);

    startAlgorithm(form.value);
  }


  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={'text'} name={'value'} placeholder={'Введите текст'} maxLength={11} isLimitText={true}
               extraClass={styles.input} onInput={handleChange} value={form.value || ''}/>
        <Button text={'Развернуть'} type={'submit'} isLoader={isProcess} disabled={isDisabled}/>
      </form>
      <section className={styles.result}>
        {algorithmState.letters && algorithmState.letters.map((el, i) =>
          <Circle key={i} state={algorithmState.states[i]} letter={el}/>
        )}
      </section>
    </SolutionLayout>
  );
};
