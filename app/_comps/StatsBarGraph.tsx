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
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsBarGraph() {
  // const [barColor, setBarColor] = useState("");
  // const [textColor, setTextColor] = useState("");
  const [labelColor, setLabelColor] = useState("");

  const updateBarColor = () => {
    // const barColor = getComputedStyle(document.documentElement)
    //   .getPropertyValue("--barChart")
    //   .trim();
    // const barText = getComputedStyle(document.documentElement).getPropertyValue("--barText").trim();
    const labelText = getComputedStyle(document.documentElement)
      .getPropertyValue("--primarytext")
      .trim();

    // setBarColor(barColor);
    // setTextColor(barText);
    setLabelColor(labelText);
  };

  useEffect(() => {
    updateBarColor();

    // Watch for dark mode toggle
    const observer = new MutationObserver(() => {
      updateBarColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
          color: labelColor,
          font: {
            size: 10,
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
      datalabels: {
        // color: textColor,
        color: "#333",
      },
    },
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Articles",
        data: [65, 59, 80, 81, 56, 55, 40],
        // backgroundColor: barColor,
        backgroundColor: "#a3b3ff",
        borderRadius: 5,
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
