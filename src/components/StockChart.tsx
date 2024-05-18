import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IStockData, IValuesStockData } from "../types";

interface IChartProps {
  stockData: IStockData;
}

const ChartScreen: React.FC<IChartProps> = ({ stockData }) => {
  const symbol = stockData.meta.symbol;

  const chartOptions = {
    title: {
      text: symbol,
    },
    xAxis: {
      categories: stockData.values.map((item: IValuesStockData) => item.datetime), // Eje X con los intervalos de tiempo
      title: {
        text: "Intervalo",
      },
    },
    yAxis: {
      title: {
        text: "Cotización",
      },
    },
    series: [
      {
        name: "Intervalo",
        data: stockData.values.map((item: IValuesStockData) => parseFloat(item.close)),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />
};

export default ChartScreen;
