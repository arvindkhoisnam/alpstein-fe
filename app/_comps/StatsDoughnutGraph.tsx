import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsDoughnutGraph() {
  const [labelColor, setLabelColor] = useState("");

  function updateColor() {
    const labelText = getComputedStyle(document.documentElement)
      .getPropertyValue("--primarytext")
      .trim();
    setLabelColor(labelText);
  }

  useEffect(() => {
    updateColor();

    const observer = new MutationObserver(() => {
      updateColor();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  });

  const data = {
    labels: ["Long", "Short", "Unclear"],
    datasets: [
      {
        data: [30, 30, 40],
        backgroundColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        borderColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        borderWidth: 1,
        hoverOffset: 5,
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
          color: labelColor,
          font: {
            size: 10,
          },
          padding: 16,
        },
      },
      datalabels: {
        // color: labelColor,
        color: "#333",
      },
      // tooltip: {
      //   backgroundColor: "rgba(0, 0, 0, 0.7)",
      //   titleFont: { size: 13 },
      //   bodyFont: { size: 12 },
      //   padding: 8,
      // },
    },
  };

  return (
    <div className="h-[90%]">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default StatsDoughnutGraph;
