import { AiFillNotification } from "react-icons/ai";
import useGoogleAuth from "../hooks/useGoogleAuth";
import useInfoVideoStore from "../global/infoVideoStore";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

const SignInBtn = () => {
  const { signInWithGoogle } = useGoogleAuth();
  const { setVideoOpen } = useInfoVideoStore();

  return (
    <div className="mainNav__signInBtn">
      <div className="signInNotifications">
        <span className="notificationIcon" onClick={() => setVideoOpen(true)}>
          <MdOutlineSlowMotionVideo />
        </span>
        <span className="notificationIcon">
          <AiFillNotification />
        </span>
      </div>
      <button className="signInBtn" onClick={signInWithGoogle}>
        Sign in
      </button>
    </div>
  );
};

export default SignInBtn;
