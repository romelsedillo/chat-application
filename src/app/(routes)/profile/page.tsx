"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/images/profile-icon.jpg";
import { userData } from "@/utils/userData";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ProfilePage = () => {
  const [userdata, setUserdata] = useState(userData[0] || null);

  useEffect(() => {
    if (userData.length > 0) {
      setUserdata(userData[0]);
    }
  }, []);

  if (!userdata) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      {/* Avatar Section */}
      <Avatar className="h-32 w-32 shadow-md">
        <AvatarImage src={userdata.profile} />
        <AvatarFallback>
          <Image
            height={128}
            width={128}
            src={profileIcon}
            alt="profile"
            className="rounded-full"
          />
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="text-center mt-6">
        <h3 className="text-3xl font-bold text-gray-800">{userdata.name}</h3>
        <p className="text-xl text-gray-600 mt-2">{userdata.position}</p>
        <p className="text-sm text-gray-500 mt-1">{userdata.address}</p>
      </div>

      {/* Photos Section */}
      <div className="mt-8 w-full">
        <h6 className="text-left font-semibold text-lg mb-4 text-gray-800">
          Photos
        </h6>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {userdata.photos.map((src, index) => (
            <Image
              key={index}
              width={150}
              height={150}
              src={src}
              alt={`Photo ${index + 1}`}
              className="rounded object-cover shadow-sm hover:shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="w-full mt-4">
        <h6 className="text-left font-semibold text-lg mb-4 text-gray-800">
          Social
        </h6>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={userdata.social.facebook}
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50"
          >
            <FaFacebook className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700 text-sm font-medium">Facebook</span>
          </Link>
          <Link
            href={userdata.social.twitter}
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

export default ProfilePage;
