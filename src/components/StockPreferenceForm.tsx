import * as React from "react";
import { getStockQuote } from "../../api";
import { IStockData } from "./../types";

interface IStockPreferenceFormProps {
  symbol: string;
  handleSetStockData: (data: IStockData) => void;
}

const StockPreferenceForm: React.FC<IStockPreferenceFormProps> = ({
  handleSetStockData,
  symbol,
}) => {
  const [interval, setInterval] = React.useState<string>("5min");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [realTime, setRealTime] = React.useState<boolean>(true); // Switch between real time and historical

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
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <input
              type="radio"
              value="realtime"
              checked={realTime}
              onChange={handleCheckboxChange}
              name="dataOption"
            />
            <label>
              Tiempo real: (utiliza la fecha actual, con el intervalo
              seleccionado)
            </label>
          </div>
          <div style={{ margin: "10px 0px" }} />
          <label>
            <input
              type="radio"
              value="history"
              onChange={handleCheckboxChange}
              name="dataOption"
            />
            Historico:
            <input
              type="date"
              disabled={realTime}
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              disabled={realTime}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </label>
          <div style={{ margin: "10px 0px" }} />
          <label>
            Intervalo:
            <select value={interval} onChange={handleIntervalChange}>
              <option value="1min">1 minutos</option>
              <option value="5min">5 minutos</option>
              <option value="15min">15 minutos</option>
            </select>
          </label>
        </div>
        <div style={{ margin: "10px 0px" }} />
        <button type="submit">Graficar</button>
      </form>
    </>
  );
};

export default StockPreferenceForm;
