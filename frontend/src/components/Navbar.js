import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>LADER</h1>
      </Link>
      <div className="links">
        <Link
          className="predict-link"
          to="/predict"
          style={{
            color: isHovering ? "#333":"white",
            backgroundColor: isHovering ? "":"#09a188",
            borderRadius:"8px"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Predict
        </Link>
        <Link to="/doc_an">Document analysis</Link>
      </div>
    </nav>
  );
};

export default Navbar;
