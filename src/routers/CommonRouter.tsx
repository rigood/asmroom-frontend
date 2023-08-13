import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";

const CommonRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export default CommonRouter;
