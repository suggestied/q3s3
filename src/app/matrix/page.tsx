import { MoldComponent } from "@/components/mold";

export default function Page() {
  const mold = {
    name: "Test Mold",
    id: 1,
    health: 1,
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
      </div>
    </div>
  );
}
