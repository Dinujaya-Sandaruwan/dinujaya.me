import avatar from "../assets/community.jpg";

const Community = () => {
  return (
    <div className="leftSide__community">
      <div className="communityNav">
        <p>My community</p>
        <span className="communityAlat">29</span>
      </div>
      <div className="communityItem">
        <img src={avatar} alt="" />
        <div className="text">
          <h3>Sri Lankan REACT Devel...</h3>
          <p>153k members</p>
        </div>
      </div>
      <div className="communityItem">
        <img src={avatar} alt="" />
        <div className="text">
          <h3>Sri Lankan MERN Develo...</h3>
          <p>569k members</p>
        </div>
      </div>
      <div className="communityItem">
        <img src={avatar} alt="" />
        <div className="text">
          <h3>Sri Lankan Web Develo...</h3>
          <p>748k members</p>
        </div>
      </div>
      <div className="communityItem">
        <img src={avatar} alt="" />
        <div className="text">
          <h3>Sri Lankan Flutter Devel...</h3>
          <p>658k members</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
