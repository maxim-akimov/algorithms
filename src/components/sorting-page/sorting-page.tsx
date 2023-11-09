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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


type AlgData = Array<AlgElement>;

type AlgElement = {
  number: number;
  state: ElementStates
}


export const SortingPage: React.FC = () => {
  const [isAscDisabled, setAscDisabled] = useState(false);
  const [isDescDisabled, setDescDisabled] = useState(false);
  const [isNewArrDisabled, setNewArrDisabled] = useState(false);

  const [isAscProcess, setAscProcess] = useState(false);
  const [isDescProcess, setDescProcess] = useState(false);

  const [algState, setAlgState] = useState<AlgData>([]);

  const [form, handleChange, setValues] = useForm({});

  useEffect(() => {
    setAlgState(randomArr());

    setValues({
      sortingType: 'selectionSorting',
    })
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


  const createNewArray = (e: FormEvent) => {
    e.preventDefault();

    setAlgState(randomArr());
  }


  const setProcess = (direction: Direction) => {
    if (direction === Direction.Ascending) {
      setAscProcess(true)
      setDescDisabled(true);
      setNewArrDisabled(true);
    }

    if (direction === Direction.Descending) {
      setDescProcess(true)
      setAscDisabled(true);
      setNewArrDisabled(true);
    }
  }


  const resetProcess = () => {
    setAscProcess(false)
    setDescProcess(false)
    setAscDisabled(false);
    setDescDisabled(false);
    setNewArrDisabled(false);
  }


  const handleSortingClick = async (e: FormEvent, direction: Direction) => {
    e.preventDefault();

    setProcess(direction);

    if (form.sortingType === 'selectionSorting') {
      await selectionSorting(algState, direction);
    }

    if (form.sortingType === 'bubbleSorting') {
      await bubbleSorting(algState, direction);
    }

    if (direction === Direction.Ascending) {
      setAscProcess(false);
    }

    resetProcess();
  }


  const animate = async (arr: AlgData, elementsIndex: number[], state: ElementStates, delayTime: number = 0) => {
    for (let i = 0; i < elementsIndex.length; i++) {
      arr[elementsIndex[i]].state = state;
    }

    setAlgState([...arr]);
    await delay(delayTime);
  }


  const bubbleSorting = async (arr: AlgData, direction: Direction) => {
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        await animate(arr, [j, j + 1], ElementStates.Changing, SHORT_DELAY_IN_MS);

        if ((direction === Direction.Ascending && arr[j].number > arr[j + 1].number)
          || (direction === Direction.Descending && arr[j].number < arr[j + 1].number)) {
          swap(arr, j, j + 1);
          await animate(arr, [j, j + 1], ElementStates.Default);
        }

        await animate(arr, [j, j + 1], ElementStates.Default);

        if (j + 1 === arr.length - i - 1) {
          arr[j + 1].state = ElementStates.Modified;
        }

        if (j === 0 && i === length - 2) {
          arr[j].state = ElementStates.Modified;
        }
      }

      setAlgState([...arr]);
    }
    setAlgState(arr)
  }


  const selectionSorting = async (arr: AlgData, direction: Direction) => {
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      arr[i].state = ElementStates.Changing;
      setAlgState([...arr]);

      let minMaxInd = i;
      for (let k = i; k < length; k++) {
        arr[k].state = ElementStates.Changing;
        setAlgState([...arr]);
        await delay(SHORT_DELAY_IN_MS);

        if ((direction === Direction.Descending && arr[k].number > arr[minMaxInd].number)
          || direction === Direction.Ascending && arr[k].number < arr[minMaxInd].number) {
          arr[minMaxInd].state = ElementStates.Default;
          minMaxInd = k;
        } else {
          arr[k].state = ElementStates.Default;
        }
      }
      await delay(SHORT_DELAY_IN_MS);
      arr[minMaxInd].state = ElementStates.Modified;
      swap(arr, i, minMaxInd);
      setAlgState(arr);
    }
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput name={'sortingType'} label={'Выбор'} value={'selectionSorting'}
                    checked={form.sortingType === 'selectionSorting'}
        onChange={handleChange}/>
        <RadioInput name={'sortingType'} label={'Пузырёк'} value={'bubbleSorting'}
                    checked={form.sortingType === 'bubbleSorting'} onChange={handleChange} />
        <Button text={'По возрастанию'} type={'button'} sorting={Direction.Ascending} isLoader={isAscProcess}
                disabled={isAscDisabled} onClick={(e) => handleSortingClick(e, Direction.Ascending)} extraClass={styles.ml} />
        <Button text={'По убиванию'} type={'button'} sorting={Direction.Descending} isLoader={isDescProcess}
                disabled={isDescDisabled} onClick={(e) => handleSortingClick(e, Direction.Descending)} />
        <Button text={'Новый массив'} type={'button'} disabled={isNewArrDisabled} onClick={createNewArray} extraClass={styles.ml} />
      </form>
      <section className={styles.result}>
        {algState.map((el, i) => (
          <Column key={i} index={el.number} state={el.state}/>
        ))}
      </section>
    </SolutionLayout>
  );
};
