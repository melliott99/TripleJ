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
                playlistOwners={song.playlistOwners}
                userId={userId}
                onAddButtonClick={() => handleAddButtonClick(song)}
            ></SongCard>
    );

    const handleAddButtonClick = (song) => {
        onResult(song)
    };


    return (
        <div className="song-grid">
            {SongList}
        </div>
    );


};

export { SongGrid }