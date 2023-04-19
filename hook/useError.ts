import { useState } from "react";
type FormError = {
  isError: false;
  isValidated: undefined;
  message: "";
};

export const useError = () => {
  let initalError: FormError = {
    isError: false,
    isValidated: undefined,
    message: "",
  };
  const [error, setError] = useState<FormError>(initalError);

  const clearErrors = () => {
    setError({ ...initalError });
  };

  return { clearErrors, setError, error };
};
