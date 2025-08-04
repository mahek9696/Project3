import { Outlet } from "react-router-dom";

function AuthLayout(params) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        {/* Renders the matching child route of a parent route or nothing if no
        child route matches. */}
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
