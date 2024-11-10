import axios, {AxiosResponse} from "axios";
import {Machine, MachineShot, Mold, MoldHistory} from "@/types";

const axiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL, responseType: "json"})

export async function getMolds(skip: number = 0, limit: number = 5): Promise<AxiosResponse<Mold[], Mold>> {
    return await axiosInstance.get("/mold/list", {params: {skip: skip, limit: limit}});
}

export async function getMoldHistory(moldId: number, skip: number = 0, limit: number = 5): Promise<AxiosResponse<MoldHistory[], Mold>> {
    return await axiosInstance.get("/mold/history", {params: {skip: skip, limit: limit, moldId: moldId}});
}


export async function getMachines(skip: number = 0, limit: number = 5): Promise<AxiosResponse<Machine[]>> {
    return await axiosInstance.get("/machine/list", {params: {skip: skip, limit: limit}});
}

export async function getMachineShots(machineId: number, from: Date, to: Date): Promise<AxiosResponse<MachineShot[]>> {
    return await axiosInstance.get("/machine/shots", {params: {from: from, to: to, machineId: machineId}});
}