import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import useGoogleAuth from "../hooks/useGoogleAuth";

const SignInBtn = () => {
  const { signInWithGoogle } = useGoogleAuth();

  return (
    <div className="mainNav__signInBtn">
      <div className="signInNotifications">
        <span className="notificationIcon">
          <AiFillMessage />
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
