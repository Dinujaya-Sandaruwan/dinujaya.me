import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import avatar from "../assets/avatar.jpg";
import { BsBookmarkCheck, BsClock, BsThreeDotsVertical } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { PiShareDuotone } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Posts } from "../interfaces/postFaces";
import useDeletePost from "../hooks/useDeletePost";

import useAuthStore from "../global/authStore";
import { useState } from "react";
import useAddComments from "../hooks/useAddComments";

const Post = ({
  userName,
  userPhotoURL,
  date,
  feeling,
  caption,
  postPhotoURL,
  likes,
  postId,
  userId: postUserId,
}: Posts) => {
  const { deletePost } = useDeletePost();
  const { userId: currentUserId } = useAuthStore();

  const [comment, setcomment] = useState("");

  const clearComment = () => {
    setcomment("");
  };

  const { addComment, commentLoading } = useAddComments({
    postId,
    comment,
    clearComment,
  });

  const handleComment = () => {
    if (comment == "") {
      return;
    }
    addComment();
  };

  return (
    <div className="main__post">
      <div className="postAccount">
        <div className="mainRight">
          <img src={userPhotoURL} alt="" />
          <div className="name">
            <h3>{userName}</h3>
            <p className="tagLine">
              <span className="time">
                <BsClock />
                {date}
              </span>
              <span className="vanue">Feeling {feeling}</span>
            </p>
          </div>
        </div>
        <div className="mainLeft">
          <BsBookmarkCheck className="postBookMark" />
          {postUserId == currentUserId ? (
            <AiOutlineClose
              onClick={() => deletePost(postId)}
              className="postDelete"
            />
          ) : (
            <BsThreeDotsVertical />
          )}
        </div>
      </div>
      <div className="postCaption">{caption}</div>

      <div className="postImages">
        <ImageGallery
          items={postPhotoURL}
          showThumbnails={false}
          autoPlay={true}
        />
      </div>

      <div className="postButtons">
        <div className="like">
          <AiFillLike />
          <span>Like</span>
          <span className="pstAlat">{likes}</span>
        </div>
        <div className="comment">
          <AiOutlineComment />
          <label>comment</label>

          <span className="pstAlat">12</span>
        </div>
        <div className="share">
          <PiShareDuotone />
          <span>Share</span>
          <span className="pstAlat">12</span>
        </div>
      </div>
      <hr className="postDevider" />
      <div className="postCommentInput">
        <img src={avatar} alt="" />
        <div className="inputBox">
          <input
            type="text"
            id="postComments"
            placeholder="Write a comment..."
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
          />
          <button
            className="submitComment"
            onClick={handleComment}
            disabled={commentLoading}
          >
            {commentLoading ? "Commenting..." : "Comment"}
          </button>
        </div>
      </div>

      <div className="postComments">
        <div className="commentsNav">
          <div className="commentsNavLeft">
            All comments
            <FaChevronDown />
          </div>
          <div className="commentsNavright">
            <span className="gray">Sort by</span>
            <span className="white">Most popular</span>
          </div>
        </div>
        <div className="allComents">
          <img src={avatar} alt="" className="commentAvatar" />
          <p>
            <span className="userName">Dinujaya Sandaruwan:</span> &nbsp;A
            preloader, also known, as a loading page, or preloading screen it's
            the loading animation or static image that shows on your screen
            while the main app is loading in the background
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
