import { FiChevronDown } from "react-icons/fi";
import friendsData from "../json/mentores.json";

interface Mentores {
  name: string;
  state: string;
  image: string;
  subscribers: string;
  url: string;
}

const MyFriends = () => {
  return (
    <div className="rightSide__myFriends">
      <div className="myFriendsNav">
        Dinu's Mentors <FiChevronDown />
      </div>
      {friendsData.map((mentor: Mentores, index) => (
        <a href={mentor.url} key={index} target="_blank">
          <div className="myFriendsList">
            <div className="friendsLeftSide">
              <img src={mentor.image} alt="" />
              <div>
                <h4>{mentor.name}e</h4>
                <p>{mentor.state}</p>
              </div>
            </div>
            <div className="friendsAlat">{mentor.subscribers}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MyFriends;
