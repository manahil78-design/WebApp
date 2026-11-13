
import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
        alt="Beach"
        className="card-image"
      />

      <div className="card-content">
        <h2>{props.Dname}</h2>
        <p>
          {props.desc}
        </p>

        <button className="card-button">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Card;
