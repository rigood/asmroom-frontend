import { Navigate, Outlet, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  isAllowed: boolean;
}

const PrivateRoute = ({ isAllowed }: PrivateRouteProps) => {
  const location = useLocation();

  // 로그인 안한 사람, 현재 페이지 저장
  // 로그인 하고 현재 페이지로 다시 데려다 줌
  if (!isAllowed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
