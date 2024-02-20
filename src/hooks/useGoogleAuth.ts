import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { auth, googleProvider } from "../firebase/config";
import useAuthStore from "../global/authStore";

const useGoogleAuth = () => {
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

  return { signInWithGoogle };
};

export default useGoogleAuth;
