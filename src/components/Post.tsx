import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import avatar from "../assets/avatar.jpg";
import { BsBookmarkCheck, BsClock, BsThreeDotsVertical } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { PiShareDuotone } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";

const Post = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
    },
  ];
  return (
    <div className="main__post">
      <div className="postAccount">
        <div className="mainRight">
          <img src={avatar} alt="" />
          <div className="name">
            <h3>Dinujaya Sandaruwan</h3>
            <p className="tagLine">
              <span className="time">
                <BsClock />
                2022/10/05
              </span>
              <span className="vanue">MERN Developers</span>
            </p>
          </div>
        </div>
        <div className="mainLeft">
          <BsBookmarkCheck />
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className="postCaption">
        What is the reson guys yesterday I uploaded same kind of content the
        approved it but today they rejected it I tried to upload they sey we no
        longer accept this type of content
      </div>

      <div className="postImages">
        <ImageGallery items={images} showThumbnails={false} autoPlay={true} />
      </div>

      <div className="postButtons">
        <div className="like">
          <AiFillLike />
          <span>Like</span>
          <span className="pstAlat">12</span>
        </div>
        <div className="comment">
          <AiOutlineComment />
          <label htmlFor="postComments">Comment</label>

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
          />
          <button className="submitComment">Comment</button>
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
