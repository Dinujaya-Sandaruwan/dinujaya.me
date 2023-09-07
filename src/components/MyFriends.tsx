import { FiChevronDown } from "react-icons/fi";
import avatar from "../assets/avatar.jpg";

const MyFriends = () => {
  return (
    <div className="rightSide__myFriends">
      <div className="myFriendsNav">
        My Friends <FiChevronDown />
      </div>
      <div className="myFriendsList">
        <div className="friendsLeftSide">
          <img src="https://thispersondoesnotexist.com/" alt="" />
          <div>
            <h4>John Doe</h4>
            <p>Last active recently</p>
          </div>
        </div>
        <div className="friendsAlat">15</div>
      </div>

      <div className="myFriendsList">
        <div className="friendsLeftSide">
          <img src={avatar} alt="" />
          <div>
            <h4>John Doe</h4>
            <p>Last active recently</p>
          </div>
        </div>
        <div className="friendsAlat">15</div>
      </div>

      <div className="myFriendsList">
        <div className="friendsLeftSide">
          <img src={avatar} alt="" />
          <div>
            <h4>John Doe</h4>
            <p>Last active recently</p>
          </div>
        </div>
        <div className="friendsAlat">15</div>
      </div>

      <div className="myFriendsList">
        <div className="friendsLeftSide">
          <img src={avatar} alt="" />
          <div>
            <h4>John Doe</h4>
            <p>Last active recently</p>
          </div>
        </div>
        <div className="friendsAlat">15</div>
      </div>
    </div>
  );
};

export default MyFriends;
