import React from "react"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Search = () => {
  const toggleSearch = () => {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    }
  };

  return (
    <div className="search-container">
      <button className="search-button" onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        Search
      </button>
      <input type="text" className="search-input" placeholder="Type here..." />
    </div>
  );
};

export { Search };