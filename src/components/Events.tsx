import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import data from "../json/todoList.json";

const Events = () => {
  const [eventVisibility, setEventVisibility] = useState(true);
  const handleEventVisibility = () => {
    setEventVisibility(!eventVisibility);
  };

  return (
    <div className="leftSide__events">
      <div className="eventsNav">
        <p onClick={handleEventVisibility}>
          Dinu's todo list {eventVisibility ? <FaAngleDown /> : <FaAngleUp />}
        </p>
        <span>0{data.length}</span>
      </div>
      {eventVisibility &&
        data.map(({ date, title }, index) => (
          <div className="eventItem" key={index}>
            <div className="eventIcon">
              <h3>{date.day}</h3>
              <p>{date.month}</p>
            </div>
            <div className="eventText">
              <h3>{title.substring(0, 15)}...</h3>
              <p>78K interested - 7.7K going</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Events;
