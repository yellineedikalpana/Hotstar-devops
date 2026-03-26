import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">Hotstar</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>TV</li>
        <li>Movies</li>
        <li>Sports</li>
      </ul>
    </div>
  );
}

export default Navbar;
