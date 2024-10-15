// Imports

import { EyeIcon } from "lucide-react";
import { Button } from "./ui/button";

// interface
interface MoldsDialogProps {
    machine_id: string | number;    
}


// Component function
const MoldsDialog: React.FC<MoldsDialogProps> = ({ machine_id }) => {

  return (
    <div key={machine_id}>
      <Button variant="default" className="w-full ">
        <EyeIcon className="w-4 h-4 mr-2" />
        View
      </Button>
    </div>
  );
};

export default MoldsDialog;