import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  isAllowed: boolean;
}

const PublicRoute = ({ isAllowed }: PublicRouteProps) => {
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
