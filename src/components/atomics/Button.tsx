import * as React from "react";
import { IButtonProps } from "../../types";

const Button: React.FC<IButtonProps> = ({ type, children }) => (
  <button type={type}>{children}</button>
);

export default Button;
