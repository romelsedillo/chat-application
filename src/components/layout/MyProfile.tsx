"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/images/profile-icon.jpg";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const MyProfile = () => {
  const router = useRouter();
  const { loggedInUser } = useAuthStore();

  const { checkUserSession, isLoggedIn, loading } = useAuthStore();

  useEffect(() => {
    // Check the user session on component mount
    checkUserSession();
  }, [checkUserSession]);

  if (loading) {
    return <Loading />;
  }
  if (!isLoggedIn) {
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      {/* Avatar Section */}
      <div className="flex items-center gap-2">
        <Avatar className="h-28 w-28 shadow-md">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704a" />
          <AvatarFallback>
            <Image
              height={120}
              width={120}
              src={profileIcon}
              alt="profile"
              className="rounded-full"
            />
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="text-left">
          <h3 className="text-3xl font-bold text-gray-800">
            {loggedInUser?.name || "Guest"}
          </h3>
          <p className="text-xl text-gray-600">
            UI/UX Designer and Web Developer
          </p>
          <p className="text-sm text-gray-500">Dumaguete City Philippines</p>
        </div>
      </div>

      {/* Photos Section */}
      <div className="mt-4 w-full max-w-lg">
        <h6 className="text-left font-semibold text-lg mb-4 text-gray-800">
          Photos
        </h6>
        <div className="mx-auto max-w-[460px] grid grid-cols-4 gap-4">
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
          <Image
            height={100}
            width={100}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
            alt="profile"
            className="rounded"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="w-full max-w-lg mt-4">
        <h6 className="text-left font-semibold text-lg mb-4 text-gray-800">
          Social
        </h6>
        <div className="max-w-[460px] mx-auto flex flex-col sm:flex-row gap-4">
          <Link
            href="#"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50"
          >
            <FaFacebook className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700 text-sm font-medium">Facebook</span>
          </Link>
          <Link
            href="#"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50"
          >
            <FaXTwitter className="w-6 h-6 text-blue-500" />
            <span className="text-gray-700 text-sm font-medium">Twitter</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
