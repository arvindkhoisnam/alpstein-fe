import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsBarGraph() {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#555",
          font: {
            size: 12,
            weight: 500,
            family: "'Inter', sans-serif",
          },
          padding: 8,
        },
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Articles",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(139, 92, 246, 0.4)", // violet-500/40
        borderColor: "rgb(139, 92, 246)", // violet-500
        borderWidth: 1,
        borderRadius: 2,
      },
    ],
  };

  return (
    <div className="h-[90%]">
      <Bar data={data} options={options} />
    </div>
  );
}

export default StatsBarGraph;
