// app/components/matrix.tsx
"use client";

import { useState } from "react";
import { Machine, ProductionData } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClockIcon, BarChartIcon, BoxIcon } from "lucide-react";

interface MatrixProps {
  machine: Machine;
  productionData: ProductionData[];
}

export default function MatrixComponent({ machine, productionData }: MatrixProps) {
  const [activeTab, setActiveTab] = useState<string>("details");

  const lastProduction = productionData[productionData.length - 1];

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{machine.naam}</CardTitle>
          <Badge variant={machine.actief ? "default" : "destructive"}>
            {machine.actief ? "Actief" : "Inactief"}
          </Badge>
        </div>
        <CardDescription>{machine.omschrijving}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="production">Productie</TabsTrigger>
            <TabsTrigger value="maintenance">Onderhoud</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <BoxIcon className="w-5 h-5 mr-2 text-gray-500" />
                <span>Serienummer: {machine.serienummer}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-gray-500" />
                <span>Bouwjaar: {machine.bouwjaar}</span>
              </div>
              <div className="flex items-center">
                <BarChartIcon className="w-5 h-5 mr-2 text-gray-500" />
                <span>
                  Aanschafwaarde: €{machine.aanschafwaarde.toLocaleString("nl-NL")}
                </span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="production">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Start Tijd</TableHead>
                  <TableHead>Eind Tijd</TableHead>
                  <TableHead>Hoeveelheid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productionData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.start_date}</TableCell>
                    <TableCell>{data.start_time}</TableCell>
                    <TableCell>{data.end_time}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="maintenance">
            <p>
              Laatste onderhoud:{" "}
              {new Date(machine.wijzigactief * 1000).toLocaleDateString()}
            </p>
            <p>
              Garantie tot:{" "}
              {new Date(machine.garantietot * 1000).toLocaleDateString()}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Laatste productie</p>
          <p className="font-medium">
            {lastProduction
              ? `${lastProduction.start_date} ${lastProduction.start_time}`
              : "Geen data"}
          </p>
        </div>
        <Button>Plan Onderhoud</Button>
      </CardFooter>
    </Card>
  );
}
