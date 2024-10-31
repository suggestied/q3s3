import { MoldComponent } from "@/components/mold";
import { machine } from "os";

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
      avgShotDuration24h: Math.floor(Math.random() * 100),
      machine: {
        id: Math.floor(Math.random() * 100),
        name: `Machine ${Math.floor(Math.random() * 100)}`,
      },
    };
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4">
        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />

        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />
        <MoldComponent mold={randomMold()} />
      </div>
    </div>
  );
}
