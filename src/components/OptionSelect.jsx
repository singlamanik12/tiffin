import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select, Grid } from "@mui/material";

export default function OptionSelect({
  options,
  label,
  selected,
  onChange,
  style,
  id,
}) {
  return (
    <Grid item xs={12} container style={style}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          name={id}
          value={selected}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
