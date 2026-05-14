import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";

export const Backoffice: FC = () => {
  return (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </>
  );
};
