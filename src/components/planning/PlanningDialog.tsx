import React from 'react';
import type { Planning } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NewPlanningForm from './NewPlanningForm';
import PlanningGroupSuggestions from './PlanningGroupSuggestions';

interface PlanningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (planning: Partial<Planning> & { selectedTasks?: string[] }) => void;
  title?: string;
  initialValues?: Partial<Planning>;
}

export default function PlanningDialog({
  isOpen,
  onClose,
  onSubmit,
  title = "Nieuwe Planning",
  initialValues
}: PlanningDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NewPlanningForm
            onSubmit={onSubmit}
            onCancel={onClose}
            initialValues={initialValues}
          />
          <PlanningGroupSuggestions />
        </div>
      </DialogContent>
    </Dialog>
  );
}