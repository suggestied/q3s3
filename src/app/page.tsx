import MoldHistoryChart from "@/components/mold-history-chart";

interface Mold {
  board: string;
  port: string;
  start: string;
  machine: number;
  hothalf: number;
}

// Server component - no "use client" directive
export default async function Home() {
  // Fetch data on the server side
  const response = await fetch(
    "https://q4api.keke.ceo/v1/machine/all/molds/current",
    {
      cache: "no-store", // Avoid caching the data on the server
    }
  );

  const molds: Mold[] = await response.json();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {molds.map((mold) => (
          <MoldHistoryChart
            key={mold.machine}
            board={mold.board}
            port={mold.port}
          />
        ))}
      </div>
    </div>
  );
}
