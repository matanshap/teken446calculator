import React, { useState } from "react";

export default function useFormFields<T>(initialValues: T) {
    const [formFields, setFormFields] = useState<T>(initialValues)
    const createChangeHandler = (key: keyof T) => (
        e: React.ChangeEvent<HTMLInputElement>,
      ) => {
        const value = e.target.valueAsNumber;
        setFormFields((prev: T) => ({ ...prev, [key]: value }));
      };
      return { formFields, createChangeHandler };
}