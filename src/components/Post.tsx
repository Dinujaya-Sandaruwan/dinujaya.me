import { useCallback, useRef, useState } from "react";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";

import { BsBookmarkCheck, BsClock, BsThreeDotsVertical } from "react-icons/bs";
import { PiShareDuotone } from "react-icons/pi";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import ImageViewer from "react-simple-image-viewer";

import { Posts } from "../interfaces/postFaces";
import useDeletePost from "../hooks/useDeletePost";

import useAuthStore from "../global/authStore";
import useHandleComments from "../hooks/useHandleComments";
import useAddLikes from "../hooks/useAddLikes";
import useApprovePost from "../hooks/useApprovePost";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import ContentLoader from "react-content-loader";

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
  isApproved,
}: Posts) => {
  const { deletePost } = useDeletePost();
  const { userId: currentUserId, photoURL: currentPhotoURL } = useAuthStore();
  const isAdmin = currentUserId == import.meta.env.VITE_USER_ID;

  const [comment, setcomment] = useState("");

  const AdminUserId = import.meta.env.VITE_USER_ID;

  const clearComment = () => {
    setcomment("");
  };

  const { addComment, commentLoading, deleteComment } = useHandleComments({
    postId,
    comment,
    clearComment,
  });

  const handleComment = () => {
    if (comment == "") {
      return;
    }
    if (currentUserId == "") {
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
  const { like, addLike, liked, liking } = useAddLikes({
    likeCount: likes,
    postId: postId,
  });
  const handleLike = () => {
    if (currentUserId == "") {
      return;
    }
    addLike();
  };

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

  // Image Viewer

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // Approve Post

  const approvePost = useApprovePost({ postId });
  const [isApproving, setIsApproving] = useState(false);
  const handleApprovePost = async () => {
    setIsApproving(true);
    try {
      await approvePost();
    } catch (error) {
      console.error("Error approving post:", error);
    } finally {
      setIsApproving(false);
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
          {isApproved || <span className="notApproved">(Not Approved)</span>}
          {currentUserId == AdminUserId && !isApproved ? (
            <FaCheck
              onClick={handleApprovePost}
              disabled={isApproving}
              className="postApprove"
            />
          ) : (
            ""
          )}
          <BsBookmarkCheck className="postBookMark" />
          {postUserId == currentUserId || currentUserId == AdminUserId ? (
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
        {postPhotoURL[0] ? (
          <img
            src={postPhotoURL[0]}
            onClick={() => openImageViewer(0)}
            width="100%"
          />
        ) : (
          <ContentLoader
            speed={2}
            height={0}
            viewBox="0 0 200 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="200" />
          </ContentLoader>
        )}

        {postPhotoURL.length > 1 && (
          <span className="imageLength">
            {postPhotoURL.length} <FaImages />
          </span>
        )}

        {isViewerOpen && (
          <div className="imageViewer">
            <ImageViewer
              src={postPhotoURL}
              currentIndex={currentImage}
              disableScroll={true}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          </div>
        )}
      </div>

      <div className="postButtons">
        <button
          className="like"
          onClick={handleLike}
          disabled={liking}
          style={liked ? { color: "var(--logoBlue)" } : {}}
        >
          <AiFillLike />
          <span>Like</span>
          <span className="pstAlat">{like}</span>
        </button>
        <button className="comment">
          <AiOutlineComment />
          <label htmlFor={`postComments${postId}`}>comment</label>

          <span className="pstAlat">{comments?.length}</span>
        </button>
        <button className="share" onClick={() => toast.info("Comming soon 😁")}>
          <PiShareDuotone />
          <span>Share</span>
          <span className="pstAlat">0</span>
        </button>
      </div>
      <hr className="postDevider" />
      <div className="postCommentInput">
        <img src={currentPhotoURL} alt="" />
        <div className="inputBox">
          <input
            type="text"
            id={`postComments${postId}`}
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
                  <span className="comment">{comment.comment}</span>
                </p>
                {currentUserId == comment.userId && isAdmin ? (
                  <span className="menuIcon">
                    <Menu
                      menuButton={
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                      }
                      menuClassName="commentMenu"
                    >
                      <MenuItem
                        className="commentMenuItem"
                        onClick={() => toast("Comming soon 😁")}
                      >
                        Reply
                      </MenuItem>
                      <MenuItem
                        className="commentMenuItem"
                        onClick={() => deleteComment(postId, comment.commentId)}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </span>
                ) : (
                  <span className="menuIcon"></span>
                )}
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

                  {currentUserId == comment.userId && isAdmin ? (
                    <span className="menuIcon">
                      <Menu
                        menuButton={
                          <MenuButton>
                            <BsThreeDotsVertical />
                          </MenuButton>
                        }
                        menuClassName="commentMenu"
                      >
                        <MenuItem
                          className="commentMenuItem"
                          onClick={() => toast("Comming soon 😁")}
                        >
                          Reply
                        </MenuItem>
                        <MenuItem
                          className="commentMenuItem"
                          onClick={() =>
                            deleteComment(postId, comment.commentId)
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </span>
                  ) : (
                    <span className="menuIcon"></span>
                  )}
                </div>
              ))}
      </div>
    </div>
  );
};

export default Post;
