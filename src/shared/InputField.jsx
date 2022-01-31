import * as React from "react";
import { TextField } from "@mui/material";

export default function InputField({
  rows,
  id,
  multiline,
  placeholder,
  size,
  style,
  onChange,
  startAdornment,
  helperText,
  value,
  fullWidth,
}) {
  return (
    <>
      <TextField
        id={id}
        rows={rows}
        multiline={multiline}
        placeholder={placeholder}
        size={size}
        style={style}
        value={value}
        onChange={onChange}
        helperText={helperText}
        InputProps={{
          startAdornment: startAdornment,
        }}
      />
    </>
  );
}
