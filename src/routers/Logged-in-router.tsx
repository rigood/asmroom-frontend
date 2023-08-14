import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import CommonRouter from "./CommonRouter";

const LoggedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...CommonRouter],
  },
]);

export default LoggedInRouter;
