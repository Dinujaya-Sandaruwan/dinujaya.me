import { AiFillHome, AiOutlineCalendar } from "react-icons/ai";
import { PiUsersFour, PiBag, PiNewspaperLight } from "react-icons/pi";

const SideMenu = () => {
  return (
    <div className="leftSide__sideMenu">
      <div className="menuItem">
        <AiFillHome /> <span className="itemTitle">Home</span>
      </div>
      <div className="menuItem">
        <PiUsersFour /> <span className="itemTitle">Community</span>
      </div>
      <div className="menuItem">
        <div>
          <PiBag /> <span className="itemTitle">Marketplace</span>
        </div>
        <span className="menuAlat">4 new listing</span>
      </div>
      <div className="menuItem">
        <AiOutlineCalendar /> <span className="itemTitle">Dinu's events</span>
      </div>
      <div className="menuItem">
        <PiNewspaperLight /> <span className="itemTitle">News Feed</span>
      </div>
    </div>
  );
};

export default SideMenu;
