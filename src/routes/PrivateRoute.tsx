import { Navigate, Outlet, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  isAllowed: boolean;
}

const PrivateRoute = ({ isAllowed }: PrivateRouteProps) => {
  const location = useLocation();

  // 로그인 하지 않은 사용자의 현재 페이지를 state에 저장
  // 로그인 후 해당 페이지로 이동
  if (!isAllowed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
