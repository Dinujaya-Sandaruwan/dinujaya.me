import Community from "./components/Community";
import Events from "./components/Events";
import HomeIcon from "./components/HomeIcon";
import MainLogo from "./components/MainLogo";

import NavProfile from "./components/NavProfile";
import Search from "./components/Search";
import SideMenu from "./components/SideMenu";
// import SignInBtn from "./components/SignInBtn";
import TopMenu from "./components/TopMenu";

function App() {
  return (
    <main>
      <nav className="mainNav">
        <div className="navLeft">
          <HomeIcon />
          <TopMenu />
        </div>
        <NavProfile />
      </nav>
      <aside className="leftSide">
        <MainLogo />
        <Search />
        <SideMenu />
        <hr className="fadedLine" />
        <Community />
        <Events />
      </aside>
      <div className="main"></div>
      <aside className="rightSide"></aside>
    </main>
  );
}

export default App;
