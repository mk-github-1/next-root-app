"use client";

import MuiButton from "@mui/material/Button";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";

// 使用例:
// <Button label="送信" usage="primary" disabled={formInvalid} onClick={handleSubmit} />

// Style
type Usage = "primary" | "warning" | "cancel" | "danger" | "info";

const styleMap: Record<Usage, { color: MuiButtonProps["color"]; variant: MuiButtonProps["variant"] }> = {
  primary: { color: "primary", variant: "contained" },
  warning: { color: "warning", variant: "contained" },
  cancel: { color: "secondary", variant: "contained" },
  danger: { color: "error", variant: "contained" },
  info: { color: "info", variant: "contained" },
};

// Props
type Props = Omit<MuiButtonProps, "color" | "variant"> & {
  label: string;
  usage?: Usage;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// Atom
export const Button = ({ label, usage = "primary", disabled = false, onClick, ...props }: Props) => {
  const { color, variant } = styleMap[usage];

  return (
    <MuiButton color={color} variant={variant} disabled={disabled} onClick={onClick} {...props}>
      {label}
    </MuiButton>
  );
};
