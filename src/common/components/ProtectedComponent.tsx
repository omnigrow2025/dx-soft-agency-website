import { Fragment, type FC, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedComponent: FC<PropsWithChildren> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Fragment>{children}</Fragment>;
};
