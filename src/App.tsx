import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { useMe } from "./hooks/useMe";
import { UserRole } from "./__generated__/graphql";
import ScrollToTop from "./utils/scrollToTop";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Loading from "./components/Loading";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import Episode from "./pages/Episode";
import ChannelsByCategory from "./pages/ChannelsByCategory";
import ReviewsContainer from "./pages/ReviewsContainer";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

import MyProfile from "./pages/user/MyProfile";

import MyEpisodes from "./pages/artist/MyEpisodes";
import EpisodeUpload from "./pages/artist/EpisodeUpload";
import MyChannelContainer from "./pages/artist/MyChannelContainer";
import MyReviews from "./pages/listener/MyReviews";

import NotFound from "./pages/NotFound";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: userData, loading, error } = useMe(!isLoggedIn);

  if (loading || error) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ⭕ Hedader */}
        <Route element={<Layout />}>
          {/* All */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/channels/:channelId" element={<Channel />} />
          <Route path="/episodes/:episodeId" element={<Episode />} />
          <Route path="/category" element={<ChannelsByCategory />} />
          <Route path="/reviews" element={<ReviewsContainer />} />

          {/* Public */}
          <Route element={<PublicRoute isAllowed={!isLoggedIn} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Private */}
          <Route element={<PrivateRoute isAllowed={isLoggedIn} />}>
            {/* User */}
            <Route path="/profile" element={<MyProfile />} />
            {/* Artist */}
            {userData?.me.role === UserRole.Artist && (
              <>
                <Route path="/channel/episodes" element={<MyEpisodes />} />
                <Route path="/channel/upload" element={<EpisodeUpload />} />
                <Route path="/channel/edit" element={<MyChannelContainer />} />
              </>
            )}
            {/* Listener */}
            {userData?.me.role === UserRole.Listener && (
              <Route path="/users/:userId/reviews" element={<MyReviews />} />
            )}
          </Route>
        </Route>

        {/* ❌ Hedader */}
        {/* Public */}
        <Route element={<PublicRoute isAllowed={!isLoggedIn} />}>
          <Route path="/create-account" element={<CreateAccount />} />
        </Route>

        {/* All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
