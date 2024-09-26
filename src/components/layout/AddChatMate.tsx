import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

export function AddChatMate() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-slate-200 w-8 h-8 flex items-center justify-center rounded">
          <PlusIcon />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded">
        <AlertDialogHeader>
          <AlertDialogTitle>Find new friends</AlertDialogTitle>
          <Input type="text" placeholder="Search" className="rounded" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
