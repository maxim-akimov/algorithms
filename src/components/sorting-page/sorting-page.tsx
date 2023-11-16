import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting.module.css';
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { getRandomArray, sortBubble, sortSelection } from "./utils";
import { AlgState } from "./types";
import { BtnState } from "../../types/states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";


export const SortingPage: React.FC = () => {
  const initialBtnState: BtnState = { isDisabled: false, isProcess: false };
  const initialAlgorithmState: AlgState = { numbers: [], states: [] };

  const [ascBtnState, setAscBtnState] = useState<BtnState>(initialBtnState);
  const [descBtnState, setDescBtnState] = useState<BtnState>(initialBtnState);
  const [newArrayBtnState, setNewArrayBtnState] = useState({ isDisabled: false });

  const [algorithmState, setAlgorithmState] = useState<AlgState>(initialAlgorithmState);

  const [form, handleChange, setValues] = useForm({});


  useEffect(() => {
    setAlgorithmState(getRandomArray());

    setValues({
      sortingType: 'selectionSorting',
    })
  }, [])


  const handleCreateNewArrayClick = (e: FormEvent) => {
    e.preventDefault();

    setAlgorithmState(getRandomArray());
  }


  const setProcess = (direction: Direction) => {
    if (direction === Direction.Ascending) {
      setAscBtnState({ ...ascBtnState, isProcess: true });
      setDescBtnState({ ...descBtnState, isDisabled: true });
    }

    if (direction === Direction.Descending) {
      setDescBtnState({ ...descBtnState, isProcess: true });
      setAscBtnState({ ...descBtnState, isDisabled: true });
    }

    setNewArrayBtnState({ isDisabled: true });
  }


  const resetProcess = () => {
    setAscBtnState(initialBtnState);
    setDescBtnState(initialBtnState);
    setNewArrayBtnState({ isDisabled: false });
  }


  const startAlgorithm = (arr: number[], direction: Direction) => {
    let generator: Generator<AlgState>;

    if (form.sortingType === 'selectionSorting') {
      generator = sortSelection(arr, direction);
    } else if (form.sortingType === 'bubbleSorting') {
      //generator = sortBubble(arr, direction);
    }

    const intervalId = setInterval(() => {
      const next = generator.next();
      if (next.done) {
        clearInterval(intervalId);
        resetProcess();
      } else {
        console.log(next.value)
        setAlgorithmState({...next.value});
      }
    }, SHORT_DELAY_IN_MS)
  }


  const handleSortingClick = (e: FormEvent, direction: Direction) => {
    e.preventDefault();

    setProcess(direction);
    startAlgorithm([...algorithmState.numbers], direction);
  }


  // const animate = async (arr: AlgData, elementsIndex: number[], state: ElementStates, delayTime: number = 0) => {
  //   for (let i = 0; i < elementsIndex.length; i++) {
  //     arr[elementsIndex[i]].state = state;
  //   }
  //
  //   setAlgorithmState([...arr]);
  //   await delay(delayTime);
  // }


  // const bubbleSorting = async (arr: AlgData, direction: Direction) => {
  //   const { length } = arr;
  //
  //   for (let i = 0; i < length; i++) {
  //     for (let j = 0; j < length - i - 1; j++) {
  //       await animate(arr, [j, j + 1], ElementStates.Changing, SHORT_DELAY_IN_MS);
  //
  //       if ((direction === Direction.Ascending && arr[j].number > arr[j + 1].number)
  //         || (direction === Direction.Descending && arr[j].number < arr[j + 1].number)) {
  //         swap(arr, j, j + 1);
  //         await animate(arr, [j, j + 1], ElementStates.Default);
  //       }
  //
  //       await animate(arr, [j, j + 1], ElementStates.Default);
  //
  //       if (j + 1 === arr.length - i - 1) {
  //         arr[j + 1].state = ElementStates.Modified;
  //       }
  //
  //       if (j === 0 && i === length - 2) {
  //         arr[j].state = ElementStates.Modified;
  //       }
  //     }
  //
  //     setAlgorithmState([...arr]);
  //   }
  //   setAlgorithmState(arr)
  // }


  // const selectionSorting = async (arr: AlgData, direction: Direction) => {
  //   const { length } = arr;
  //
  //   for (let i = 0; i < length; i++) {
  //     arr[i].state = ElementStates.Changing;
  //     setAlgorithmState([...arr]);
  //
  //     let minMaxInd = i;
  //     for (let k = i; k < length; k++) {
  //       arr[k].state = ElementStates.Changing;
  //       setAlgorithmState([...arr]);
  //       await delay(SHORT_DELAY_IN_MS);
  //
  //       if ((direction === Direction.Descending && arr[k].number > arr[minMaxInd].number)
  //         || direction === Direction.Ascending && arr[k].number < arr[minMaxInd].number) {
  //         arr[minMaxInd].state = ElementStates.Default;
  //         minMaxInd = k;
  //       } else {
  //         arr[k].state = ElementStates.Default;
  //       }
  //     }
  //     await delay(SHORT_DELAY_IN_MS);
  //     arr[minMaxInd].state = ElementStates.Modified;
  //     swap(arr, i, minMaxInd);
  //     setAlgorithmState(arr);
  //   }
  // }


  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput name={'sortingType'} label={'Выбор'} value={'selectionSorting'}
                    checked={form.sortingType === 'selectionSorting'}
                    onChange={handleChange}/>
        <RadioInput name={'sortingType'} label={'Пузырёк'} value={'bubbleSorting'}
                    checked={form.sortingType === 'bubbleSorting'} onChange={handleChange}/>
        <Button text={'По возрастанию'} type={'button'} sorting={Direction.Ascending} isLoader={ascBtnState.isProcess}
                disabled={ascBtnState.isDisabled} onClick={(e) => handleSortingClick(e, Direction.Ascending)}
                extraClass={styles.ml}/>
        <Button text={'По убиванию'} type={'button'} sorting={Direction.Descending} isLoader={descBtnState.isProcess}
                disabled={descBtnState.isDisabled} onClick={(e) => handleSortingClick(e, Direction.Descending)}/>
        <Button text={'Новый массив'} type={'button'} disabled={newArrayBtnState.isDisabled}
                onClick={handleCreateNewArrayClick}
                extraClass={styles.ml}/>
      </form>
      <section className={styles.result}>
        {algorithmState.numbers && algorithmState.numbers.map((el, i) => (
          <Column key={i} index={el} state={algorithmState.states[i]}/>
        ))}
      </section>
    </SolutionLayout>
  );
};
