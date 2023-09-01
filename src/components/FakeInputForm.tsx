import { PiCameraLight, PiImageLight } from "react-icons/pi";
import { GiPaperClip } from "react-icons/gi";
import { BsPencilSquare } from "react-icons/bs";
import { BiPen } from "react-icons/bi";
import { CiLocationOn, CiFaceSmile } from "react-icons/ci";
import avatar from "../assets/avatar.jpg";

const FakeInputForm = () => {
  return (
    <div className="main__fakeInputForm">
      <div className="topSide">
        <img src={avatar} alt="" className="avatar" />
        <input type="text" placeholder="What's on your mind?" />
      </div>
      <div className="bottumSide">
        <div className="icons">
          <PiCameraLight />
          <PiImageLight />
          <GiPaperClip />
          <CiLocationOn />
          <CiFaceSmile />
        </div>
        <div className="buttons">
          <button className="draft">
            <BsPencilSquare />
            <span>Draft</span>
          </button>
          <button className="post">Post</button>
        </div>
      </div>
    </div>
  );
};

export default FakeInputForm;
