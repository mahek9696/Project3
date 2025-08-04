import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

const initialState = {
  userName: "",
  email: "",
  phone: "",
  password: "",
};
function onSubmit() {}
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-montserrat text-slate-800 tracking-tight text-foreground">
          CREATE YOUR ACCOUNT
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Create account"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="text-center font-montserrat">
        <p className="mt-2">
          Already have an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AuthRegister;
