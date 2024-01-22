import React, { useState, useEffect } from 'react';
import { SongCard } from "molecules/SongCard"


const SongGrid = () => {
    const SongArray = props.songs;
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        Api.getSongs().then((response) => 
            response.json().then((data) => setSongs(data))
        );
    }, [])

    const SongList = SongArray.map((song, i) => 
        <SongCard song={song.title} artist={song.artist} Year={song.year} albumArt={song.albumArt} onAddButtonClick={() => handleAddButtonClick()} ></SongCard>
    );

    return (
        <div>
            {SongList}
        </div>
    );

    const handleAddButtonClick = () => {
        console.log('add button')
    }

};

export { SongGrid }