"use client";

import { useState, useEffect } from "react";
import { MachineComponent } from "@/components/machine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Search,
  Plus,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Machine } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Machine>("naam");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://q4api.keke.ceo/v1/pure/list?skip=${
            (currentPage - 1) * itemsPerPage
          }&limit=${itemsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMachines(data);
        setTotalItems(100);
        //log
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchMachines();
  }, [currentPage, itemsPerPage]);


  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

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
      <Card className="mb-6">
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
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as keyof Machine)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="naam">Name</SelectItem>
                <SelectItem value="bouwjaar">Build Year</SelectItem>
                <SelectItem value="actief">Active Status</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Machine
            </Button>
            <Button variant="outline">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      {Array.isArray(machines) && machines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <MachineComponent key={machine.id} machine={machine} />
          ))}
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-center text-muted-foreground">
              No machines found.
            </p>
          </CardContent>
        </Card>
      )}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
