import React, { useState } from "react";

export default function useFormFields<T>(initialValues: T) {
  const [formFields, setFormFields] = useState<T>(initialValues)

  const createChangeHandler = (key: keyof T) => (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      let value: string | number = e.currentTarget.valueAsNumber
      if (value === undefined) value = e.currentTarget.value
      setFormFields((prev: T) => ({ ...prev, [key]: value }));
    };
    return { formFields, createChangeHandler };
}