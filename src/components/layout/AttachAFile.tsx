import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoImageOutline } from "react-icons/io5";

export function AttachAFile() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <IoImageOutline />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Attach a file</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
