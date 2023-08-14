import { RouteObject, Navigate } from "react-router-dom";
import Home from "../pages/Home";

const CommonRouter: RouteObject[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default CommonRouter;
