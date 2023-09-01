import HomeIcon from "./components/HomeIcon";

import NavProfile from "./components/NavProfile";
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
      <aside className="leftSide"></aside>
      <div className="main"></div>
      <aside className="rightSide"></aside>
    </main>
  );
}

export default App;
