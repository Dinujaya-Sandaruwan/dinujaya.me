import { BiChevronDown } from "react-icons/bi";

const Trending = () => {
  return (
    <div className="rightSide__trending">
      <div className="trendingNav">
        <p>Today Treiding</p>
        <BiChevronDown />
      </div>

      <div className="trendingItem">
        <div className="trendingLeft">
          <h3>Figma Maintenance</h3>
          <p>125 posts today</p>
        </div>
        <div className="trendingSlat">66 in one hour</div>
      </div>
      <div className="trendingItem">
        <div className="trendingLeft">
          <h3>Figma Maintenance</h3>
          <p>125 posts today</p>
        </div>
        <div className="trendingSlat">66 in one hour</div>
      </div>
      <div className="trendingItem">
        <div className="trendingLeft">
          <h3>Figma Maintenance</h3>
          <p>125 posts today</p>
        </div>
        <div className="trendingSlat">66 in one hour</div>
      </div>
      <div className="trendingItem">
        <div className="trendingLeft">
          <h3>Figma Maintenance</h3>
          <p>125 posts today</p>
        </div>
        <div className="trendingSlat">66 in one hour</div>
      </div>

      <div className="trendingFooter">See all</div>
    </div>
  );
};

export default Trending;
