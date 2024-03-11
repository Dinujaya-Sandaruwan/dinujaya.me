import { AiFillNotification } from "react-icons/ai";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

import useAuthStore from "../global/authStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import useInfoVideoStore from "../global/infoVideoStore";
import { toast } from "react-toastify";
// import avatar from "../assets/avatar.jpg";

const NavProfile = () => {
  const { userName, photoURL } = useAuthStore();
  const { setUserName } = useAuthStore();
  const { setVideoOpen } = useInfoVideoStore();

  const handleSignOut = () => {
    signOut(auth);
    setUserName("");
    window.location.reload();
  };
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
      <div className="userAvatarDiv" onClick={handleSignOut}>
        <img className="userAvatar" src={photoURL || ""} alt="User Avatar" />
      </div>
    </div>
  );
};

export default NavProfile;
