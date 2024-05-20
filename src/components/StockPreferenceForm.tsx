import React from "react";
import { getStockQuote } from "../../api";
import RadioButton from "./atomics/RadioButton";
import DateInput from "./atomics//DateInput";
import IntervalSelect from "./atomics//IntervalSelect";
import Button from "./atomics/Button";
import { IStockPreferenceFormProps } from "../types";

const StockPreferenceForm: React.FC<IStockPreferenceFormProps> = ({
  symbol,
  handleSetStockData,
}) => {
  const [interval, setInterval] = React.useState("5min");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [realTime, setRealTime] = React.useState(true);

  React.useEffect(() => {
    async function fetchDefaultData() {
      try {
        const data = await getStockQuote(symbol, interval, startDate, endDate);
        handleSetStockData(data);
      } catch (error) {
        console.error("Error fetching default stock data:", error);
      }
    }

    fetchDefaultData();
  }, [symbol]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = await getStockQuote(symbol, interval, startDate, endDate);
      handleSetStockData(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }

  function handleIntervalChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setInterval(event.target.value);
  }

  function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRealTime(event.target.value === "realtime");
  }

  return (
    <form onSubmit={handleSubmit}>
      <RadioButton
        name="dataOption"
        value="realtime"
        checked={realTime}
        onChange={handleCheckboxChange}
        label="Tiempo real: (utiliza la fecha actual, con el intervalo seleccionado)"
      />

      <div style={{ margin: "10px 0px" }} />

      <div style={{ display: "flex" }}>
        <RadioButton
          name="dataOption"
          value="history"
          checked={!realTime}
          onChange={handleCheckboxChange}
          label="Historico:"
        />
        <div style={{ margin: "0px 5px" }} />
        <DateInput
          disabled={realTime}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DateInput
          disabled={realTime}
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <div style={{ margin: "10px 0px" }} />
      <IntervalSelect value={interval} onChange={handleIntervalChange} />
      <div style={{ margin: "10px 0px" }} />
      <Button type="submit">Graficar</Button>
    </form>
  );
};

export default StockPreferenceForm;
