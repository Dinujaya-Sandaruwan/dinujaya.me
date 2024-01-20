import groups from "../json/groups.json";

const Community = () => {
  return (
    <div className="leftSide__community">
      <div className="communityNav">
        <p>Dinu's recent groups</p>
        <span className="communityAlat">03</span>
      </div>
      {groups.map((group, index) => (
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
