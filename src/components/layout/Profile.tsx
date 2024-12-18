import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/images/profile-icon.jpg";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";

export function Profile() {
  const { loggedInUser } = useAuthStore();
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <AvatarFallback>
          <Image height={400} width={400} src={profileIcon} alt="profile" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-left leading-tight">
          {loggedInUser?.name || "Guest"}
        </h3>
        <p className=" text-[9px] text-left leading-tight">
          UI/UX Designer & Web Developer
        </p>
      </div>
    </div>
  );
}
