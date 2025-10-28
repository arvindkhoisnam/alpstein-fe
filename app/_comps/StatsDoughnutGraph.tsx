// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// function StatsDoughnutGraph() {
//   const options: ChartOptions<"bar"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: { display: false },
//         ticks: { display: false },
//         border: { display: false },
//       },
//       x: {
//         grid: { display: false },
//         border: { display: false },
//         ticks: {
//           color: "#555",
//           font: {
//             size: 12,
//             weight: 500,
//             family: "'Inter', sans-serif",
//           },
//           padding: 8,
//         },
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//     },
//   };
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Articles",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: "rgba(139, 92, 246, 0.4)", // violet-500/40
//         borderColor: "rgb(139, 92, 246)", // violet-500
//         borderWidth: 1,
//         borderRadius: 2,
//       },
//     ],
//   };
//   return (
//     <div className="h-[90%]">
//       <Doughnut data={data} options={options} />
//     </div>
//   );
// }

// export default StatsDoughnutGraph;

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsDoughnutGraph() {
  const data = {
    labels: ["Long", "Short", "Unclear"],
    datasets: [
      {
        label: "Positions",
        data: [30, 30, 40],
        backgroundColor: [
          "rgba(139, 92, 246, 0.6)", // violet-500
          "rgba(239, 68, 68, 0.6)", // red-500
          "rgba(156, 163, 175, 0.6)", // gray-400
        ],
        borderColor: ["rgb(139, 92, 246)", "rgb(239, 68, 68)", "rgb(156, 163, 175)"],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%", // controls the inner hole size
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#555",
          font: {
            size: 10,
          },
          padding: 16,
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
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default StatsDoughnutGraph;
