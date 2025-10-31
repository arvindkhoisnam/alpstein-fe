/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutControllerChartOptions,
} from "chart.js";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useCurrentCryptoId } from "../lib/zustand";
import { useEffect, useMemo } from "react";

ChartJS.register(Tooltip, Legend, ArcElement, ChartDataLabels);
const gaugeNeedle = {
  id: "needle",
  // afterDatasetsDraw(chart, args, plugins) {
  afterDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any; data?: any }) {
    const { ctx, data } = chart;

    ctx.save();
    const xCenter = chart.getDatasetMeta(0).data[0].x;
    const yCenter = chart.getDatasetMeta(0).data[0].y;
    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
    const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
    const end = (outerRadius - innerRadius) / 2;
    const radius = 4;
    const angle = Math.PI / 180;
    const needleValue = data.datasets[0].needleValue;

    // const total = data.datasets[0].data.reduce(
    //   (a: number, b: number) => a + b,
    //   0
    // );

    const circumference =
      (chart.getDatasetMeta(0).data[0].circumference / Math.PI / data.datasets[0].data[0]) *
      needleValue;

    ctx.translate(xCenter, yCenter);
    ctx.rotate(Math.PI * (circumference + 1.5));
    //needle
    ctx.beginPath();
    // ctx.strokeStyle = "#d4d4d8";
    ctx.strokeStyle = "#3f3f46";
    // ctx.fillStyle = "#d4d4d8";
    ctx.fillStyle = "#3f3f46";
    ctx.moveTo(0 - radius, 0);
    ctx.lineTo(0, 0 - innerRadius - end);
    ctx.lineTo(0 + radius, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    //arc
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, angle * 360, false);
    ctx.fill();
    ctx.restore();
  },
};

const NEEDLE_VAL: {
  [senti: string]: number;
} = {
  "#bearishSignal": 22.5,
  "#volatility": 45 + 22.5,
  "#bullishSignal": 90 + 22.5,
  "#whaleMovement": 135 + 22.5,
};

function SentimentGauge() {
  const { cryptoData } = useCurrentCryptoId();
  const rootStyles = getComputedStyle(document.documentElement);
  const defaultBorder = rootStyles.getPropertyValue("--background").trim();
  // const [border, setBorder] = useState("#f4f4f5");
  // const [border, setBorder] = useState("#e7e5e4");
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        // setBorder("#01030c");
      } else {
        // setBorder("#f4f4f5");
        // setBorder("#e7e5e4");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      // setBorder(defaultBorder);
    }

    return () => observer.disconnect();
  }, [defaultBorder]);

  const DATA = useMemo(
    () => ({
      // labels: ["#bearish", "#volatility", "#bullish", "#whale"],
      datasets: [
        {
          label: "",
          data: [45, 45, 45, 45],
          // backgroundColor: ["#52525c", "#9f9fa9", "#e4e4e7", "#fafafa"],
          backgroundColor: ["#ffa2a2", "#ffb86a", "#7bf1a8", "#8ec5ff"],
          borderWidth: 4,
          // borderColor: border,
          borderColor: "transparent",
          borderRadius: 3,
          rotation: 270,
          circumference: 180,
          cutout: "90%",
          needleValue: NEEDLE_VAL[cryptoData!.tag],
        },
      ],
    }),
    [cryptoData]
  );
  // @ts-expect-error
  const options: DoughnutControllerChartOptions = useMemo(
    () => ({
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        // datalabels: { display: false },
        datalabels: {
          display: false,
          color: "#333",
          font: {
            size: 8,
            weight: "bold",
          },
          anchor: "center",
          align: "center",
          offset: 0,
          formatter: (
            value: any,
            context: {
              chart: { data: { labels: { [x: string]: any } } };
              dataIndex: string | number;
            }
          ) => {
            return context.chart.data.labels[context.dataIndex];
          },
        },
      },
      // spacing: 0,
      // radius: "",
      // offset: 0,
      // circumference: 180,
      // cutout: "90%",
      // rotation: 270,
      animation: {
        duration: 700,
        easing: "easeInOut",
      },
    }),
    []
  );

  return (
    <motion.div
      key={cryptoData?.id}
      initial={{
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
        delay: 0.1,
      }}
      className={cn(
        // "relative flex max-h-60 min-h-60 max-w-full min-w-full items-center justify-center rounded-lg p-2",
        "relative flex max-h-40 min-h-40 w-full items-center justify-center rounded-lg p-2 md:max-h-54 md:min-h-54 2xl:max-h-60 2xl:min-h-60",
        "border border-[var(--cardborder)]"
        // "shadow-[var(--shadow)] transition-shadow duration-500"
        // "relative shadow-[var(--shadow)] transition-shadow duration-500"
      )}
    >
      <span className="absolute top-2 left-0 px-2 text-start text-sm font-semibold text-[var(--secondarytext)]">
        Sentiment Gauge
      </span>
      <Doughnut
        options={options}
        data={DATA}
        plugins={[gaugeNeedle]}
        style={{ backgroundColor: "transparent", height: "120px", width: "120px" }}
      />
      <div className="absolute bottom-3 left-1/2 flex w-[95%] -translate-x-1/2 items-center justify-center gap-3 text-[10px] text-[var(--secondarytext)]">
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-[#ffa2a2]" />
          Bearish
        </div>
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-[#ffb86a]" />
          Volatility
        </div>
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-[#7bf1a8]" />
          Bullish
        </div>
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-[#8ec5ff]" />
          Whale
        </div>
      </div>
    </motion.div>
  );
}

export default SentimentGauge;
