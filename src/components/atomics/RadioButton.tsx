import * as React from "react";
import { IRadioButtonProps } from "../../types";

const RadioButton: React.FC<IRadioButtonProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
}) => (
  <div>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label>{label}</label>
  </div>
);

export default RadioButton;
