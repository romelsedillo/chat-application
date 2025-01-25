import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/images/profile-icon.jpg";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuthStore } from "@/stores/useAuthStore";
import { EditProfileDialog } from "./EdtiProfileModal";
import { signedInUser } from "@/utils/SignedInUser";
import { useState, useEffect } from "react";

const MyProfile2 = () => {
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

  const user = currentUser[0];

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="col-span-3 mx-auto max-w-2xl flex flex-col items-center p-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="h-36 w-36 shadow-md border-4 border-green-400">
            <AvatarImage src={user?.profileUrl} />
            <AvatarFallback>
              <Image
                height={170}
                width={170}
                src={profileIcon}
                alt="profile"
                className="rounded-full"
              />
            </AvatarFallback>
          </Avatar>
          <EditProfileDialog fetchUserData={fetchUserData} />
        </div>

        {/* User Info */}
        <div className="text-left">
          <h3 className="text-3xl font-bold text-gray-800 capitalize">
            {loggedInUser?.name || "Guest"}
          </h3>
          <p className="text-xl text-gray-600">
            UI/UX Designer and Web Developer
          </p>
        </div>
      </div>

      <div className="mt-4 w-full max-w-lg">
        <h6 className="text-left font-semibold text-lg mb-2 text-gray-800">
          Basic info
        </h6>
        <div className="pl-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-slate-700">Gender:</span> Male
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-slate-700">Address:</span>{" "}
            Dumaguete City Philippines
          </p>
        </div>
      </div>
      {/* Photos Section */}
      <div className="mt-4 w-full max-w-lg">
        <h6 className="text-left font-semibold text-lg mb-2 text-gray-800">
          Photos
        </h6>
        <div className="mx-auto max-w-[460px] grid grid-cols-4 gap-4 pl-4">
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a012581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e21026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a041581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042511f4e29126704a"
            alt="profile"
            className="rounded"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="w-full max-w-lg mt-4">
        <h6 className="text-left font-semibold text-lg mb-2 text-gray-800">
          Social
        </h6>
        <div className="max-w-[460px] mx-auto flex flex-col sm:flex-row gap-4">
          <FaFacebook className="w-6 h-6 text-slate-800" />
          <FaXTwitter className="w-6 h-6 text-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default MyProfile2;
