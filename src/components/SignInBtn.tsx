import { AiFillMessage, AiFillNotification } from "react-icons/ai";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

import useAuthStore from "../global/authStore";
import { useEffect } from "react";

const SignInBtn = () => {
  const { setUserName, setPhotoURL, setUserId } = useAuthStore();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
    document.cookie = `user=${auth.currentUser?.displayName}`;

    if (auth.currentUser?.photoURL) {
      setPhotoURL(auth.currentUser?.photoURL);
    }
    if (auth.currentUser?.displayName) {
      setUserName(auth.currentUser?.displayName);
    }
    if (auth.currentUser?.uid) {
      setUserId(auth.currentUser?.uid);
    }
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser?.displayName) {
        setUserName(currentUser?.displayName);
      }
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser?.photoURL);
      }

      if (currentUser?.uid) {
        setUserId(currentUser?.uid);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

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
