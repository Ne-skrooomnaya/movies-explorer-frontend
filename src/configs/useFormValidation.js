import React from "react";
import { useCallback } from "react";

function useFormValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });

    if (name === "name") {
      if(value.length === 0) {
        setErrors({...errors, [name]: "Пожалуйста заполните это поле"});
      }
    }

    if (name === "email" || name === "password") {
      if(value.length === 0) {
        setErrors({...errors, [name]: "Пожалуйста заполните это поле"});
      }
    }

    setIsValid(target.closest("form").checkValidity());

  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export default useFormValidation;