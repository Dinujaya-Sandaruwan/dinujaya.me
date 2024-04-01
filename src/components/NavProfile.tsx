import { AiFillNotification } from "react-icons/ai";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

import useAuthStore from "../global/authStore";
import useInfoVideoStore from "../global/infoVideoStore";
import { toast } from "react-toastify";
import SignOutModel from "./SignOutModel";
import { useState } from "react";
// import avatar from "../assets/avatar.jpg";

const NavProfile = () => {
  const { userName, photoURL } = useAuthStore();
  const { setVideoOpen } = useInfoVideoStore();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  // const handleSignOut = () => {
  //   signOut(auth);
  //   setUserName("");
  //   window.location.reload();
  // };
  return (
    <div className="mainNav__rightSide">
      <span className="notificationIcon" onClick={() => setVideoOpen(true)}>
        <MdOutlineSlowMotionVideo />
      </span>
      <span
        className="notificationIcon"
        onClick={() => toast.info("Notification Menu is Comming soon 😁")}
      >
        <AiFillNotification />
      </span>
      <p className="name">{userName.split(" ")[0]}</p>
      <div className="userAvatarDiv">
        <img
          className="userAvatar"
          src={photoURL || ""}
          alt="User Avatar"
          onClick={() => setIsSignOutOpen(true)}
        />
        <SignOutModel
          isSignOutOpen={isSignOutOpen}
          setIsSignOutOpen={setIsSignOutOpen}
        />
      </div>
    </div>
  );
};

export default NavProfile;
