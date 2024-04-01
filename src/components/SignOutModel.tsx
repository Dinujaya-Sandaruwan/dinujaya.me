import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import useAuthStore from "../global/authStore";

interface Props {
  isSignOutOpen: boolean;
  setIsSignOutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignOutModel = ({ isSignOutOpen, setIsSignOutOpen }: Props) => {
  const { userName } = useAuthStore();

  if (!isSignOutOpen) return null;

  return (
    <div className="signOutBackground">
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsSignOutOpen(false);
        }}
      >
        <div className="signOutModel">
          <h3>Do you realy want to sign out?</h3>
          <p>
            <strong>Hello {userName}</strong>, To fully engage with our platform
            by adding posts, liking content, and commenting, you'll need an
            account. Should you choose to sign out, these features won't be
            accessible until you sign back in. Remember, you're always welcome
            to rejoin our community by signing back into your account.
          </p>
          <div className="signOutButtions">
            <button
              onClick={() => {
                signOut(auth);
                setIsSignOutOpen(false);
                window.location.reload();
              }}
              className="signOutButton"
            >
              Sign Out
            </button>
            <button
              onClick={() => {
                setIsSignOutOpen(false);
              }}
              className="cancelButton"
            >
              Cancel
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SignOutModel;
