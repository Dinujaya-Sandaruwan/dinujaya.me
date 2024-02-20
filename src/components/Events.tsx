import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Events = () => {
  const [eventVisibility, setEventVisibility] = useState(true);
  const handleEventVisibility = () => {
    setEventVisibility(!eventVisibility);
  };
  const arr = [1, 2, 3];
  return (
    <div className="leftSide__events">
      <div className="eventsNav">
        <p onClick={handleEventVisibility}>
          Dinu's todo list {eventVisibility ? <FaAngleDown /> : <FaAngleUp />}
        </p>
        <span>12</span>
      </div>
      {eventVisibility &&
        arr.map((index) => (
          <div className="eventItem" key={index}>
            <div className="eventIcon">
              <h3>20</h3>
              <p>Dec</p>
            </div>
            <div className="eventText">
              <h3>Product Designer...</h3>
              <p>78K interested - 7.7K going</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Events;
