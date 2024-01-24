import React from "react";

function SearchBox() {

  const [search, setSearch] = React.useState("");

  return (
    <div className="join">
      <div>
        <div>
          <input style={{marginRight: "1rem"}}
            className="input input-bordered join-item"
            placeholder="Search"
          />
        </div>
      </div>
     
      <div className="indicator">
        <button className="btn join-item">Search</button>
      </div>
    </div>
  );
}

export default SearchBox;
