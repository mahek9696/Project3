import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
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
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-montserrat text-slate-800 tracking-tight text-foreground">
          LOGIN TO YOUR ACCOUNT
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        <p className="mt-2">
          You haven't an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AuthLogin;
