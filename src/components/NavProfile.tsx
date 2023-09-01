import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import avatar from "../assets/avatar.jpg";

const NavProfile = () => {
  return (
    <div className="mainNav__rightSide">
      <span className="notificationIcon">
        <AiFillMessage />
      </span>
      <span className="notificationIcon">
        <AiFillNotification />
      </span>
      <p className="name">Dinujaya S</p>
      <div className="userAvatarDiv">
        <img className="userAvatar" src={avatar} alt="User Avatar" />
      </div>
    </div>
  );
};

export default NavProfile;
