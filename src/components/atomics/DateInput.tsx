import * as React from "react";
import { IDateInputProps } from "../../types";

const DateInput: React.FC<IDateInputProps> = ({
  disabled,
  value,
  onChange,
}) => (
  <input type="date" disabled={disabled} value={value} onChange={onChange} />
);

export default DateInput;
