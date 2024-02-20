import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const useDeletePost = () => {
  const deletePost = async (id: string) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return { deletePost };
};

export default useDeletePost;
