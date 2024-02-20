import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import groups from "../json/groups.json";

const Community = () => {
  const [groupsVisibility, setGroupsVisibility] = useState(true);
  const handleGroupsVisibility = () => {
    setGroupsVisibility(!groupsVisibility);
  };
  return (
    <div className="leftSide__community">
      <div className="communityNav">
        <p onClick={handleGroupsVisibility}>
          Dinu's recent groups
          {groupsVisibility ? <FaAngleDown /> : <FaAngleUp />}
        </p>
        <span className="communityAlat">03</span>
      </div>
      {groupsVisibility &&
        groups.map((group, index) => (
          <a href={group.url} key={index} target="_blank">
            <div className="communityItem">
              <img src={group.image_url} alt="" />
              <div className="text">
                <h3>{group.name}</h3>
                <p>{group.member_count}</p>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
};

export default Community;
