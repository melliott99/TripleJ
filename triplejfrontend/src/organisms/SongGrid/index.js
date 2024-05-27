import React from 'react';
import { SongCard } from "molecules/SongCard"
import './index.css'


const SongGrid = ({Songs, userId, onResult}) => {



    const SongList = Songs.map((song, i) => 
        // const isOwner = song.playlistOwners.includes(userId);  
        // console.log("isowner is: " + isOwner);
        <SongCard 
                key={i} 
                trackId={song.trackId}
                song={song.songName} 
                artist={song.artist} 
                trackImg={song.trackImg} 
                isOwner={() => checkIsOwner(song)}
                onAddButtonClick={() => handleAddButtonClick(song)}
            ></SongCard>
    );

    const handleAddButtonClick = (song) => {
        onResult(song)
        console.log("playlist owners are: " + song.playlistOwners + " userId is: " + userId)
    };

    const checkIsOwner = (song) => {
        
        return song.playlistOwners.includes(userId)
    }

    return (
        <div className="song-grid">
            {SongList}
        </div>
    );


};

export { SongGrid }