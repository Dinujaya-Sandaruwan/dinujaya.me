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
        <a href="https://wa.me/+94764588828" target="_blank">
          <button className="hireMe">
            <TbBrandFiverr /> Hire now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Advertisement;
