"use client";
import 'dotenv/config'

import {useEffect, useState} from "react";
import {MachineComponent} from "@/components/machine";
import {Loader2, Settings,} from "lucide-react";
import {Machine} from "@/types";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {getMachines} from "@/lib/api";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {addMinutes} from "date-fns";

const timeRanges = [
    5, 15, 30, 60, 360, 720, 1440
]

const initialTimeFrom = "2020-09-02T10:00:00.000Z"
const initialTimeTo = "2020-09-02T11:00:00.000Z"

export default function Page() {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [settingsOpened, setSettingsOpened] = useState<boolean>(false);
    const [timeFrom, setTimeFrom] = useState(new Date(initialTimeFrom));
    const [timeTo, setTimeTo] = useState(new Date(initialTimeTo));
    const [timeRange, setTimeRange] = useState(timeRanges[0]);

    useEffect(() => {
        setTimeTo(addMinutes(timeFrom, timeRange))
    }, [timeRange, timeFrom]);

    useEffect(() => {
        setLoading(true);
        getMachines().then(data => {
            setMachines(data.data)
            setLoading(false);
        }).catch(() => {
            setError("An error occurred while fetching data");
            setLoading(false);
        })
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin"/>
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
            <Card className={"mb-5 max-w-[40rem] mx-auto"}>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center">
                            <span className="block mr-auto">Machines [{machines.length} results]</span>
                            <Button onClick={() => setSettingsOpened(!settingsOpened)}><Settings/></Button>
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent className={`${settingsOpened ? "visible flex flex-col" : "hidden"}`}>
                    <div className="grid grid-cols-2 items-center gap-y-2">
                        <span>From</span>
                        <Input value={new Date(initialTimeFrom).toISOString().slice(0, 16)}
                               onChange={(value) => setTimeFrom(new Date(value.target.value) ?? new Date(Date.now()))}
                               type="datetime-local"/>

                        <span>Range</span>
                        <Select onValueChange={(t) => setTimeRange(Number(t))}>
                            <SelectTrigger>{timeRange} minutes</SelectTrigger>
                            <SelectContent>
                                {timeRanges.map((item, i) => (
                                    <SelectItem value={item.toString()} key={i}>{item} minutes</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <span>Search</span>
                        <Input type={"text"} placeholder={"Search..."}/>

                    </div>
                </CardContent>
            </Card>
            {machines.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {machines.map((machine) => (
                        <MachineComponent key={machine.id} shotsFrom={timeFrom} shotsTo={timeTo} machine={machine}/>
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
        </div>
    );
}
