import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import useAuthStore from "../global/authStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
// import avatar from "../assets/avatar.jpg";

const NavProfile = () => {
  const { userName, photoURL } = useAuthStore();
  const { setUserName } = useAuthStore();

  const handleSignOut = () => {
    signOut(auth);
    setUserName("");
    window.location.reload();
  };
  return (
    <div className="mainNav__rightSide">
      <span className="notificationIcon">
        <AiFillMessage />
      </span>
      <span className="notificationIcon">
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
