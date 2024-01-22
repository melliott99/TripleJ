import React, { useState, useEffect } from 'react';
import { SongCard } from "molecules/SongCard"
import Api from "api"


const SongGrid = () => {
    const [SongArray, setSongs] = useState([]);

    useEffect(() => {
        Api.getSongs().then((response) => 
            response.json().then((data) => setSongs(data))
        );
    }, [])

    // const renderSongArray = SongArray.map((song, i) => 
    //     <div className='song-grid'>
    //         <SongCard song={song.songName} artist={song.artist} albumArt={song.artUrl} onAddButtonClick={() => handleAddButtonClick()} ></SongCard>
    //     </div>
    // );

    return (
        <div className='song-grid'>
            {SongArray.map((song, i) => 
                <SongCard song={song.songName} artist={song.artist} albumArt={song.artUrl} onAddButtonClick={() => handleAddButtonClick()} ></SongCard>
            )}
             {/* { renderSongArray} */}
        </div>
    );

    const handleAddButtonClick = () => {
        console.log('add button')
    }

};

export { SongGrid }