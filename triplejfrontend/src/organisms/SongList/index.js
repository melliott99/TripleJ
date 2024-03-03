import React from 'react';
import { SelectedSongCard } from "molecules/SelectedSongCard"
import './index.css'


const SongList = ({Songs, onResult}) => {

    const SongList = Songs.map((song, i) => 
    <>
        <SelectedSongCard 
            key={i} 
            id={song.id}
            song={song.songName} 
            artist={song.artist} 
            albumArt={song.artUrl} 
            onAddButtonClick={() => handleRemoveButtonClick(song)}
        ></SelectedSongCard>
        </>
    );

    const handleRemoveButtonClick = (song) => {
        onResult(song)
    }

    return (
        <div>
            {SongList}
        </div>
    );

};

export { SongList }