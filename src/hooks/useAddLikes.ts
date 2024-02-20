import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import React from "react";
import { db } from "../firebase/config";
import useAuthStore from "../global/authStore";

interface Props {
  likeCount: number;
  postId: string;
}

const useAddLikes = ({ likeCount, postId }: Props) => {
  const [like, setLike] = React.useState(likeCount);
  const [liked, setLiked] = React.useState(false);
  const { userName, userId, photoURL } = useAuthStore();
  const [liking, setLiking] = React.useState(false);

  React.useEffect(() => {
    const checkLikedPost = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const likedPosts = docSnapshot.data()?.likedPosts || [];
          const isLiked = likedPosts.includes(postId);
          setLiked(isLiked);
        }
      } catch (error) {
        console.error("Error checking liked post:", error);
      }
    };

    checkLikedPost();
  }, [postId, userId]);

  const addLike = async () => {
    setLiking(true);
    setLiked((prev) => !prev);
    if (liked) {
      setLike((prev) => prev + -1);
    } else {
      setLike((prev) => prev + 1);
    }

    try {
      const postDocRef = doc(db, "posts", postId);
      const userDocRef = doc(db, "users", userId);

      // Check if the user document exists
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // Create user document if it doesn't exist
        await setDoc(userDocRef, {
          userId,
          userName,
          photoURL,
          likedPosts: [],
        });
      }

      // Check if the post is not in the likedPosts list
      const likedPosts = userDocSnapshot.data()?.likedPosts || [];
      if (!likedPosts.includes(postId)) {
        // Update post likes
        await updateDoc(postDocRef, { likes: like + 1 });

        // Update user's liked posts
        await updateDoc(userDocRef, {
          likedPosts: arrayUnion(postId),
        });

        // Use the functional form of setLike to ensure it's based on the latest state
        // setLike((prev) => prev + 1);
      } else {
        // Update post likes
        await updateDoc(postDocRef, { likes: like - 1 });

        // Update user's liked posts
        await updateDoc(userDocRef, {
          likedPosts: arrayRemove(postId),
        });

        // Use the functional form of setLike to ensure it's based on the latest state
        // setLike((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error updating like count:", error);
      // If an error occurs, revert the liked state to its previous value
      setLiked((prev) => !prev);
      setLike(likeCount);
    } finally {
      setLiking(false);
    }
  };
  return { addLike, like, liked, liking };
};

export default useAddLikes;
