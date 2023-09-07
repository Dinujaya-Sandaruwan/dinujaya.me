import { PiCameraLight, PiImageLight } from "react-icons/pi";
import { GiPaperClip } from "react-icons/gi";
import { BsPencilSquare } from "react-icons/bs";
import { CiLocationOn, CiFaceSmile } from "react-icons/ci";
import avatar from "../assets/avatar.jpg";
import useAuthStore from "../global/authStore";
import useDisplayForm from "../global/displayFormStore";
import useGoogleAuth from "../hooks/useGoogleAuth";

const FakeInputForm = () => {
  const { setDisplayForm } = useDisplayForm();
  const { photoURL } = useAuthStore();

  const { userId } = useAuthStore();
  const { signInWithGoogle } = useGoogleAuth();

  const openRealForm = () => {
    if (userId == "") {
      signInWithGoogle();
      return;
    }
    setDisplayForm(true);
  };
  return (
    <div className="main__fakeInputForm" onClick={openRealForm}>
      <div className="topSide">
        <img
          src={photoURL == "" ? avatar : photoURL}
          alt="user Avatar"
          className="avatar"
        />
        <input type="text" placeholder="What's on your mind?" />
      </div>
      <div className="bottumSide">
        <div className="icons">
          <PiCameraLight />
          <PiImageLight />
          <GiPaperClip />
          <CiLocationOn />
          <CiFaceSmile />
        </div>
        <div className="buttons">
          <button className="draft">
            <BsPencilSquare />
            <span>Draft</span>
          </button>
          <button className="post">Post</button>
        </div>
      </div>
    </div>
  );
};

export default FakeInputForm;
