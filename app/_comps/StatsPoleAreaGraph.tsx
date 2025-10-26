import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function StatsPoleAreaGraph() {
  const data = {
    labels: ["Target Hit", "SL Hit", "Pending"],
    datasets: [
      {
        label: "Trade Stats",
        data: [30, 45, 25],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)", // green-500/60
          "rgba(239, 68, 68, 0.6)", // red-500/60
          "rgba(156, 163, 175, 0.6)", // gray-400/60
        ],
        borderColor: ["rgb(34, 197, 94)", "rgb(239, 68, 68)", "rgb(156, 163, 175)"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        angleLines: {
          color: "rgba(255,255,255,0.1)",
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#555",
          font: {
            size: 10,
            family: "'Inter', sans-serif",
          },
          padding: 14,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 8,
      },
    },
  };

  return (
    <div className="h-[90%]">
      <PolarArea data={data} options={options} />
    </div>
  );
}

export default StatsPoleAreaGraph;
