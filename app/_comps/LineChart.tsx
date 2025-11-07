/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
  LineControllerChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  annotationPlugin
);

type BinanceKline = [
  number, // Open time (ms since epoch)
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time (ms since epoch)
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field
];

function dateFormatter(iso: string) {
  const date = new Date(iso);

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based!
  const dd = String(date.getDate()).padStart(2, "0");

  const formatted = `${dd}/${mm}`;
  return formatted;
}
export default function LineChart({ coin, direction }: { coin: string; direction: "down" | "up" }) {
  const [label, setLabel] = useState<string[]>([]);
  const [pricePoints, setPricePoints] = useState<number[]>([]);
  const rootStyles = getComputedStyle(document.documentElement);
  const defaultHeroGridColor = rootStyles.getPropertyValue("--graphgrid").trim();
  const [heroGridColor, setHeroGridColor] = useState("#d4d4d8");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        setHeroGridColor("#18181b");
      } else {
        setHeroGridColor("#d4d4d8");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      setHeroGridColor(defaultHeroGridColor);
    }

    return () => observer.disconnect();
  }, [defaultHeroGridColor]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${coin}USDT&interval=1d&limit=5`
      );
      const labels = res.data.map((d: BinanceKline) => dateFormatter(new Date(d[0]).toISOString()));
      const prices = res.data.map((d: BinanceKline) => Number(d[4]));
      setLabel(labels);
      setPricePoints(prices);
    }
    getData();
  }, [coin]);
  const DATA = {
    labels: label,
    datasets: [
      {
        label: "$",
        data: pricePoints,
        // borderColor: "rgb(75,192,192)",
        borderColor: `${direction === "down" ? "#ff637e" : "#3ab2b2"}`,
        // borderColor: `${direction === "down" ? "#ffa1ad" : "rgb(75,192,192)"}`,
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const options: LineControllerChartOptions = {
    // @ts-ignore
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 12, // 👈 smaller size for tooltip body text
        },
        titleFont: {
          size: 8, // 👈 smaller size for tooltip title
        },
        displayColors: false, // 👈 disables the colored box
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            // context.parsed.y is the data point value
            return `$${context.parsed.y}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          display: false, // ✅ hide x-axis labels
        },
        grid: {
          display: true, // ✅ optional: hide grid lines
          color: heroGridColor,
        },
        border: {
          display: false, // ✅ Hide axis line
          color: "rgba(255, 255, 255, 0.1)", // 👈 your custom grid line color
        },
      },
      y: {
        ticks: {
          display: false, // ✅ hide y-axis labels
        },
        grid: {
          display: true, // ✅ optional: hide grid lines
          color: heroGridColor,
        },
        border: {
          display: false, // ✅ Hide axis line
          color: "rgba(255, 255, 255, 0.1)", // 👈 your custom grid line color
        },
      },
    },
    animation: {
      duration: 800, // 👈 slow down to 2 seconds
      easing: "easeInOut", // 👈 smooth easing
    },
  };
  return (
    <div className="max-h-12 mask-t-from-80% mask-r-from-90% mask-b-from-80% mask-l-from-90% md:max-h-18">
      {/* <div className="max-h-10 mask-t-from-80% mask-r-from-90% mask-b-from-80% mask-l-from-90%"> */}
      <Line options={options} data={DATA} />
    </div>
  );
}
