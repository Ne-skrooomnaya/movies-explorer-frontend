import {useCallback, useState} from 'react';

function useFormValidation() {
  const [values, setValues] = useState({ name: '', email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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
    (newValues = { name: '', email: '', password: '' }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, setIsValid, resetForm };
}

export default useFormValidation;