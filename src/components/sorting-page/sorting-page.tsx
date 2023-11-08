import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting.module.css';
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { delay, swap } from "../../utils/utils.ts";


type AlgData = Array<AlgElement>;

type AlgElement = {
  number: number;
  state: ElementStates
}


export const SortingPage: React.FC = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isAscProcess, setAscProcess] = useState(false);
  const [isDescProcess, setDescProcess] = useState(false);
  const [algState, setAlgState] = useState<AlgData>([]);
  const [form, handleChange, setValues] = useForm({});

  useEffect(() => {
    setAlgState(randomArr());

    setValues({})
  }, [])


  const randomArr = () => {
    const result: AlgData = [];
    const size = Math.floor(Math.random() * (17 - 3) + 3);

    for (let i = 0; i < size; i++) {
      result.push({
        number: Math.floor(Math.random() * 100),
        state: ElementStates.Default,
      });
    }

    return result;
  }


  const handleAscSorting = async (e: FormEvent) => {
    e.preventDefault();
    console.log(form)

    if (form.sortingType === 'selectionSorting') {
      await selectionSorting(algState, Direction.Ascending);
    }

    if (form.sortingType === 'bubbleSorting') {
      await bubbleSorting(algState, Direction.Ascending);
    }
  }


  const handleDescSorting = async (e: FormEvent) => {
    e.preventDefault();

    if (form.sortingType === 'selectionSorting') {
      await selectionSorting(algState, Direction.Descending);
    }

    if (form.sortingType === 'bubbleSorting') {
      await bubbleSorting(algState, Direction.Descending);
    }
  }


  const createNewArray = (e: FormEvent) => {
    e.preventDefault();

    setAlgState(randomArr());
  }


  const bubbleSorting = async (arr: AlgData, direction: Direction) => {

  }


  const selectionSorting = async (arr: AlgData, direction: Direction) => {
    console.log(arr, direction)
    if (direction === Direction.Ascending) {
      const { length } = algState;
      for (let i = 0; i < length - 1; i++) {
        arr[i].state = ElementStates.Changing;
        setAlgState([...arr]);
        await delay(1000);
        let maxInd = i;
        for (let k = i; k < length; k++) {
          arr[k].state = ElementStates.Changing;
          setAlgState([...arr]);
          if (arr[k] > arr[maxInd]) {
            maxInd = k;
          }
        }
        await delay(1000);
        swap(arr, i, maxInd);
        setAlgState([...arr]);
      }
    }
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput name={'sortingType'} label={'Выбор'} value={'selectionSorting'} defaultChecked={true} onChange={handleChange} />
        <RadioInput name={'sortingType'} label={'Пузырёк'} value={'bubbleSorting'} onChange={handleChange} />
        <Button text={'По возрастанию'} type={'button'} sorting={Direction.Ascending} isLoader={isAscProcess}
                disabled={false} onClick={handleAscSorting}/>
        <Button text={'По убиванию'} type={'button'} sorting={Direction.Descending} isLoader={isDescProcess}
                disabled={false} onClick={handleDescSorting}/>
        <Button text={'Новый массив'} type={'button'} onClick={createNewArray}/>
      </form>
      <section className={styles.result}>
        {algState.map((el, i) => (
          <Column key={i} index={el.number} state={el.state} />
        ))}
      </section>
    </SolutionLayout>
  );
};
