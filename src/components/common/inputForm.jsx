import React from "react";
import { useField } from "formik";

const InputForm = ({ label, ...fieldProps }) => {
  const [field, meta] = useField(fieldProps);
  return (
    <div className="common-form">
      <label htmlFor={fieldProps.name}>{label}</label>
      <input {...field} {...fieldProps} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default InputForm;