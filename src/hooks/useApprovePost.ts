import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

interface Props {
  postId: string;
}

const useApprovePost = ({ postId }: Props) => {
  const approvePost = async () => {
    try {
      const postDocRef = doc(db, "posts", postId);
      await updateDoc(postDocRef, { isApproved: true });
      console.log("Post approved successfully!");
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  return approvePost;
};

export default useApprovePost;
