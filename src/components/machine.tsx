"use client";

import {Machine, MachineShot} from "@/types";
import {useEffect, useState} from "react";
import {getMachineShots} from "@/lib/api";
import {median} from "d3-array";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {Area, AreaChart, XAxis, YAxis} from "recharts";

interface MachineComponentProps {
    machine: Machine;
    shotsFrom: Date,
    shotsTo: Date
}

const chartConfig = {
    shot_time: {
        label: "duration",
    },
    timestamp: {
        label: "Timestamp",
    },
} satisfies ChartConfig

export function MachineComponent({machine, shotsFrom, shotsTo}: MachineComponentProps) {

    const [shots, setShots] = useState<MachineShot[]>([]);

    useEffect(() => {
        getMachineShots(machine.id, shotsFrom, shotsTo).then(shots => {
            console.log(shots.data);
            setShots(shots.data.map(shot => {
                return {
                    shot_time: shot.shot_time,
                    timestamp: new Date(shot.timestamp),
                }
            }));
        }).catch(() => {
            alert("Error getting machine shot data.")
        });
    }, [machine.id, shotsFrom, shotsTo]);

    return (
        <div className={`flex flex-col basis-52 p-6 rounded-lg bg-green-500 text-zinc-50`}>
            <div className={"flex mb-3 gap-10"}>
                <div className="">
                    <span className="font-semibold text-2xl block">{machine.name}</span>
                    <span className="block">ID: {machine.id}</span>
                </div>

                <div className="flex flex-col">
                    <b className={"text-xl"}>{shots.length}</b>
                    <span>shots</span>
                </div>
                <div className="flex flex-col mr-auto">
                    <b className={"text-xl block"}>{median(shots.map(s => s.shot_time))?.toFixed(2) ?? "n/a"}</b>
                    <span>avg shot</span>
                </div>
            </div>
            <ChartContainer className="m-auto w-full border rounded-xl p-2 h-fit border-white/30 shadow-xl"
                            config={chartConfig}>
                <AreaChart className="p-0 m-0"
                           data={shots}
                >
                    <YAxis
                        dataKey="shot_time"
                        tickLine={false}
                        axisLine={false}
                        className="text-zinc-50"
                        width={22}
                        stroke={"rgb(250,250,250)"}
                        scale="linear"
                        domain={[Math.min(...shots.map(s => s.shot_time)) - 0.1, Math.max(...shots.map(s => s.shot_time)) + 0.1]}
                    />
                    <XAxis
                        dataKey="time_stamp"
                        tickLine={false}
                        axisLine={false}
                        className="text-zinc-50"

                        width={200}
                        domain={[Math.min(...shots.map(s => s.shot_time)) - 0.1, Math.max(...shots.map(s => s.shot_time)) + 0.1]}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot"/>}
                    />
                    <Area
                        dataKey="shot_time"
                        type="natural"
                        fill="rgb(250,250,250)"
                        fillOpacity={1}
                        stroke="rgb(230,230,230)"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    );
}
