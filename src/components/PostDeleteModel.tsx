import React from "react";
import useDeletePost from "../hooks/useDeletePost";
import OutsideClickHandler from "react-outside-click-handler";

interface Props {
  isDeletePostModelOpen: boolean;
  setIsDeletePostModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}

const PostDeleteModel = ({ setIsDeletePostModelOpen, postId }: Props) => {
  const { deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost(postId)
      .then(() => {
        setIsDeletePostModelOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="postDeleteModelBackground">
      <OutsideClickHandler
        onOutsideClick={() => setIsDeletePostModelOpen(false)}
      >
        <div className="postDeleteModel">
          <h2>Are you sure you want to delete this post?</h2>
          <p>
            Once you delete this post, it will be gone forever. Please be
            cautious. Do you want to proceed?
          </p>
          <div className="postDeleteButtons">
            <button className="deleteButton" onClick={handleDeletePost}>
              Yes
            </button>
            <button
              className="cancelButton"
              onClick={() => setIsDeletePostModelOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default PostDeleteModel;
