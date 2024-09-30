// app/components/matrix.tsx
"use client";

import { Machine, ProductionData } from "@/types";
import {
  Card,
} from "@/components/ui/card";


interface MatrixProps {
  machine: Machine;
  productionData: ProductionData[];
}

export default function MatrixComponent({ machine, productionData }: MatrixProps) {
  console.log(productionData, machine); 

  return (
    <Card className="w-full max-w-3xl">
     test
    </Card>
  );
}
