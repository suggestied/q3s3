import { Machine } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, HammerIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export function MachineComponent({ machine }: { machine: Machine }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{machine.naam}</span>
          <Badge variant={machine.actief ? "default" : "destructive"}>
            {machine.actief ? "Actief" : "Inactief"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">{machine.omschrijving}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">Bouwjaar: {machine.bouwjaar}</span>
          </div>
          <div className="flex items-center">
            <HammerIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">Serienummer: {machine.serienummer}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <SettingsIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">Type: {machine.object}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-semibold">
              Aanschafwaarde: €{machine.aanschafwaarde.toLocaleString("nl-NL")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/machines/${machine.id}`}>

        <Button variant="outline" size="sm">
          Details
        </Button>
        </Link>
        <Button variant="default" size="sm">
          Bewerk
        </Button>
      </CardFooter>
    </Card>
  );
}
