import { FormControl, Input, InputLabel } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  type?: string;
  label: string;
  name: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControl>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <Input {...field} {...props} />
    </FormControl>
  );
};
