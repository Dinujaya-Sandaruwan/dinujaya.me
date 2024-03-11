import { AiFillHome, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { PiBag, PiNewspaperLight } from "react-icons/pi";
import { BsPostcard } from "react-icons/bs";
import { toast } from "react-toastify";

const SideMenu = () => {
  return (
    <>
      <div className="leftSide__sideMenu">
        <div className="menuItem">
          <AiFillHome /> <span className="itemTitle">Home</span>
        </div>
        <div
          className="menuItem"
          onClick={() => toast.info("Projet page is Comming soon 😁")}
        >
          <AiOutlineFundProjectionScreen />
          <span className="itemTitle">Dinu's Projects</span>
        </div>
        <div
          className="menuItem"
          onClick={() => toast.info("Marketplace is Comming soon 😁")}
        >
          <div>
            <PiBag /> <span className="itemTitle">Marketplace</span>
          </div>
          <span className="menuAlat">4 new listing</span>
        </div>
        <div
          className="menuItem"
          onClick={() => toast.info("Blog is Comming soon 😁")}
        >
          <BsPostcard /> <span className="itemTitle">Dinu's blog</span>
        </div>
        <div
          className="menuItem"
          onClick={() => toast.info("News Feed is Comming soon 😁")}
        >
          <PiNewspaperLight /> <span className="itemTitle">News Feed</span>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
