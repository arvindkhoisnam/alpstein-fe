import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function StatsPoleAreaGraph() {
  const [labelColor, setLabelColor] = useState("");
  const [poleBorder, setPoleBorder] = useState("");

  function updateColor() {
    const labelText = getComputedStyle(document.documentElement)
      .getPropertyValue("--primarytext")
      .trim();
    const pole = getComputedStyle(document.documentElement).getPropertyValue("--poleGraph").trim();
    setLabelColor(labelText);
    setPoleBorder(pole);
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
    labels: ["Target Hit", "SL Hit", "Pending"],
    datasets: [
      {
        label: "Trade Stats",
        data: [30, 45, 25],
        backgroundColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
        borderColor: ["#a3b3ff", "#ff637e", "#3ab2b2"],
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
          // color: "rgba(255,255,255,0.1)",
          color: poleBorder,
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
          color: labelColor,
          font: {
            size: 10,
            family: "'Inter', sans-serif",
          },
          padding: 14,
        },
      },
      datalabels: {
        color: labelColor,
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
      <PolarArea data={data} options={options} />
    </div>
  );
}

export default StatsPoleAreaGraph;
