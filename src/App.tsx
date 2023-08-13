import { useReactiveVar } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import LoggedInRouter from "./routers/Logged-in-router";
import LoggedOutRouter from "./routers/Logged-out-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <RouterProvider router={isLoggedIn ? LoggedInRouter : LoggedOutRouter} />
  );
}

export default App;
