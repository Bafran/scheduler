import { FormControl, InputLabel, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

interface SelectionInputProps {
  label: string;
  name: string;
  selections: string[];
}

export const SelectionInput: React.FC<SelectionInputProps> = ({
  label,
  ...props
}) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.selections}
      getOptionLabel={(option: any) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
};
