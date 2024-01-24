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

    const SongList = SongArray.map((song, i) => 
        <SongCard key={i} song={song.songName} artist={song.artist} albumArt={song.artUrl} onAddButtonClick={() => handleAddButtonClick()} ></SongCard>
    );

    return (
        <div className='song-grid'>
            {SongList}
        </div>
    );

    const handleAddButtonClick = () => {
        console.log('add button')
    }

};

export { SongGrid }