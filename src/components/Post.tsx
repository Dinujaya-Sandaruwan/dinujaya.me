import { useRef, useState } from "react";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";

import { BsBookmarkCheck, BsClock, BsThreeDotsVertical } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { PiShareDuotone } from "react-icons/pi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import { Posts } from "../interfaces/postFaces";
import useDeletePost from "../hooks/useDeletePost";

import useAuthStore from "../global/authStore";
import useAddComments from "../hooks/useAddComments";
import useAddLikes from "../hooks/useAddLikes";

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
  comments,
}: Posts) => {
  const { deletePost } = useDeletePost();
  const { userId: currentUserId, photoURL: currentPhotoURL } = useAuthStore();

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

  const submitComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleComment();
    }
  };

  const [showMoreComments, setShowMoreComments] = useState(false);

  const toggleShowMoreComments = () => {
    if (comments.length <= 3) {
      return;
    }
    setShowMoreComments((prev: boolean) => !prev);
  };

  // Likes
  const { like, addLike, liked } = useAddLikes({
    likeCount: likes,
    postId: postId,
  });

  // caption
  const slisedCaption = caption.slice(0, 300);
  const [displaySeeMore, setDisplaySeeMore] = useState(true);

  const captionRef = useRef<HTMLDivElement>(null);
  const showFullCaption = () => {
    if (captionRef.current) {
      captionRef.current.innerHTML = caption;
      setDisplaySeeMore(false);
    }
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
      <div
        className="postCaption"
        dangerouslySetInnerHTML={{ __html: slisedCaption }}
        ref={captionRef}
      />
      {caption.length > 300 && displaySeeMore && (
        <span className="read-more" onClick={showFullCaption}>
          ...see more
        </span>
      )}
      <div className="postImages">
        <ImageGallery
          items={postPhotoURL}
          showThumbnails={false}
          autoPlay={true}
        />
      </div>
      <div className="postButtons">
        <div
          className="like"
          onClick={addLike}
          style={liked ? { color: "var(--logoBlue)" } : {}}
        >
          <AiFillLike />
          <span>Like</span>
          <span className="pstAlat">{like}</span>
        </div>
        <div className="comment">
          <AiOutlineComment />
          <label htmlFor="postComments">comment</label>

          <span className="pstAlat">{comments.length}</span>
        </div>
        <div className="share" onClick={() => toast("Comming soon 😁")}>
          <PiShareDuotone />
          <span>Share</span>
          <span className="pstAlat">12</span>
        </div>
      </div>
      <hr className="postDevider" />
      <div className="postCommentInput">
        <img src={currentPhotoURL} alt="" />
        <div className="inputBox">
          <input
            type="text"
            id="postComments"
            placeholder="Write a comment..."
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
            onKeyDown={submitComment}
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
          <div className="commentsNavLeft" onClick={toggleShowMoreComments}>
            {showMoreComments ? "Show less comments" : "Show more comments"}
            {showMoreComments ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          <div className="commentsNavright">
            <span className="gray">Sort by</span>
            <span className="white">Most popular</span>
          </div>
        </div>
        {showMoreComments
          ? [...comments].reverse().map((comment, index) => (
              <div className="allComents" key={index}>
                <img
                  src={comment.userPhotoURL}
                  alt=""
                  className="commentAvatar"
                />
                <p>
                  <span className="userName">{comment.userName}:</span> &nbsp;
                  {comment.comment}
                </p>
              </div>
            ))
          : [...comments]
              .slice(-3)
              .reverse()
              .map((comment, index) => (
                <div className="allComents" key={index}>
                  <img
                    src={comment.userPhotoURL}
                    alt=""
                    className="commentAvatar"
                  />
                  <p>
                    <span className="userName">{comment.userName}:</span> &nbsp;
                    {comment.comment}
                  </p>
                </div>
              ))}
      </div>
    </div>
  );
};

export default Post;
