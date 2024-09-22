import LoginForm from "@/components/layout/LoginForm";
import React from "react";
import Image from "next/image";
import chat from "@/images/chat.png";
const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 p-8">
      <div className=" col-span-1 text-4xl text-center">
        Chat Application
        <Image
          height={400}
          width={400}
          src={chat}
          alt="chat"
          className="mx-auto"
        />
      </div>
      <div className="col-span-1 p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
