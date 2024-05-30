import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config";

const useDeletePost = () => {
  const deletePost = async (id: string, postPhotoURLs: string[]) => {
    try {
      // Delete all related images from Firebase Storage
      for (const url of postPhotoURLs) {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }

      // Delete the post document from Firestore
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);

      console.log("Post and related images deleted successfully");
    } catch (error) {
      console.error("Error deleting post and related images: ", error);
    }
  };

  return { deletePost };
};

export default useDeletePost;
