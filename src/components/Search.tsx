import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <div className="leftSide__searchBox">
      <AiOutlineSearch />
      <input type="text" placeholder="Explore timeline..." />
    </div>
  );
};

export default Search;
