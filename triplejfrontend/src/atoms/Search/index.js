import React from "react"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Search = () => {

    function toggleSearch() {
        const searchInput = document.querySelector('.search-input');
        searchInput.classList.toggle('active');
        searchInput.focus();
      }

    return (
        <div class="search-container">
            <button class="search-button" onclick="toggleSearch()">
            <FontAwesomeIcon icon={faSearch} />
             <a> </a>Search
            </button>
            <input type="text" class="search-input" placeholder="Type here..."/>
      </div>
    )
}

export {Search}