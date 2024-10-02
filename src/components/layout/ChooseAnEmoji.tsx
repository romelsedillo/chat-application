import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiFaceSmile } from "react-icons/ci";

export function ChooseAnEmoji() {
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
                <CiFaceSmile />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose an emoji</p>
          </TooltipContent>
          <DropdownMenuContent className="w-56">
            <div className="grid grid-cols-4 gap-2">
              {["😀", "😄", "😂", "😍", "😎", "😊", "😉", "😭", "😡", "👍"].map(
                (emoji) => (
                  <button
                    key={emoji}
                    className="text-2xl hover:bg-gray-100 p-1 rounded-lg"
                  >
                    {emoji}
                  </button>
                )
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
}
