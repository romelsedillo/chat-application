import RegisterForm from "@/components/layout/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-2 p-8">
      <div className=" col-span-1 text-6xl text-center font-semibold flex items-center justify-center">Chat Application</div>
      <div className="col-span-1 p-4">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
