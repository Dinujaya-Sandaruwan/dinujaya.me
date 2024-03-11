import { toast } from "react-toastify";

const TopMenu = () => {
  return (
    <div className="mainNav__topMenu">
      <span className="menuItem active">Explore</span>
      <span
        className="menuItem"
        onClick={() => toast.info("Blog is Comming oon 😁")}
      >
        Read the Blog
      </span>
      <span
        className="menuItem"
        onClick={() =>
          toast.info("You can become a friend of Dinujaya soon 😁")
        }
      >
        Dinu's Friends
        <span className="menuAlat">12</span>
      </span>
    </div>
  );
};

export default TopMenu;
