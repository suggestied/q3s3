import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PlanningDialogProps {
  isOpen: boolean;
}

export default function PlanningDialog({
  isOpen,
}: PlanningDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="min-w-[40rem] w-[90dwv] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>test</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}