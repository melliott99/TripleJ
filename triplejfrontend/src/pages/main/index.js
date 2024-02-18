import React, { useState, useEffect } from "react";
import { SongGrid } from "organisms/SongGrid"
import { SearchLetterArray } from "molecules/LetterArray"
import { NavBar } from "molecules/NavBar"
import Api from "api"
import './index.css'


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
            })
        )
    }, [])
    
    useEffect(() => {
        // This effect will run whenever mode or selectedLetter changes
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

    const onShowAll = () => {
        setFilteredSongs(SongArray);
    }

    const handleSearch = (searchTerm) => {
        // Filter songs based on the search term
        const results = SongArray.filter((song) =>
          song.songName.toUpperCase().startsWith(searchTerm.toUpperCase()) ||
          song.artist.toUpperCase().startsWith(searchTerm.toUpperCase())
        );
        setFilteredSongs(results);
      };
    
    

    return (
        <>
            <NavBar onClick={ handleModeChange} onResult={handleSearch} onShowAll={onShowAll}></NavBar>
            <div className="main-container">
                <SongGrid Songs={ FilteredSongs }></SongGrid>   
                <div className="selected-songs-container">   

                </div>
            </div>
            <div className="footer">
                <SearchLetterArray onClick={ handleAlphabetClick }></SearchLetterArray>
            </div>
        </>
    );
};


export { Main };