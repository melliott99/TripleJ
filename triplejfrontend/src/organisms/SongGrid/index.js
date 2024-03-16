import React from 'react';
import { SongCard } from "molecules/SongCard"
import './index.css'


const SongGrid = ({Songs, onResult}) => {

    const SongList = Songs.map((song, i) => 
    <SongCard 
            key={i} 
            trackId={song.trackId}
            song={song.songName} 
            artist={song.artist} 
            trackImg={song.trackImg} 
            onAddButtonClick={() => handleAddButtonClick(song)}
        ></SongCard>
    );

    const handleAddButtonClick = (song) => {
        onResult(song)
    }

    return (
        <div className="song-grid">
            {SongList}
        </div>
    );


};

export { SongGrid }