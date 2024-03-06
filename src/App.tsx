import {
  collection,
  onSnapshot,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const { displayForm } = useDisplayForm();
  const { userName, userId } = useAuthStore();

  const [posts, setPosts] = useState<Posts[]>([]);
  const postCollectionRef = collection(db, "posts");
  const [lastPost, setLastPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showLoadButton, setShowLoadButton] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const isAdmin = userId === import.meta.env.VITE_USER_ID;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        postCollectionRef,
        orderBy("date", "desc"),
        // Limit the initial posts to 5
        limit(5)
      ),
      (snapshot) => {
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
        setPosts(data);
        // Set the last post
        if (snapshot.docs.length > 0) {
          setLastPost(snapshot.docs[snapshot.docs.length - 1]);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading || !hasMore) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Fetch more posts when intersection is observed
        fetchMorePosts();
      }
    }, options);

    if (observer.current) {
      observer.current.observe(document.querySelector("#observer") as Element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  const fetchMorePosts = async () => {
    if (lastPost) {
      setLoading(true);
      const snapshot = await getDocs(
        query(
          postCollectionRef,
          orderBy("date", "desc"),
          startAfter(lastPost),
          limit(5)
        )
      );
      const newData = snapshot.docs.map((doc) => ({
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
      setPosts((prevPosts) => [...prevPosts, ...newData]);
      if (snapshot.docs.length > 0) {
        setLastPost(snapshot.docs[snapshot.docs.length - 1]);
      } else {
        setHasMore(false);
        setShowLoadButton(false); // Hide the load more button when no more posts
      }
      setLoading(false);
    }
  };

  const handleLoadMorePosts = () => {
    fetchMorePosts();
  };

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
      </Menu>

      {displayForm && <RealInputForm />}
      <nav className="mainNav">
        <div className="navLeft">
          <HomeIcon />
          <TopMenu />
        </div>
        {userName === "" ? <SignInBtn /> : <NavProfile />}
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
        {isAdmin && posts.map((post, index) => <Post key={index} {...post} />)}
        {!isAdmin &&
          posts
            .filter(
              (post) => post.userId === userId && post.isApproved === false
            )
            .map((post, index) => <Post key={index} {...post} />)}
        <InfiniteScroll
          dataLength={posts.filter((post) => post.isApproved === true).length} //This is important field to render the next data
          next={handleLoadMorePosts}
          hasMore={true}
          loader={showLoadButton ? <h4>Loading...</h4> : <h4></h4>}
          // below props only if you need pull down functionality
          refreshFunction={handleLoadMorePosts}
          pullDownToRefresh
          pullDownToRefreshThreshold={5}
        >
          {!isAdmin &&
            posts
              .filter((post) => post.isApproved === true)
              .map((post, index) => <Post key={index} {...post} />)}
        </InfiniteScroll>
      </div>
      <aside className="rightSide">
        <Trending />
        <Advertisement />
        <MyFriends />
      </aside>
      {/* Intersection observer target */}
      <div id="observer" />
    </main>
  );
}

export default App;
