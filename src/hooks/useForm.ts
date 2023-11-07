import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type UseFormValues = {
  [name: string]: string
};

type UseFormHookReturn = [
  values: UseFormValues,
  handleChange: (event: FormEvent) => void,
  setValues: Dispatch<SetStateAction<UseFormValues>>,
];



export const useForm = (inputValues: UseFormValues = {}): UseFormHookReturn => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: FormEvent) => {
    const  {value, name} = event.target as HTMLInputElement;
    setValues({...values, [name]: value});
  };

  return [values, handleChange, setValues];
}