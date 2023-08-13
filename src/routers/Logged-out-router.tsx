import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import CommonRouter from "./CommonRouter";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";

const LoggedOutRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...CommonRouter,
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default LoggedOutRouter;
