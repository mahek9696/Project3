import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h screen w-full">
      {/* admin sidebar */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        {/* main content area */}
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
