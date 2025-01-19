import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { IoImageOutline } from "react-icons/io5";
export function UploadFile() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() =>
              toast.error("Upload a file.", {
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
            <IoImageOutline className="w-5 h-5 text-gray-600" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upload file</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
