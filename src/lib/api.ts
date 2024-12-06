import { createClient } from '@supabase/supabase-js';
import {Machine, Maintenance, Mechanic, Mold} from "../types";

// Define environment variables for security
const SUPABASE_URL = "https://supa.q3.sug.lol"
const SUPABASE_ANON_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMzM1Mzc0MCwiZXhwIjo0ODg5MDI3MzQwLCJyb2xlIjoiYW5vbiJ9.qJ2GxWPaBzEdpDgbfDBNgtpNPXYQFeadbqirk-VGNls";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase environment variables are missing');
}

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export const fetchMachines = async (): Promise<Machine[]> => {
    const { data, error } = await supabase
        .from('v_machine_status')
        .select('*')
        .order('status', { ascending: false });

    if (error) {
        throw new Error(`Error fetching machine timelines: ${error.message}`);
    }

    return data || [];
};

export async function fetchMechanics(): Promise<Mechanic[]> {
    const { data, error } = await supabase
        .from('i_mechanics')
        .select('*');

    if (error) {
        throw new Error(`Error fetching mechanics: ${error.message}`);
    }

    return data || []
}

export async function fetchMolds(): Promise<Mold[]> {
    const { data, error } = await supabase
        .from('v_molds')
        .select('*');

    if (error) {
        throw new Error(`Error fetching molds: ${error.message}`);
    }

    return data || []
}

export async function fetchMaintenance(): Promise<Maintenance[]> {
    const { data, error } = await supabase
        .from('i_maintenance')
        .select('*');

    if (error) {
        throw new Error(`Error fetching mechanics: ${error.message}`);
    }

    return data || []
}

export async function insertNewMaintenance(maintenance: Omit<Maintenance, "id" | "status">) {

    // @ts-expect-error asd
    if (maintenance["maintenance_type"] == "Correctief"){
        maintenance["maintenance_type"] = "Corrective"
        // @ts-expect-error asd
    } else if (maintenance["maintenance_type"] == "Preventatief"){
        maintenance["maintenance_type"] = "Preventative"
    }

    const { error } = await supabase
        .from('i_maintenance_plans')
        .insert(maintenance)

    if (error) {
        throw new Error(`Error inserting maintenance: ${error.message}`);
    }

    return;
}