import {Dialog, DialogContent, DialogTrigger} from "../ui/dialog.tsx";
import {Plus} from "lucide-react";
import {Input} from "../ui/input.tsx";
import {FormEvent, useEffect, useState} from "react";
import {Maintenance, Mechanic, Mold} from "../../types";
import {fetchMechanics, fetchMolds} from "../../lib/api.ts";

export default function CreatePlanDialog(){
    const [maintenance, se] = useState<Omit<Maintenance, "id" | "status">>();
    const [molds, setMolds] = useState<Mold[]>([]);
    const [mechanics, setMechanics] = useState<Mechanic[]>([]);

    function handleSubmit(e: FormEvent) {

    }

    useEffect(() => {
        fetchMolds().then((fetchedMolds) => setMolds(fetchedMolds));
        fetchMechanics().then((mechanics) => setMechanics(mechanics));
    }, []);

    return (
        <Dialog>
            <DialogTrigger className="button"><Plus size={20}/> Onderhoud plannen</DialogTrigger>
            <DialogContent>
                <form>
                    <span className={"small font-semibold block mb-4"}>Onderhoud plannen</span>
                    <div className={"grid grid-cols-2 items-center gap-3"}>
                        <span className={"text-sm font-semibold"}>Datum</span>
                        <Input required type={"datetime-local"}/>

                        <span className={"text-sm font-semibold"}>Matrijs</span>
                        <select required>
                            <option value="" disabled selected>Selecteer een optie</option>
                            {molds.map((m) => <option value={m.id} key={m.id}>{m.description}</option>)}
                        </select>

                        <span className={"text-sm font-semibold"}>Onderhoudstype</span>
                        <select required>
                            <option value="" disabled selected>Selecteer een optie</option>
                            <option>Preventief</option>
                            <option>Correctief</option>
                        </select>

                        <span className={"text-sm font-semibold"}>Onderhoudsactie</span>
                        <select required>
                            <option value="" disabled selected>Selecteer een optie</option>
                            <option>Kalibreren</option>
                            <option>Poetsen</option>
                        </select>

                        <span className={"text-sm font-semibold"}>Monteur</span>
                        <select required>
                            <option value="" disabled selected>Selecteer een optie</option>
                            {mechanics.map((mechanic) => (
                                <option value={mechanic.id}
                                        key={mechanic.id}>{mechanic.name} ({mechanic.specialization})</option>
                            ))}
                        </select>
                    </div>

                    <div className={"w-full flex mt-4"}>
                        <button type={"submit"} className="ml-auto button"><Plus size={20}/> Plannen</button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}