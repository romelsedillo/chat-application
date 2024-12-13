"use client";
import LoginForm from "./LoginForm";
import React from "react";
import Image from "next/image";
import chat from "@/images/chat.png";

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-2 p-8">
      <div className=" col-span-1 text-4xl text-center">
        <h1 className="text-5xl text-center font-semibold mt-10">Chat Application</h1>
        <Image
          height={400}
          width={400}
          src={chat}
          alt="chat"
          className="mx-auto"
        />
      </div>
      <div className="col-span-1 mt-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
