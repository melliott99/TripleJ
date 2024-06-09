import React, { useState, useEffect } from "react";
import { SongGrid } from "organisms/SongGrid"
import { SongList } from "organisms/SongList"
import { SearchLetterArray } from "molecules/LetterArray"
import { NavBar } from "molecules/NavBar"
import Api from "api"

import './index.css'


const Main = ({userId, userName}) => {
    const [songArray, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [mode, setMode] = useState('artist');
    const [selectedLetter, setLetter] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [voteMySongCount, setVoteMySongCount] = useState(0)

    const numberRegex =  /^[0-9]/;

    useEffect(() => {
        console.log("User id is " + userId);
        Api.getSongs(userId).then((response) => 
            response.json().then((data) => {
                setSongs(data);
                handleAlphabetClick('A')
                //setFilteredSongs(data);
            })
        )
    }, []);
    
    useEffect(() => {
        
        Api.getUserVotedSongs(userId).then((response) => {
            console.log("response is: " + response.status)
            if(response.ok)
            {
                console.log("Changing selected songs")
                response.json().then((data) => {

                    setSelectedSongs(data);
                })
            }
            else
            {
                console.log("Not happy")
            }
        })
    }, []);

    useEffect(() => {
        // This effect will run whenever mode or selectedLetter changes
        handleAlphabetClick(selectedLetter);

    }, [selectedLetter, mode, selectedSongs]);


    const handleAlphabetClick = (letter) => {
        setLetter(letter)
        const filtered = songArray.filter((song) =>{
            if(letter === '#')
            {
                return mode === 'artist'
                ? numberRegex.test(song.artist)
                : mode === 'song'
                ? numberRegex.test(song.songName)
                : null
            }
           else
           {
                return mode === 'artist'
                ? song.artist.toUpperCase().startsWith(letter)
                : mode === 'song'
                ? song.songName.toUpperCase().startsWith(letter)
                : mode === 'showAll'
           }
        });

         // Sort the filtered results alphabetically based on the current mode
        const sorted = filtered.sort((a, b) => {
            if (mode === 'artist') 
            {
                return a.artist.localeCompare(b.artist); // Sort by artist name
            } 
            else if (mode === 'song') 
            {
                return a.songName.localeCompare(b.songName); // Sort by song name
            }
            return 0;
        });
        setFilteredSongs(sorted);
    }

    //By song or artist
    const handleModeChange = (newMode) => {
        setMode(newMode)
    }    

    const onShowAll = () => {
        handleModeChange('showAll')
        // Sort the filtered results alphabetically based on the current mode
        const sorted = songArray.sort((a, b) => 
        {
            return a.songName.localeCompare(b.songName); // Sort by song name
        });
        setFilteredSongs(sorted);
    }

    const handleSearch = (searchTerm) => {
        // Filter songs based on the search term
        const results = songArray.filter((song) =>
          song.songName.toUpperCase().startsWith(searchTerm.toUpperCase()) ||
          song.artist.toUpperCase().startsWith(searchTerm.toUpperCase())
        );
        setFilteredSongs(results);
      };
    
    //Select Songs
    const selectSong = (selectedSong) => { 
        const isPrevSelected = selectedSongs.some(song => song.trackId === selectedSong.trackId)
        if(!isPrevSelected)
        {
            if(selectedSongs.length < 10)
            {
                if(selectedSong.playlistOwners.includes(userId))
                {
                    if(voteMySongCount > 4)
                    {
                        alert("You cannot add more than 5 of your songs ")
                    }
                    else
                    {
                        setSelectedSongs([...selectedSongs, selectedSong])
                        setVoteMySongCount(voteMySongCount + 1)
                    }
                }
                else
                {
                    setSelectedSongs([...selectedSongs, selectedSong])
                }
                
            }
            else
            {
                alert("You already have 10 songs selected, please remove a song to add a new song");
            }
        }
        else{
            alert("Song already selected you daft cunt");
        }
    };

    const reOrderSelectedSongs = (updatedList) => { 
        setSelectedSongs(updatedList)
    };
  
    const removeSong = (selectedSong) => { 
        const updatedList = selectedSongs.filter(song => song.trackId !== selectedSong.trackId)
        setSelectedSongs(updatedList)
        setVoteMySongCount(voteMySongCount - 1)
    };
    //End Select Songs


    const submitVotes = () => {
        console.log(selectedSongs);
        Api.postVotes(selectedSongs, userId).then((response) => {
            if(response.ok)
            {
                alert("Votes Submitted Successfully")
            }
            else 
            {
                // Handle submission failure
                console.error(response.body)
                alert("Your Votes Could Not Be Submitted")
            }
        }).catch((error) => {
            alert("Error while submitting votes:", error)
            console.error("Error while submitting votes:", error);
        });
    }

    return (
        <div className="container">
            <NavBar onClick={ handleModeChange} onResult={handleSearch} onShowAll={onShowAll} userName={userName}></NavBar>
            <div className="main-container">
                <SongGrid Songs={ filteredSongs } userId={userId} onResult={selectSong}></SongGrid>   
                <div className="selected-songs-container">   
                    <div>
                        <SongList Songs={ selectedSongs } onRemoveSong={ removeSong } onDragSong={ reOrderSelectedSongs }></SongList> 
                    </div>
                </div>
                <button className="red-button" onClick={submitVotes}>Submit</button>
            </div>

            <div className="footer">
                <SearchLetterArray onClick={ handleAlphabetClick }></SearchLetterArray>
            </div>

        </div>
    );
};


export { Main };