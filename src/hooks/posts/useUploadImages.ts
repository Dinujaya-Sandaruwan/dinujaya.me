import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import compressImage from "./useCompresImage";

const uploadImages = async (imagesArray: FileList | null) => {
  if (imagesArray === null) {
    return null;
  }

  const urls: string[] = [];
  if (imagesArray) {
    for (let i = 0; i < imagesArray.length; i++) {
      // Use Compressor.js to compress the image before uploading
      const compressedImage = await compressImage(imagesArray[i]);

      const uploadTask = ref(storage, `postImages/postImg_${v4()}`);
      const snapshot = await uploadBytes(uploadTask, compressedImage);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }
  }
  return urls;
};

export default uploadImages;
