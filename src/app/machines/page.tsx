"use client";

import { useState, useEffect } from "react";
import { MachineComponent } from "@/components/machine";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { Machine } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Machine>("naam");

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch("https://q4api.keke.ceo/api/pure/list");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Machine[] = await response.json();
        setMachines(data);
        setFilteredMachines(data);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  useEffect(() => {
    const filtered = machines.filter(
      (machine) =>
        machine.naam.toLowerCase().includes(search.toLowerCase()) ||
        machine.omschrijving.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    setFilteredMachines(sorted);
  }, [search, machines, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Machine Management</CardTitle>
          <CardDescription>View and manage your machines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search machines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as keyof Machine)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="naam">Name</SelectItem>
                <SelectItem value="bouwjaar">Build Year</SelectItem>
                <SelectItem value="actief">Active Status</SelectItem>
              </SelectContent>
            </Select>
            <Button>Add Machine</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {filteredMachines.map((machine) => (
          <MachineComponent key={machine.id} machine={machine} />
        ))}
      </div>
      {filteredMachines.length === 0 && (
        <Card className="mt-6">
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-center text-muted-foreground">
              No machines found.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
