import React, { useState, useEffect } from "react";
import { SongGrid } from "organisms/SongGrid"
import { SongList } from "organisms/SongList"
import { SearchLetterArray } from "molecules/LetterArray"
import { NavBar } from "molecules/NavBar"
import Api from "api"
import './index.css'


const Main = () => {
    const [songArray, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [mode, setMode] = useState('artist')
    const [selectedLetter, setLetter] = useState([])
    const [selectedSongs, setSelectedSongs] = useState([])

    useEffect(() => {
        Api.getSongs().then((response) => 
            response.json().then((data) => {
                setSongs(data);
                handleAlphabetClick('A')
                //setFilteredSongs(data);
            })
        )
    }, [])
    
    useEffect(() => {
        // This effect will run whenever mode or selectedLetter changes
        handleAlphabetClick(selectedLetter);

    }, [selectedLetter, mode, selectedSongs]);


    const handleAlphabetClick = (letter) => {
        setLetter(letter)
        const filtered = songArray.filter((song) =>
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
        setFilteredSongs(songArray);
    }

    const handleSearch = (searchTerm) => {
        // Filter songs based on the search term
        const results = songArray.filter((song) =>
          song.songName.toUpperCase().startsWith(searchTerm.toUpperCase()) ||
          song.artist.toUpperCase().startsWith(searchTerm.toUpperCase())
        );
        setFilteredSongs(results);
      };
    
    const selectSong = (selectedSong) => { 
        console.log("Song is " + selectedSong.songName);
        const isPrevSelected = selectedSongs.some(song => song.id === selectedSong.id)
        if(!isPrevSelected)
        {
            setSelectedSongs([...selectedSongs, selectedSong])
        }
        else{
            console.log("Song Already Selected you daft cunt");
        }
    };

    const removeSong = (selectedSong) => { 
        console.log(selectedSong);
        const updatedList = selectedSongs.filter(song => song.id !== selectedSong.id)
        setSelectedSongs(updatedList)
        console.log(updatedList)
    };

    return (
        <div className="container">
            <NavBar onClick={ handleModeChange} onResult={handleSearch} onShowAll={onShowAll}></NavBar>
            <div className="main-container">
                <SongGrid Songs={ filteredSongs } onResult={selectSong}></SongGrid>   
                <div className="selected-songs-container">   
                    <SongList Songs={ selectedSongs } onResult={removeSong}></SongList>
                    <button className="red-button">Submit</button>
                </div>
            </div>
            <div className="footer">
                <SearchLetterArray onClick={ handleAlphabetClick }></SearchLetterArray>
            </div>
        </div>
    );
};


export { Main };