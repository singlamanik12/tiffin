import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select, Grid } from "@mui/material";

export default function OptionSelect({
  options,
  label,
  selected,
  onChange,
  style,
  id,
  name,
  error,
}) {
  return (
    <Grid item xs={12} container style={style}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          name={name}
          value={selected}
          label={label}
          onChange={onChange}
          error={error}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
