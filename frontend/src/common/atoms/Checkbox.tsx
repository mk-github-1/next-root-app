"use client";

import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import type { ChangeEvent } from "react";

// Style
type CheckboxColor = "primary" | "warning" | "cancel" | "danger" | "info";

const colorMap: Record<CheckboxColor, MuiCheckboxProps["color"]> = {
  primary: "primary",
  warning: "warning",
  cancel: "secondary",
  danger: "error",
  info: "info",
};

// Props
type Props = Omit<MuiCheckboxProps, "color"> & {
  label: string;
  checkboxColor?: CheckboxColor;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

// Atoms
export const Checkbox = ({ label, checkboxColor = "primary", onChange, ...props }: Props) => {
  const color = colorMap[checkboxColor];

  return <FormControlLabel control={<MuiCheckbox color={color} onChange={onChange} {...props} />} label={label} />;
};
