import Advertisement from "./components/Advertisement";
import Community from "./components/Community";
import Events from "./components/Events";
import FakeInputForm from "./components/FakeInputForm";
import HomeIcon from "./components/HomeIcon";
import MainLogo from "./components/MainLogo";
import MyFriends from "./components/MyFriends";

import NavProfile from "./components/NavProfile";
import Post from "./components/Post";
import RealInputForm from "./components/RealInputForm";
import Search from "./components/Search";
import SideMenu from "./components/SideMenu";
import SignInBtn from "./components/SignInBtn";
import TopMenu from "./components/TopMenu";
import Trending from "./components/Trending";

import useAuthStore from "./global/authStore";
import useDisplayForm from "./global/displayFormStore";

function App() {
  const { displayForm } = useDisplayForm();
  const { userName } = useAuthStore();
  return (
    <main>
      {displayForm && <RealInputForm />}
      <nav className="mainNav">
        <div className="navLeft">
          <HomeIcon />
          <TopMenu />
        </div>
        {userName == "" ? <SignInBtn /> : <NavProfile />}
      </nav>
      <aside className="leftSide">
        <MainLogo />
        <Search />
        <SideMenu />
        <hr className="fadedLine" />
        <Community />
        <Events />
      </aside>
      <div className="main">
        <FakeInputForm />

        <Post />
        <Post />
      </div>
      <aside className="rightSide">
        <Trending />
        <Advertisement />
        <MyFriends />
      </aside>
    </main>
  );
}

export default App;
