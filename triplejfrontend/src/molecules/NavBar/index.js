import React from "react"
import { Search } from "atoms/Search"
import { BrowseBy } from "atoms/BrowseByContainer"
import { faPalette, faMusic } from '@fortawesome/free-solid-svg-icons';
import './index.css'

const NavBar = ({onClick}) => {
    return (
        <div className='navbar'>
            <Search></Search>
            <BrowseBy icon={faPalette} searchType='Browse By Artist' onClick={() => onClick('artist')}></BrowseBy>
            <BrowseBy icon={faMusic} searchType='Browse By Song' onClick={() => onClick('song')}></BrowseBy>
        </div>
    )
}

export { NavBar };