import React, { useState } from 'react';
import '../Header.css'; 

const Header = ({ setCategory }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <header className="header">
      <h1 className="title">Movies7</h1>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`nav ${isMenuActive ? 'active' : ''}`}>
        <ul>
          <li onClick={() => setCategory('movie')}>Movies</li>
          <li onClick={() => setCategory('series')}>TV Series</li>
          <li onClick={() => setCategory('popular')}>Popular</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
