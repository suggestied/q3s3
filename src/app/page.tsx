import MoldHistoryChart from "@/components/mold-history-chart";

export default function Home() {
  const moldIds = [262, 267, 304, 275, 297, 272];
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {
          moldIds.map((id) => (
            <MoldHistoryChart key={id} id={id} />
          ))
        }
      </div>
    </div>
  );
}
