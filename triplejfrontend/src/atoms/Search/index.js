import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./index.css"

const Search = ({onResult}) => {
  const [searchTerm, setSearchTerm] = useState([]);

  const toggleSearch = () => {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    }
  };

  const onSearchTermUpdate =(event) => {
    setSearchTerm(event.target.value)
    onResult(event.target.value);
  }

  return (
    <div className="search-container">
      <button className="search-button" onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        Search
      </button>
      <input type="text" className="search-input" placeholder="Search here..." value={searchTerm} onChange={(e) => onSearchTermUpdate(e)}/>
    </div>
  );
};

export { Search };