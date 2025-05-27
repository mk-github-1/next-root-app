"use client";

import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import type { ChangeEvent } from "react";

// 使用例:
// <Input label="メールアドレス" value={value} error={!!error} helperText={error || "通知に使用します"} />

type Props = Omit<TextFieldProps, "onChange" | "error" | "helperText" | "disabled"> & {
  label: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
};

// Atom
export const Input = ({ label, value, onChange, disabled = false, error = false, helperText = "", ...props }: Props) => {
  return <TextField type="text" label={label} value={value} onChange={onChange} disabled={disabled} error={error} helperText={helperText} fullWidth {...props} />;
};
