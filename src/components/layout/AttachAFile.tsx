import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoImageOutline } from "react-icons/io5";
import { useRef } from "react";


export function AttachAFile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = () => {
    // Trigger the file input click
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle the selected file here
      const file = files[0];
      console.log("Selected file:", file);
      // You can implement additional functionality here, like uploading the file
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full"
            onClick={handleFileSelect}
          >
            <IoImageOutline />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Attach a file</p>
        </TooltipContent>
      </Tooltip>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden" // Hide the input
      />
    </TooltipProvider>
  );
}
