import React from "react";

function Rating({ halfStars }) {
  const itemsHalfStars = [];

  for (let i = 1; i <= halfStars; i++) {
    itemsHalfStars.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 mask-half-${
          i % 2 === 1 ? "1" : "2"
        }  bg-orange-300`}
      />
    );
  }

  const itemsHalfStarsRest = [];
  for (let i = 1; i <= 10 - halfStars; i++) {
    itemsHalfStarsRest.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 mask-half-${
          i % 2 === 1 ? "2" : "1"
        }  bg-orange-300 opacity-20`}
      />
    );
  }

  return (
    <div className="rating rating-lg rating-half">
      {itemsHalfStars.map((item) => item)}{" "}
      {itemsHalfStarsRest.map((item) => item)}
    </div>
  );
}

export default Rating;
