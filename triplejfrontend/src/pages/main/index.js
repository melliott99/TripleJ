import React, { useState, useEffect } from "react";
import { SongGrid } from "organisms/SongGrid"
import { SearchLetterArray } from "molecules/LetterArray"
import { NavBar } from "molecules/NavBar"
import Api from "api"

const Main = () => {
    const [SongArray, setSongs] = useState([]);
    const [FilteredSongs, setFilteredSongs] = useState([]);
    const [mode, setMode] = useState('artist')
    const [selectedLetter, setLetter] = useState([])

    useEffect(() => {
        Api.getSongs().then((response) => 
            response.json().then((data) => {
                setSongs(data);
                setFilteredSongs(data);
                // handleAlphabetClick(selectedLetter);
                // handleModeChange(mode);
            })
        )
    }, [])
    
    useEffect(() => {
        // This effect will run whenever mode or selectedLetter changes
        console.log('Selected Letter:', selectedLetter);
        console.log('Mode:', mode);

        handleAlphabetClick(selectedLetter);

    }, [selectedLetter, mode]);


    const handleAlphabetClick = (letter) => {
        setLetter(letter)
        const filtered = SongArray.filter((song) =>
            mode === 'artist'
            ? song.artist.toUpperCase().startsWith(letter)
            : mode === 'song'
            ? song.songName.toUpperCase().startsWith(letter)
            : null
        );
        setFilteredSongs(filtered)
    }

    const handleModeChange = (newMode) => {
        setMode(newMode)
    }    
    
    return (
        <div>
            <NavBar onClick={ handleModeChange}></NavBar>
            <SongGrid Songs={ FilteredSongs }></SongGrid>        
            <SearchLetterArray onClick={ handleAlphabetClick }></SearchLetterArray>
        </div>
    );
};


export { Main };