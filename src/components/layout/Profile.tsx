import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/images/profile-icon.jpg";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { CiLogout } from "react-icons/ci";
import { account } from "@/appwrite/appwrite";
import { signedInUser } from "@/utils/SignedInUser";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Profile({ onChatMateClick }) {
  const [currentUser, setCurrentUser] = useState([]);
  const { loggedInUser } = useAuthStore();

  const fetchUserData = async () => {
    try {
      const appWriteData = await signedInUser();
      setCurrentUser(appWriteData);
    } catch (error) {
      console.error("Error fetching data from users table:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const user = currentUser[0];
  const handleProfileClick = () => {
    onChatMateClick(null); // Pass `null` to clear the selected chat
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      window.location.reload(); // Reload the page
    } catch (error: any) {
      console.log(error.message);
    }
    console.log("Logout clicked");
  };

  return (
    <div className="w-full flex items-center gap-2">
      {/* Avatar Section */}
      <Avatar className="h-12 w-12 cursor-pointer" onClick={handleProfileClick}>
        <AvatarImage src={user?.profileUrl} />
        <AvatarFallback>
          <Image height={400} width={400} src={profileIcon} alt="Profile" />
        </AvatarFallback>
      </Avatar>

      {/* User Info Section */}
      <div className="w-full flex flex-col">
        <h3 className="text-sm font-semibold text-left leading-tight">
          {loggedInUser?.name || "Guest"}
        </h3>
        <p className="text-[9px] text-left leading-tight text-gray-600">
          UI/UX Designer & Web Developer
        </p>
      </div>

      {/* Logout Icon */}
      <div className="flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <CiLogout
                  className="text-2xl font-semibold cursor-pointer text-gray-700 hover:text-red-500"
                  onClick={handleLogout}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
