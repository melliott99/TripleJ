import React from 'react';
import { SongCard } from "molecules/SongCard"
import Api from "api"
import './index.css'


const SongGrid = ({Songs}) => {
    // const [SongArray, setSongs] = useState([]);
    // const [FilteredSongs, setFilteredSongs] = useState([]);

    // useEffect(() => {
    //     Api.getSongs().then((response) => 
    //         response.json().then((data) => {
    //             setSongs(data);
    //             setFilteredSongs(data);
    //         })
    //     )
    // }, [])

    // const handleAlphabetClick = (letter) => {
    //     const filtered = SongArray.filter((song) =>
    //         song.artist.toUpperCase().startsWith(letter)
    //     );
    //     setFilteredSongs(filtered)
    // }

    const SongList = Songs.map((song, i) => 
    <SongCard 
            key={i} 
            song={song.songName} 
            artist={song.artist} 
            albumArt={song.artUrl} 
            onAddButtonClick={() => handleAddButtonClick()}
        ></SongCard>
    );

    return (
        <div className="song-grid">
            {SongList}
        </div>
    );

    const handleAddButtonClick = () => {
        console.log('add button')
    }

};

export { SongGrid }