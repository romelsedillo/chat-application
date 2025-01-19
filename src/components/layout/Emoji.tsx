import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GoSmiley } from "react-icons/go";
import { toast } from "sonner";

export function Emoji() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() =>
              toast.error("Emoji.", {
                description: (
                  <span className="text-red-500">
                    Sorry :(. This feature is under development.
                  </span>
                ),
                action: {
                  label: "Cancel",
                  onClick: () => console.log("Cancel"),
                },
              })
            }
            className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full"
          >
            <GoSmiley className="w-5 h-5 text-gray-600" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Emoji</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
