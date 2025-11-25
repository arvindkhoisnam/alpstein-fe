import { IconType } from "react-icons";
import { cn } from "../lib/utils";
import { SiChartmogul } from "react-icons/si";
import { SiStackblitz } from "react-icons/si";
import { useEffect, useState } from "react";
import { useCurrentCryptoId } from "../lib/zustand";

function LIveStats({ includeHeading }: { includeHeading: boolean }) {
  const { cryptoData } = useCurrentCryptoId();
  return (
    <div className={cn("flex w-full flex-col gap-1 rounded-lg")}>
      {includeHeading && (
        // <span className="font:medium flex items-center gap-2 text-start text-sm text-[var(--secondarytext)] md:font-semibold">
        <span className="font:medium flex items-center gap-2 text-start text-sm text-[var(--secondarytext)] md:text-xs md:font-semibold 2xl:text-sm">
          Live Stats{" "}
          <span className="text-violet-500">
            <SiStackblitz />
          </span>
        </span>
      )}

      <div className="grid h-full w-full grid-cols-2 gap-1">
        <Comp
          label="Price at creation"
          val={String(Number(cryptoData?.priceAtCreation).toFixed(2))}
          Logo={SiChartmogul}
        />
        <Comp label="Status" val={cryptoData?.status} Logo={SiChartmogul} />
        <Comp label="Position Triggered" val={cryptoData?.triggeredposition} Logo={SiChartmogul} />
        <PandL id={cryptoData?.id} />
      </div>
    </div>
  );
}

function Comp({
  label,
  val,
  Logo,
  // classname,
}: {
  label: string;
  val?: string;
  Logo: IconType;
  // classname?: string;
}) {
  return (
    <div
      className={cn(
        // "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)]",
        "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-1.5",
        "w-full border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          <Logo size={15} />
          {label}
        </span>
        {label === "Status" && (
          <span className="relative flex size-1.5">
            <>
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${val === "pending" ? "bg-amber-500" : val === "triggered" ? "bg-green-500" : ""} opacity-75`}
              ></span>
              <span
                className={`relative inline-flex size-1.5 rounded-full ${val === "pending" ? "bg-amber-500" : val === "triggered" ? "bg-green-500" : ""}`}
              ></span>
            </>
          </span>
        )}
      </div>
      {/* <span className="text-base font-light text-[var(--primarytext)] md:text-lg"> */}
      <span className="text-base font-medium text-[var(--primarytext)] 2xl:text-lg">{val}</span>
    </div>
  );
}

export function PandL({ id }: { id?: string }) {
  const [kind, setKind] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
    ws.onopen = () => {
      ws.send(JSON.stringify({ event: "SUB", payload: id }));
    };

    const heartBeatInterval = setInterval(() => {
      ws.send(JSON.stringify({ event: "ping" }));
    }, 55000);

    ws.onmessage = event => {
      try {
        const msg = JSON.parse(event.data as string);
        const final = msg.value.toFixed(2);
        setKind(msg.kind);
        setValue(final);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    ws.onerror = (error: Event) => {
      console.log("WebSocket error:", error);
    };

    ws.onclose = () => {
      ws.send(JSON.stringify({ event: "UNSUB", payload: id }));
      clearInterval(heartBeatInterval);
    };
    return () => {
      // ws.send(JSON.stringify({ event: "UNSUB", payload: id }));
      // Only send UNSUB if socket is open
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ event: "UNSUB", payload: id }));
      }
      ws.close();
      clearInterval(heartBeatInterval);
      console.log("WS disconnected..");
    };
  }, [id]);
  return (
    <div
      className={cn(
        // "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)]",
        "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5",
        "w-full border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          <SiChartmogul size={15} />
          P&L
        </span>
      </div>
      {value ? (
        <span
          className={cn(
            // "text-base font-light text-[var(--primarytext)] md:text-lg",
            "text-base font-medium text-[var(--primarytext)] 2xl:text-lg",
            `${kind === "profit" ? "text-green-500" : "text-red-500"}`
          )}
        >
          {`${kind === "profit" ? "+" : "-"} ${value} %`}
        </span>
      ) : (
        "-"
      )}
    </div>
  );
}
export default LIveStats;
