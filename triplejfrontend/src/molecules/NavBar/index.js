import React from "react"
import { Search } from "atoms/Search"


const NavBar = () => {
    return (
        <div>
            <Search></Search>
            <a>Browse By Artist</a>
            <a>Browse By Track</a>
        </div>
    )
}

export { NavBar };