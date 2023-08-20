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
import { useMe } from "./hooks/useMe";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: userData, loading, error } = useMe(!isLoggedIn);

  if (!userData || loading || error) {
    return (
      <Wrapper>
        <Loading icon={faSpinner} size="5x" spin />
      </Wrapper>
    );
  }

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
            {/* 🎤 Artist */}
            <Route path="/myprofile" element={<MyProfile />} />
            {/* 🎧 Listener */}
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

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled(FontAwesomeIcon)``;
