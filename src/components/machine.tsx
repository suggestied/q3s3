"use client";

import {Machine, MachineShot} from "@/types";
import {useEffect, useState} from "react";
import {getMachineShots} from "@/lib/api";
import {median} from "d3-array";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, YAxis} from "recharts";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface MachineComponentProps {
    machine: Machine;
    shotsFrom: Date;
    shotsTo: Date;
}

const chartConfig = {
    shot_time: {
        label: "Duration",
    },
    timestamp: {
        label: "Timestamp",
    },
} satisfies ChartConfig;

export function MachineComponent({machine, shotsFrom, shotsTo}: MachineComponentProps) {
    const [shots, setShots] = useState<MachineShot[]>([]);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        getMachineShots(machine.id, shotsFrom, shotsTo).then(shots => {
            setShots(shots.data.map(shot => ({
                shot_time: shot.shot_time,
                timestamp: new Date(shot.timestamp),
            })));
        }).catch(() => {
            alert("Error getting machine shot data.");
        });
    }, [machine.id, shotsFrom, shotsTo]);

    // Laatste 5 shots voor compact overzicht
    const recentShots = shots.slice(-5);
    const averageShotTime = median(shots.map(s => s.shot_time))?.toFixed(2) ?? "n/a";

    return (
        <>
            <div
                className={`flex flex-col basis-52 p-6 rounded-lg transition-all duration-300 ${shots.length === 0 ? "bg-gray-200 text-zinc-600" : "bg-green-500 text-zinc-50"} 
                hover:scale-105 cursor-pointer shadow-md`}
                onClick={() => setShowInfo(true)}
            >
                <div className="flex mb-3 gap-10">
                    <div>
                        <span className="font-semibold text-2xl block">{machine.name}</span>
                        <span className="block">ID: {machine.id}</span>
                    </div>
                    <div className="flex flex-col">
                        <b className="text-xl">{shots.length}</b>
                        <span>shots</span>
                    </div>
                    <div className="flex flex-col mr-auto">
                        <b className="text-xl block">{averageShotTime}</b>
                        <span>avg shot</span>
                    </div>
                </div>
                <ChartContainer
                    className={`m-auto w-full rounded-xl p-2 h-fit border-white/30 ${shots.length === 0 ? "bg-zinc-300" : "bg-black/5"}`}
                    config={chartConfig}
                >
                    <AreaChart data={shots}>
                        <YAxis
                            dataKey="shot_time"
                            tickLine={false}
                            axisLine={false}
                            width={22}
                            stroke="rgb(250,250,250)"
                            scale="linear"
                            domain={[Math.min(...shots.map(s => s.shot_time)) - 0.1, Math.max(...shots.map(s => s.shot_time)) + 0.1]}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Area dataKey="shot_time" type="natural" fill="rgb(250,250,250)" fillOpacity={1} stroke="rgb(230,230,230)" />
                    </AreaChart>
                </ChartContainer>
            </div>
            <Dialog open={showInfo} onOpenChange={setShowInfo}>
                <DialogContent className="max-w-lg rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-zinc-800">{machine.name}</DialogTitle>
                        <DialogDescription className="text-center mb-4">
                            <span className="block text-sm text-zinc-500">ID: {machine.id}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="px-6 py-4">
                        <div className="flex justify-between mb-4">
                            <div>
                                <b>Board:</b> <span>{machine.board}</span>
                            </div>
                            <div>
                                <b>Port:</b> <span>{machine.port}</span>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <span className="font-semibold text-lg">Shots Summary</span>
                            <p className="mt-2 text-sm text-zinc-700">Total shots: {shots.length}</p>
                            <p className="text-sm text-zinc-700">Average shot time: {averageShotTime}s</p>

                            <div className="mt-4">
                                <span className="font-semibold text-lg">Recent Shots</span>
                                <table className="mt-2 w-full border-collapse">
                                    <thead>
                                    <tr>
                                        <th className="border-b p-2 text-left text-sm text-zinc-700">Date & Time</th>
                                        <th className="border-b p-2 text-left text-sm text-zinc-700">Shot Time (s)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {recentShots.map((shot, index) => (
                                        <tr key={index}>
                                            <td className="p-2 text-sm text-zinc-700">
                                                {new Intl.DateTimeFormat("nl", {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                }).format(shot.timestamp)}
                                            </td>
                                            <td className="p-2 text-sm text-zinc-700">{shot.shot_time}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}