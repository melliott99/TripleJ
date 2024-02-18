import React from "react"
import { Search } from "atoms/Search"
import { BrowseBy } from "atoms/BrowseByContainer"
import { faPalette, faMusic, faTableCells } from '@fortawesome/free-solid-svg-icons';
import './index.css'

const NavBar = ({onClick, onResult, onShowAll}) => {

    const handleSearch = (searchTerm) => {
        onResult(searchTerm);
    }

    return (
        <div className='navbar'>
            <Search onResult={ handleSearch }></Search>
            <BrowseBy icon={faPalette} searchType='Browse By Artist' onClick={() => onClick('artist')}></BrowseBy>
            <BrowseBy icon={faMusic} searchType='Browse By Song' onClick={() => onClick('song')}></BrowseBy>
            <BrowseBy icon={faTableCells} searchType='Show All' onClick={() => onShowAll()}></BrowseBy>
        </div>
    )
}

export { NavBar };