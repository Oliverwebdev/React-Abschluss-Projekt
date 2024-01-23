import React from "react";

function SearchBox() {

  const [search, setSearch] = React.useState("");

  return (
    <div className="join">
      <div>
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Search"
          />
        </div>
      </div>
      <select className="select select-bordered join-item">
        <option disabled selected>
          Filter
        </option>
        <option>sjdgzfwku</option>
        <option>sdjfhs</option>
        <option>sduj</option>
      </select>
      <div className="indicator">
        <button className="btn join-item">Search</button>
      </div>
    </div>
  );
}

export default SearchBox;
