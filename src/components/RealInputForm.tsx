import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { db } from "../firebase/config";
import useAuthStore from "../global/authStore";
import useDisplayForm from "../global/displayFormStore";
import useDate from "../hooks/useDate";
import useDocId from "../hooks/useDocId";

import uploadImages from "../hooks/posts/useUploadImages";
import formatCaption from "../hooks/posts/useFormatCaption";

const RealInputForm = () => {
  const realForm = useRef<HTMLDivElement>(null);
  const { setDisplayForm } = useDisplayForm();
  const [feeling, setfeeling] = useState<string | null>("");
  const { userName, photoURL, userId } = useAuthStore();
  const addedDate = useDate();
  const [caption, setcaption] = useState("");
  const [loading, setloading] = useState(false);
  const postCollectionRef = collection(db, "posts");

  const docID = useDocId("post");

  const [imagesArray, setImagesArray] = useState<FileList | null>(null);

  const onSubmitPost = async () => {
    setloading(true);

    try {
      const formattedCaption = await formatCaption(caption);
      const urls = await uploadImages(imagesArray);

      const postData = {
        postId: docID,
        userName: userName,
        userPhotoURL: photoURL,
        userId: userId,
        date: addedDate,
        feeling: feeling,
        caption: formattedCaption,
        postPhotoURL: urls,
        likes: 0,
        comments: [],
        isApproved: false,
      };

      const postDocRef = doc(postCollectionRef, docID);
      await setDoc(postDocRef, postData);

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
  }); // Remove the dependency array

  const handleOutside = (e: MouseEvent) => {
    if (!realForm.current?.contains(e.target as Node)) {
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

  // Focus textarea on click
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    // Focus the textarea when the component is mounted
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="realInputForm">
      <div className="inputFormDiv" ref={realForm} onClick={handleFormClick}>
        <label>What's on your mind?</label>
        <textarea
          placeholder="Type here..."
          value={caption}
          ref={textareaRef}
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
          {loading ? "Creating new post..." : " Create new post"}
        </button>
      </div>
    </div>
  );
};

export default RealInputForm;
