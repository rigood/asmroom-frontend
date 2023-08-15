import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import MyProfile from "./pages/user/MyProfile";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <BrowserRouter>
      <Routes>
        {/* Hedader ⭕ */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route element={<PublicRoute isAllowed={!isLoggedIn} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute isAllowed={isLoggedIn} />}>
            <Route path="/myprofile" element={<MyProfile />} />
          </Route>
        </Route>

        {/* Hedader ❌ */}
        <Route element={<PublicRoute isAllowed={!isLoggedIn} />}>
          <Route path="/create-account" element={<CreateAccount />} />
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
