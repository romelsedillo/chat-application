import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiOutlineVideoCamera } from "react-icons/hi2";

export function StartAVideoCall() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <HiOutlineVideoCamera className="w-5 h-5 text-gray-600" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Start a video call</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
