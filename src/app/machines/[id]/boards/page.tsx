import { Suspense } from "react";
import MoldHistoryChart from "@/components/mold-history-chart";
import { notFound } from "next/navigation";

interface Mold {
  board: string;
  port: string;
  start: string;
  machine: number;
  hothalf: number;
}

interface PageProps {
  params: { id: string };
}

async function fetchMolds(id: string): Promise<Mold[]> {
  const response = await fetch(
    `https://q4api.keke.ceo/v1/machine/${id}/molds/current`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch molds");
  }

  return response.json();
}

export default async function Page({ params }: PageProps) {
  let molds: Mold[];

  try {
    molds = await fetchMolds(params.id);
  } catch (error) {
    console.error("Error fetching molds:", error);
    return <div>Error loading mold data. Please try again later.</div>;
  }

  if (molds.length === 0) {
    return <div>No molds found for this machine.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Shots History for Machine {params.id}
      </h1>
      <div className="grid lg:grid-cols-1 gap-4">
        {molds.map((mold) => (
          <Suspense
            key={mold.machine}
            fallback={<div>Loading mold history...</div>}
          >
            <MoldHistoryChart board={mold.board} port={mold.port} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
