import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";
import useAuthStore from "../global/authStore";
import useDocId from "./useDocId";
import { Comments } from "../interfaces/postFaces";

interface Props {
  postId: string;
  comment: string;
  clearComment: () => void;
}

const useAddComments = ({ postId, comment, clearComment }: Props) => {
  const [commentLoading, setcommentLoading] = useState(false);
  const commentId = useDocId("comment");
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
        commentId: commentId,
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

  const deleteComment = async (postId: string, commentId: string) => {
    try {
      const postDocRef = doc(db, "posts", postId);

      // Retrieve the current post document
      const postDocSnap = await getDoc(postDocRef);
      if (postDocSnap.exists()) {
        const postData = postDocSnap.data();

        // Filter out the comment with the given commentId
        const updatedComments = postData.comments.filter(
          (comment: Comments) => comment.commentId !== commentId
        );

        // Update the Firestore document with the updated comments array
        await updateDoc(postDocRef, {
          comments: updatedComments,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { addComment, deleteComment, commentLoading };
};

export default useAddComments;
