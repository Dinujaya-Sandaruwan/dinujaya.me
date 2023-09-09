import { useEffect, useRef, useState } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import useDisplayForm from "../global/displayFormStore";

import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import useDocId from "../hooks/useDocId";
import useAuthStore from "../global/authStore";
import useDate from "../hooks/useDate";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const RealInputForm = () => {
  const realForm = useRef<HTMLDivElement>(null);
  const { setDisplayForm } = useDisplayForm();
  const [feeling, setfeeling] = useState<string | null>("");
  const { userName, photoURL, userId } = useAuthStore();
  const addedDate = useDate();
  const [caption, setcaption] = useState("");

  const [loading, setloading] = useState(false);
  const postCollectionRef = collection(db, "posts");

  const docID = useDocId();

  const [imagesArray, setImagesArray] = useState<FileList | null>(null);

  const uploadPosts = async () => {
    const urls = [];
    if (imagesArray) {
      for (let i = 0; i < imagesArray.length; i++) {
        const uploadTask = ref(storage, `postImages/postImg_${v4()}`);
        const snapshot = await uploadBytes(uploadTask, imagesArray[i]);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }
    }
    return urls;
  };

  const onSubmitPost = async () => {
    setloading(true);

    try {
      const urls = await uploadPosts();

      const formatedUrls = urls.map((url) => {
        return { original: url };
      });

      const postData = {
        postId: docID,
        userName: userName,
        userPhotoURL: photoURL,
        userId: userId,
        date: addedDate,
        feeling: feeling,
        caption: caption,
        postPhotoURL: formatedUrls,
        likes: 0,
        comments: [],
      };

      const postDocRef = doc(postCollectionRef, docID);
      await setDoc(postDocRef, postData);

      // console.log("Post data successfully uploaded to Firestore");
      setDisplayForm(false);
    } catch (error) {
      console.error("Error uploading post data:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutside, true);
    return () => {
      document.removeEventListener("click", handleOutside, true);
    };
  }, []);

  const handleOutside = (e: any) => {
    if (!realForm.current?.contains(e.target)) {
      setDisplayForm(false);
    }
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent the click event from propagating up to the global listener
    e.stopPropagation();
  };

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;
    const value = target.textContent;
    setfeeling(value);
  };

  return (
    <div className="realInputForm">
      <div className="inputFormDiv" ref={realForm} onClick={handleFormClick}>
        <label>What's on your mind?</label>
        <textarea
          placeholder="Type here..."
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
        <label className="formFeelingLable">
          How are you feeling right now?
        </label>
        <div className="feelings">
          <span className="oneFeeling" onClick={handleClick}>
            😃
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😁
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😆
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😅
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😂
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            🙂
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😍
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            🤩
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😘
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😋
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            🤭
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            😶
          </span>
          <span className="oneFeeling" onClick={handleClick}>
            🤔
          </span>
        </div>

        {feeling && (
          <div className="oneFeelingSelected">You are in {feeling}</div>
        )}
        <div className="uploadImages">
          <BiSolidCloudUpload />
          <input
            type="file"
            className="uploadFiles"
            multiple
            onChange={(e) => e.target.files && setImagesArray(e.target.files)}
          />
          <p>Select images</p>
        </div>
        <div className="uploadedCount">
          {imagesArray && (
            <p onClick={() => setImagesArray(null)}>
              Remove {imagesArray?.length} selected images
            </p>
          )}
        </div>

        <button
          className="formSubmitBtn"
          onClick={onSubmitPost}
          disabled={loading}
        >
          {loading ? "Createing new post..." : " Create new post"}
        </button>
      </div>
    </div>
  );
};

export default RealInputForm;
