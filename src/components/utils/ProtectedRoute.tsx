import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({
  canActivate,
  redirectPath = "/",
}: {
  canActivate: boolean;
  redirectPath?: string;
}) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
