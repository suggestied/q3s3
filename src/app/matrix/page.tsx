import { MoldComponent } from "@/components/mold";

export default function Page() {
  // random mold function
  // generate 
  // create function

  const randomMold = () => {
    // name is 5 random numbers
    const name = Math.floor(Math.random() * 100000).toString();
    return {
      name: name,
      id: Math.floor(Math.random() * 100),
      health: Math.floor(Math.random() * 100) > 50 ? 1 : 0,
      shots24h: Math.floor(Math.random() * 100),
      isOffline: Math.floor(Math.random() * 100) > 30,
      avgShotDuration24h: Math.floor(Math.random() * 100),
      machine: {
        id: Math.floor(Math.random() * 100),
        name: `Machine ${Math.floor(Math.random() * 100)}`,
      },
    };
  }

  // generate a array with molds
  const molds = Array.from({ length: 10 }, () => randomMold());

  // sort by isOffline, and then by health
  molds.sort((a, b) => {
    if (a.isOffline && !b.isOffline) {
      return 1;
    }
    if (!a.isOffline && b.isOffline) {
      return -1;
    }
    return a.health - b.health;
  }
  );

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {molds.map((mold) => (
          <MoldComponent key={mold.id} mold={mold} />
        ))}
      </div>
    </div>
  );
}
