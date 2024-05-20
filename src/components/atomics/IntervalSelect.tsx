import * as React from "react";
import SelectInput from "./SelectInput";
import { IIntervalSelectProps } from "../../types";

const IntervalSelect: React.FC<IIntervalSelectProps> = ({
  value,
  onChange,
}) => {
  const options = [
    { value: "1min", label: "1 minuto" },
    { value: "5min", label: "5 minutos" },
    { value: "15min", label: "15 minutos" },
  ];

  return (
    <label>
      Intervalo:
      <SelectInput value={value} onChange={onChange} options={options} />
    </label>
  );
};

export default IntervalSelect;
