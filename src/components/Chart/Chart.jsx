import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./chart.module.scss";
import { useEffect, useState } from "react";

const Chart = ({
  labels = [],
  chartData = [],
  title = "",
  type = "vertical",
  getChart = () => {},
}) => {
  const [chart, setChart] = useState(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  const options = {
    indexAxis: type === "horizontal" ? "y" : "x",
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    dataLabels: {
      display: true,
      color: "#515151",
    },
    animation: {
      onComplete: function () {
        setChart(this);
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          "rgba(37, 133, 243, 0.3)",
          "rgba(255, 195, 0, 0.3)",
          "rgba(169, 194, 63, 0.3)",
          "rgba(219, 0, 7, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(185, 33, 142, 0.3)",
          "rgb(51, 250, 255, 0.3)",
          "rgba(0, 255, 144, 0.3)",
        ],
        borderColor: [
          "rgba(37, 133, 243, 1)",
          "rgba(255, 195, 0, 1)",
          "rgba(169, 194, 63, 1)",
          "rgba(219, 0, 7, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(185, 33, 142, 1)",
          "rgb(51, 250, 255, 1)",
          "rgba(0, 255, 144, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (chart) {
      getChart(chart);
    }
  }, [chart]);

  return (
    <div className={styles.block}>
      <Bar type={"bar"} data={data} options={options} />
    </div>
  );
};

export default Chart;
