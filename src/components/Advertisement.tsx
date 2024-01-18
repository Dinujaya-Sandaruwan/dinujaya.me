import { TbBrandFiverr } from "react-icons/tb";

const Advertisement = () => {
  return (
    <div className="rightSide__advertisement">
      <img src="./add.jpg" alt="addPost" />
      <div className="addText">
        <h3>Do you need a react developer?</h3>
        <p>
          I'm your one-person army, armed with the skills to transform your web
          aspirations into stunning, functional reality!
        </p>
        <button className="hireMe">
          <TbBrandFiverr /> Hire now
        </button>
      </div>
    </div>
  );
};

export default Advertisement;
