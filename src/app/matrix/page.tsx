import { MoldComponent } from "@/components/mold";

export default function Page() {
  const mold = {
    name: "Test Mold",
    id: 1,
    health: 1,
  };

  const moldRed = {
    name: "Test Mold",
    id: 1,
    health: 0,
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4">
        <MoldComponent mold={moldRed} />
        <MoldComponent mold={moldRed} />
        <MoldComponent mold={moldRed} />
        <MoldComponent mold={moldRed} />
        <MoldComponent mold={moldRed} />

        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
        <MoldComponent mold={mold} />
      </div>
    </div>
  );
}
