import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mobile-nav-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pc">PC</Link>
        </li>
        <li>
          <Link to="/ps">PlayStation</Link>
        </li>
        <li>
          <Link to="/xbox">Xbox</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Nav;
