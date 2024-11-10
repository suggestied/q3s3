import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {MachineShot} from "@/types";
import {median} from "d3-array";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getNormalizedShotData(shots: MachineShot[], maxDelta: number = 0.75) {
    const medianShotTime = median(shots.map(shot => shot.shot_time))!

    return shots.filter(shot => (Math.abs(medianShotTime - shot.shot_time)) < maxDelta)
}