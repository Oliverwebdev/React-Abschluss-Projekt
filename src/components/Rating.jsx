import React from "react";

function Rating({ stars }) {
  const itemsStarsOn = [];

  for (let i = 1; i <= stars; i++) {
    //loop of On Stars example: 80 / 20 = 4
    itemsStarsOn.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 bg-orange-300`}
        readOnly
      />
    );
  }

  const itemsStarsOff = [];
  for (let i = 1; i <= 5 - stars; i++) {
    //Loop of off Stars  (5 - on stars) example: 80 / 20 = 4 >>> 5 - 4 = 1
    itemsStarsOff.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 bg-orange-300 opacity-20`}
        readOnly
      />
    );
  }

  return (
    <div className="rating rating-lg rating-half">
      {itemsStarsOn.map((item) => item)}
      {itemsStarsOff.map((item) => item)}
    </div>
  );
}

export default Rating;
