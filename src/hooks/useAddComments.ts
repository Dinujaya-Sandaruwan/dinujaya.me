import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import useAuthStore from "../global/authStore";
import { useState } from "react";

interface Props {
  postId: string;
  comment: string;
  clearComment: () => void;
}

const useAddComments = ({ postId, comment, clearComment }: Props) => {
  const [commentLoading, setcommentLoading] = useState(false);
  const {
    userName: currentUserName,
    photoURL: CurrentUserPhotoURL,
    userId,
  } = useAuthStore();
  const addComment = async () => {
    setcommentLoading(true);
    try {
      const postDocRef = doc(db, "posts", postId);

      // Create a new comment object with the current user's data
      const newComment = {
        userName: currentUserName,
        userPhotoURL: CurrentUserPhotoURL,
        userId: userId,
        comment: comment,
      };

      // Update the Firestore document by adding the new comment to the 'comments' array
      await updateDoc(postDocRef, {
        comments: arrayUnion(newComment),
      });

      // Clear the comment input field after successfully adding the comment
    } catch (error) {
      console.log(error);
    }

    setcommentLoading(false);
    clearComment();
  };
  return { addComment, commentLoading };
};

export default useAddComments;
