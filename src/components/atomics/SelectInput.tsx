import * as React from "react";
import { ISelectInputProps } from "../../types";

const SelectInput: React.FC<ISelectInputProps> = ({
  value,
  onChange,
  options,
}) => (
  <select value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectInput;
