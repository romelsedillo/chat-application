import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { IoCamera } from "react-icons/io5";
import { profilePictures } from "@/utils/profilePictures";
import { useState } from "react";
import { UpdateProfile } from "@/utils/UpdateProfile";

export function EditProfileDialog({ fetchUserData }) {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfilePicture = (src: string) => {
    setSelectedProfile(src); // Save the selected profile picture
  };
  const handleChangeProfile = () => {
    UpdateProfile(selectedProfile);
    fetchUserData();
  };
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <button className="absolute z-10 bottom-1 right-2 w-7 h-7 bg-slate-400 rounded-full flex items-center justify-center">
          <IoCamera className="text-white" />
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[600px] rounded">
        <DialogHeader>
          <DialogTitle>Choose Profile Picture</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* Profile Picture Grid */}
        <div className="grid grid-cols-8 gap-2 py-4">
          {profilePictures.map((profile, index) => (
            <div
              key={index}
              className={`w-16 h-16 cursor-pointer rounded overflow-hidden border-2 ${
                selectedProfile === profile.src
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleProfilePicture(profile.src)}
            >
              <Image
                src={profile.src}
                width={80}
                height={80}
                alt={profile.alt}
                className="rounded hover:opacity-80 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>

        {/* Dialog Footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => handleChangeProfile()}
              disabled={!selectedProfile}
              className="rounded"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
