import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Advertisement from "./components/Advertisement";
import Community from "./components/Community";
import Events from "./components/Events";
import FakeInputForm from "./components/FakeInputForm";
import HomeIcon from "./components/HomeIcon";
import MainLogo from "./components/MainLogo";
import MyFriends from "./components/Mentors";

import NavProfile from "./components/NavProfile";
import Post from "./components/Post";
import RealInputForm from "./components/RealInputForm";
import Search from "./components/Search";
import SideMenu from "./components/SideMenu";
import SignInBtn from "./components/SignInBtn";
import TopMenu from "./components/TopMenu";
import Trending from "./components/Trending";
import { db } from "./firebase/config";

import useAuthStore from "./global/authStore";
import useDisplayForm from "./global/displayFormStore";
import { Posts } from "./interfaces/postFaces";

import { slide as Menu } from "react-burger-menu";

// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { displayForm } = useDisplayForm();
  const { userName, userId } = useAuthStore();

  const [posts, setposts] = useState([] as Posts[]);
  const postCollectionRef = collection(db, "posts");

  const isAdmin = userId == import.meta.env.VITE_USER_ID;

  useEffect(() => {
    const unsubscribe = onSnapshot(postCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        postId: doc.id,
        userName: doc.data().userName,
        userPhotoURL: doc.data().userPhotoURL,
        userId: doc.data().userId,
        date: doc.data().date,
        feeling: doc.data().feeling,
        caption: doc.data().caption,
        postPhotoURL: doc.data().postPhotoURL,
        likes: doc.data().likes,
        comments: doc.data().comments,
        isApproved: doc.data().isApproved,
      }));
      setposts(data);
    });
    return () => unsubscribe();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  // const showSettings = (event) => {
  //   event.preventDefault();
  //   // Your logic here
  // };

  return (
    <main>
      <Menu isOpen={isOpen} onStateChange={(state) => setIsOpen(state.isOpen)}>
        <span className="mobileMenu">
          <MainLogo />
          <Search />
          <SideMenu />
        </span>
        {/* <hr className="fadedLine" />
        <Community />
        <Events /> */}
      </Menu>
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
        {/* <Skeleton count={1} /> */}

        {isAdmin &&
          [...posts]
            .reverse()
            .map((post, index) => <Post key={index} {...post} />)}

        {isAdmin ||
          [...posts]
            .filter((post) => post.userId == userId && post.isApproved == false)
            .reverse()
            .map((post, index) => <Post key={index} {...post} />)}
        {isAdmin ||
          [...posts]
            .filter((post) => post.isApproved == true)
            .reverse()
            .map((post, index) => <Post key={index} {...post} />)}
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
