import React, { useState, useEffect } from "react";
import { SongGrid } from "organisms/SongGrid"
import { SearchLetterArray } from "molecules/LetterArray"
import { NavBar } from "molecules/NavBar"
import Api from "api"

const Main = () => {
    const [SongArray, setSongs] = useState([]);
    const [FilteredSongs, setFilteredSongs] = useState([]);

    useEffect(() => {
        Api.getSongs().then((response) => 
            response.json().then((data) => {
                setSongs(data);
                setFilteredSongs(data);
            })
        )
    }, [])

    const handleAlphabetClick = (letter) => {
        const filtered = SongArray.filter((song) =>
            song.artist.toUpperCase().startsWith(letter)
        );
        setFilteredSongs(filtered)
    }

    
    
    return (
        <div>
            <NavBar></NavBar>
            <SongGrid Songs={FilteredSongs}></SongGrid>        
            <SearchLetterArray onClick={ handleAlphabetClick }></SearchLetterArray>
        </div>
    );
};


export { Main };