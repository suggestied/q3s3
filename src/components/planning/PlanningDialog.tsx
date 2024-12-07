import CreatePlanDialog from "@/components/planning/CreatePlanDialog.tsx";

interface PlanningDialogProps {
    isOpen: boolean;
}

export default function PlanningDialog({
                                           isOpen,
                                       }: PlanningDialogProps) {
    return (
        <CreatePlanDialog formData={{}} onCreatedNewPlanning={() => {
        }}/>
    );
}