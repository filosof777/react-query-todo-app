import React, { useState } from "react";

function useForm(initialState) {
  const [values, setValue] = useState(initialState);

  return [
    values,
    (e) => {
      setValue({ ...values, [e.target.name]: e.target.value });
    },
  ];
}

export default useForm;
