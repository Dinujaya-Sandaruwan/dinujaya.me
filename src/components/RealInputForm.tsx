import { BiSolidCloudUpload } from "react-icons/bi";

const RealInputForm = () => {
  return (
    <div className="realInputForm">
      <div className="inputFormDiv">
        <label>What's on your mind?</label>
        <textarea placeholder="Type here..." />
        <div className="uploadImages">
          <BiSolidCloudUpload />
          <p>Select images</p>
        </div>
        <div className="uploadedCount">
          <p>Remove 4 selected images</p>
        </div>

        <button className="formSubmitBtn">Create new post</button>
      </div>
    </div>
  );
};

export default RealInputForm;
